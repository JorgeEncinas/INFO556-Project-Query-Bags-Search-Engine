from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import pyterrier as pt
from pathlib import Path
import re

app = Flask(
    __name__,
    static_folder="static"
)
CORS(app) #From https://pypi.org/project/flask-cors/

# SECTION: PYTERRIER INITIALIZATION -----------------------------------------------------------------------------------
#index_path = Path() #From https://pyterrier.readthedocs.io/en/latest/terrier-index-api.html
#"E:/code/ua/s2/info556/pyterrier_ui/backend/indices/msmarco-document"

# INDEX
index = pt.IndexFactory.of("E:/code/ua/s2/info556/pyterrier_ui/backend/indices/msmarco-document/data.properties") #str/index_path
bm25 = pt.terrier.Retriever(index, wmodel="BM25")   # RETRIEVER
bo1 = pt.rewrite.Bo1QueryExpansion(index)           # QUERY EXPANSION

# One time search to have the docstore created if necessary
dataset = pt.get_dataset("irds:msmarco-document")   # DATASET FOR TEXT RETRIEVAL
text_getter = pt.text.get_text(                     # TEXT RETRIEVER
    indexlike=dataset,
    metadata=["body","title","url"]
)

# END SECTION: PYTERRIER INITIALIZATION -------------------------------------------------------------------------------

@app.route("/")
def index():
    """Home of the website, setup to return the compiled React application.
    """
    #From https://stackoverflow.com/a/57648079
    return send_from_directory(app.static_folder, "index.html")

@app.route("/search", methods=["POST"])
def search():
    """ Does a search using PyTerrier's BM25

    ---
    HTTP Method: POST
    
    Request Body:
    json
    {
        "query": string,
        "query_bags": {
            "forbidden_words": Array<string>,
            "must_have_words": Array<string>,
            "related_words": {
                "term": {
                    "addedBy": string,
                    "weight": number
                },
                ...
            }
        }
    }

    Returns:
    A collection of results structured like so:
    {
        "title": {
            0: "lorem ipsum...",
            1: "lorem ipsum...".
            ...
        },
        "body": {
            0: "lorem ipsum...",
            1: "lorem ipsum...".
            ...
        },
        "url": {
            0: "lorem ipsum...",
            1: "lorem ipsum...".
            ...
        }
    }
    """
    print("Entered search endpoint?")
    print(request.method)
    content = request.json #From  https://stackoverflow.com/a/35614301
    print("REQUEST CONTENT", content)
    if request.method == "POST": #From https://www.geeksforgeeks.org/python/flask-http-methods-handle-get-post-requests/
        # STEP 0: WEIGHT DEFINITIONS
        original_query_weight = 2.0
        user_related_weight = 1.3
        system_related_weight = 1.0
        
        # STEP 1: EXTRACT FORM FIELDS
        user_query = content["query"]
        query_bags = content["query_bags"]
        print("QUERY BAGS", query_bags)
        forbidden_words = query_bags["forbidden_words"] #List
        must_have_words = query_bags["must_have_words"] #List
        related_words = query_bags["related_words"] #Dict where each key tells you who added the word, AND the weight
        
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
                new_user_query.append(f"+{word}")

        # STEP 3.3: RELATED WORDS (& WEIGHTS)
        for word in related_words.keys():
            added_by = related_words[word]["addedBy"]
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
        return trimmed_data.to_json()
        #return jsonify({
        #    "success":True,
        #    "data": trimmed_data.to_json() # From https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_json.html
        #})
    # ALTERNATIVE FLOW: UNAUTHORIZED ACCESS. Return error  
    else:
        print("Entered get?")
        return "Method not allowed", 405

@app.route("/related", methods=["POST"])
def get_related_terms():
    """ Receives a query string and returns related terms from it
        by performing a query expansion.

    ---
    HTTP Method: POST

    Request Body:
    {
        "query": string
    }

    Returns:
    A collection of suggested terms in the format:
    {
        related_words: [
            (string, number),
            ...
        ]
    }
    """
    if request.method == "POST":
        # STEP 1: RECEIVE THE QUERY
        content = request.json
        query = content["query"]

        # STEP 2: EXPAND THE QUERY
        expansion = bo1(bm25.search(query))
        print(type(expansion))
        new_words = ""
        # STEP 2.1: Try to get the query expansion performed
        #   I had it fail once, so I added a second method below
        try: 
            new_words = expansion["query"].item()
        except:
            print("Operation 1 failed")
        
        # STEP 2.2: Try it again but using tolist() and if no words are found then return no suggestions.
        try:
            new_words = expansion["query"].tolist() #From https://stackoverflow.com/a/61071890
            print(f"Converted to list: {new_words}")
            if(len(new_words) < 1):
                return jsonify({
                    "related_words": {}
                })
            else:
                new_words = " ".join(new_words)
        except:
            print("Operation 2 failed")


        # STEP 3: EXTRACT THE TERMS AND THEIR WEIGHTS
        find_term_and_weights = r"(?P<term>[a-zA-Z0-9]+)\^(?P<weight>[0-9\.]+)"
        findtw = re.compile(find_term_and_weights)
        matches = findtw.findall(new_words)

        # STEP 4: EXTRACT THE TERMS FROM THE ORIGINAL QUERY
        extract_just_the_words = r"(?P<word>(?:(?<=[+|-])[A-Za-z0-9\.\-\_]+)|(?:[A-Za-z0-9\.\-\_]+(?=[\^|\"]))|(?<=\b)[A-Za-z]+(?=\b))"
        extract_jtw = re.compile(extract_just_the_words)
        oq_matches = extract_jtw.findall(query)

        # STEP 5: IDENTIFY UNIQUE WORDS FROM THE EXPANSION
        # Create a Set() of the original query's terms.
        set_oq = set(oq_matches) #From https://stackoverflow.com/a/15768778
        # Then use that to exclude the terms in the expanded query that are already in
        # in the original query.
        extended_words = [(term, round(float(weight), 2)) for (term, weight) in matches if matches[0] not in set_oq]

        print(f"Extended Words that will be sent: {extended_words}")
        print(f"Words that we captured in the OG Query: {set_oq}")
        return jsonify({
            #"success": True,
            "related_words":extended_words
        })
    else:
        return "Method not allowed", 405