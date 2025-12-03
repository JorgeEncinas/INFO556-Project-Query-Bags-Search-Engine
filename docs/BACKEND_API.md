# Backend API Documentation

This documentation file describes the Backend server and its API endpoints.

## Technology Stack

If you need to know the technology stack used on the backend, here it is. It's quite brief.

- **`python-terrier==0.13.1`:** Make sure it is this exact version! This is the PyTerrier library used to create the searching functionality.
- **Flask:** The library used to create the backend server.
- **flask-cors:** allows querying the backend from other origins. Without it, requests would be blocked.

That's it!

## API Endpoints

There are really only three of them. Here's a quick description of them, and in the "Endpoints" section below I included a more detailed explanation

- **"/" Endpoint** - The home page. Serves the base HTML with the compiled React application
- **"/search" Endpoint** - Receives your query string and the query bag terms, and constructs a complete query from these, then it performs the query using said complete query, retrieves the data from the results, and returns this collection of entries to the frontend. The frontend then shows the "results" page, where you can see this collection.
- **"/related" Endpoint** - Receives your query string and applies query expansion to it. Then it extracts the terms and their weights, and returns them to the frontend, where they are placed in the "Related Words" bag.

## Inspect the requests directly

Check the the [requests_prod.rest](/requests/requests_prod.rest) file to see the data that each POST endpoint expects. The section below describes how you can test it, so that you may experience and verify first-hand.

- [/requests/requests_prod.rest](/requests/requests_prod.rest) - Shows the requests using the production website. Made for easy testing without having to download anything.
- [/requests/requests_local.rest](/requests/requests_local.rest) - Shows how the requests look when you're deploying your program locally. Might help you troubleshoot if you're trying it out in your computer.
- [/requests/requests_dev.rest](/requests/requests_dev.rest) - My personal file that I used throughout development to test the endpoints as I was developing them. Left as a showcase for the interested reader.
- [/backend/json_examples](/backend/json_examples/) - Here are the two JSON files I created as a guide for myself during the development of the project. I have adjusted them now to reflect the final product, and I mostly left it as a showcase for the interested reader.

## How to test the endpoints yourself

Go to this repo's `requests` folder, and download `production_requests.rest`. In Visual Studio Code,
download the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension.

Then once you open your file,
you'll be able to see that above each request, there is a gray, clickable `Send Request` text. It doesn't look like a button per se, but it is. Once you click it, it sends a requests to my website, and you'll receive the response.

## "/" Endpoint - Home page

This endpoint is the one that receives any user when they go to the base URL address [https://ir-bagsearch.com](https://ir-bagsearch.com). It will return the HTML and the compiled React application.

The way it works is simple: I compiled the React application, which creates a folder named "dist" in the "frontend/search" folder.

I take that folder, rename it "static", and place it inside the "backend" folder, where my backend server file (`searchbk.py`) can see it.

One detail though: You need to open up the `index.html` file, and add `static` at the beginning of the links to your files. Let me show you below:

- In the `<link />` tag with `rel="icon"`
    - Change `/SiteIcon.svg` to `static/SiteIcon.svg`
- In the `<script type="module" ... />` tag
    - Change `/assets/index-CvR8tnDF.js` to `static/assets/index-CvR8tnDF.js`
- In the `<link rel="stylesheet" ... />` tag
    - Change `/assets/index-DdD_qcF0.css` to `static/assets/index-DdD_qcF0.css`

## The "/search" Endpoint

This endpoint receives a JSON payload via a POST request, as shown below.

(Again, test it out using [requests_prod.rest](/requests/requests_prod.rest))
```
{
    "query": "the andromeda galaxy",
    "query_bags": {
        "forbidden_words": ["monkey"],
        "must_have_words": ["sun", "star"],
        "related_words": {
            "planet": {
                "addedBy":"user",
                "weight":1.5
            },
            "jupyter": {
                "addedBy":"system",
                "weight":1.2
            }

        }
    }
}
```

This endpoint will receive your query as typed on the search box, and the terms you placed in each query bag. It then uses all of these elements to create a longer, more complete query.

The way it works is using PyTerrier's Query Language, which is only mentioned [here](https://pyterrier.readthedocs.io/en/latest/terrier/retrieval.html), but provides a link that describes it [here](https://github.com/terrier-org/terrier-core/blob/5.x/doc/querylanguage.md#user-query-language). There is a more readable format [here](http://terrier.org/docs/v5.1/querylanguage.html).

In any case, the relevant features are the following:

- `+<term>` - Used for term requirement
- `-<term>` - Used for term exclusion
- `<term>^<weight_number>` - Used to apply weighting to "Related Words" terms.

With these elements, the query above becomes:

```
the andromeda galaxy -monkey +sun +star planet^1.5 jupyter^1.2
```

The BM25 Retriever uses this complete query to search for results, and then we obtain the text from said results. The text is then sent back to the frontend.

## The "/related" Endpoint - Expands your query, captures the new terms, and adds them to the "Related Words" bag.

This endpoint receives a JSON payload via a POST request, as shown below

(Again, test it out using [requests_prod.rest](/requests/requests_prod.rest))
```
{
    "query":"dancing with the stars"
}
```

The endpoint will receive your query, and then apply the Bo1 Query Expansion to it, which yields a new query. In this example, the query expansion looks something like this:

```
applypipeline:off danc^1.420494110 star^1.282471458 who^0.099931968 abc^0.075553253 salari^0.056309564 celebr^0.036232875 last^0.000000000 realiti^0.000000000 palin^0.000000000 kipp^0.000000000
```

Then I extract the novel terms from this expansion, and the system returns them in tuples, as you can see in the logic below:

```
    [
        ( term, round(float(weight), 2) ) 
            for (term, weight) in matches 
            if matches[0] not in set_oq
    ]
```

The way this works is through Regex! I created two regexes using Pythex and Debuggex. You can see a description of them in the [terrier_setup](/backend/terrier_setup.ipynb) jupyter notebook.
