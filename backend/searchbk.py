from flask import Flask, jsonify
from flask_cors import CORS
import pyterrier as pt
from pathlib import Path
import re

app = Flask(__name__)
CORS(app) #From https://pypi.org/project/flask-cors/

# SECTION: PYTERRIER INITIALIZATION -----------------------------------------------------------------------------------
#index_path = Path() #From https://pyterrier.readthedocs.io/en/latest/terrier-index-api.html
#"E:/code/ua/s2/info556/pyterrier_ui/backend/indices/msmarco-document"

# INDEX
index = pt.IndexFactory.of("./indices/msmarco-document/data.properties") #str/index_path
bm25 = pt.terrier.Retriever(index, wmodel="BM25")   # RETRIEVER
bo1 = pt.rewrite.Bo1QueryExpansion(index)           # QUERY EXPANSION

# One time search to have the docstore created
dataset = pt.get_dataset("irds:msmarco-document")   # DATASET FOR TEXT RETRIEVAL
text_getter = pt.text.get_text(                     # TEXT RETRIEVER
    indexlike=dataset,
    metadata=["body","title","url"]
)

# END SECTION: PYTERRIER INITIALIZATION -------------------------------------------------------------------------------

@app.route("/")
def index():
    return "<p>Hello, World!</p>"

@app.route("/search", methods=["POST"])
def search(request):
    if request.method == "POST": #From https://www.geeksforgeeks.org/python/flask-http-methods-handle-get-post-requests/
        # STEP 0: WEIGHT DEFINITIONS
        original_query_weight = 2.0
        user_related_weight = 1.3
        system_related_weight = 1.0
        
        # STEP 1: EXTRACT FORM FIELDS
        user_query = request.form["query"]
        query_bags = request.form["query_bags"]
        forbidden_words = query_bags.forbidden_words #List
        must_have_words = query_bags.must_have_words #List
        related_words = query_bags.related_words #Dict where each key tells you who added the word, AND the weight
        
        # STEP 2: PREPARE TO JOIN QUERY BAG TERMS.
        new_user_query = [f"{word}^{original_query_weight}" for word in user_query.split()] #Split from https://stackoverflow.com/a/8113787

        # STEP 3: ADD WORDS FROM QUERY BAGS
        find_spaces = r".*[\s]+.*" #Developed using pythex and debuggex and #https://docs.python.org/3/howto/regex.html
        findspacer = re.compile(find_spaces) #From https://docs.python.org/3/library/re.html#re.Pattern.search

        # STEP 3.1: FORBIDDEN WORDS
        for word in forbidden_words:
            if findspacer.search(word):
                # If more than one word, add double quotes around it!
                # Defined in Terrier's Query Language
                # https://github.com/terrier-org/terrier-core/blob/5.x/doc/querylanguage.md#matching-op-query-language
                new_user_query.append(f"-\"{word}\"")
            else:
                new_user_query.append(f"-{word}")

        # STEP 3.2: MUST-HAVE WORDS
        for word in must_have_words:
            if findspacer.search(word):
                new_user_query.append(f"+\"{word}\"")
            else:
                new_user_query.append(f"-{word}")

        # STEP 3.3: RELATED WORDS (& WEIGHTS)
        for word in related_words.keys():
            added_by = related_words[word]["added_by"]
            weight = related_words[word]["weight"]
            # STEP 3.3.1 Creating a fallback weight.
            weight = weight if weight != -1 else (user_related_weight if added_by == "user" else system_related_weight)

            if findspacer.search(word): #If multiple, we want to make sure to include it with double quotes
                new_user_query.append(f"(\"{word}\")^{weight}")
            else:
                new_user_query.append(f"{word}^{weight}")

        # STEP 4: CONSOLIDATE ALL TERMS INTO A STRING
        complete_query = " ".join(new_user_query)
        print(complete_query) #TODO DELETE THIS PRINT

        # STEP 5: SEARCH
        search_results = bm25.search(complete_query)

        # STEP 6: RETRIEVE DOCUMENTS FROM SEARCH
        search_data = text_getter(search_results[:100])

        trimmed_data = search_data[["title", "body", "url"]] #From https://stackoverflow.com/a/61142647
        return jsonify({
            "success":True,
            "data": trimmed_data.to_json() # From https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_json.html
        })
    # ALTERNATIVE FLOW: UNAUTHORIZED ACCESS. Return error  
    else:
        return jsonify({
            "success":False
        })

@app.route("/related", methods=["POST"])
def get_related_terms(request):
    if request.method == "POST":
        # STEP 1: RECEIVE THE QUERY
        query = request.form["query"]

        # STEP 2: EXPAND THE QUERY
        expansion = bo1(bm25.search(query))
        new_words = expansion["query"].item()

        # STEP 3: EXTRACT THE TERMS AND THEIR WEIGHTS
        find_term_and_weights = r"(?P<term>[a-zA-Z0-9]+)\^(?P<weight>[0-9\.]+)"
        findtw = re.compile(find_term_and_weights)
        matches = findtw.findall(new_words)

        # STEP 4: EXTRACT THE TERMS FROM THE ORIGINAL QUERY
        extract_just_the_words = r"(?P<word>(?:(?<=[+|-])[A-Za-z0-9\.\-\_]+)|(?:[A-Za-z0-9\.\-\_]+(?=[\^|\"]))|(?<=\b)[A-Za-z]+(?=\b))"
        extract_jtw = re.compile(extract_just_the_words)
        oq_matches = extract_jtw.findall(query)

        # STEP 5: IDENTIFY UNIQUE WORDS FROM THE EXPANSION
        set_oq = set(oq_matches) #From https://stackoverflow.com/a/15768778
        extended_words = [(term, round(float(weight), 2)) for (term, weight) in matches if matches[0] not in set_oq]

        return jsonify({
            "success": True,
            "related_words":extended_words
        })
    else:
        return jsonify({
            "success":False
        })