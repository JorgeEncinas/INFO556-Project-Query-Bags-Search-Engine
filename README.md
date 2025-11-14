# QueryBags Search Engine

This project is a Search Engine created with PyTerrier. The special twist to it is that it adds a visual component
to specify some constraints that are usually widely available in search engines, but not always shown to the average user.

These constraints are three:

- Must-have words: You can specify words that the results must have somewhere in the page.
- Forbidden words: You can specify words that the results must absolutely not have anywhere in the page.
- Related words: You can get suggestions from the system to enhance your query, or add your own related terms.

## Check it out, no downloads needed

You can go to [the website](https://www.ir-bagsearch.com) and check it out!

## How to run the project

1. Get the indices

Use PyTerrier's instructions to download the "msmarco-document" files. You can go to [ir-datasets](https://ir-datasets.com/index.html) and click on "msmarco-document" to see how it is done, since the code reference is there.

2. Process the indices and the searches.

The jupyter file included in the "backend" folder, called "terrier_setup.ipynb" can demonstrate how to do so.

3. Create a terminal instance for the backend.

The backend has a compiled form of the frontend, so you don't need to worry about it. To run the backend, first be sure to navigate into the "backend folder" in your terminal, then create a virtual environment (virtualenv)

```python -m virtualenv venv```

Now you can start within the terminal the virtual environment you just created.

```.\venv\Scripts\activate```

Now that your virtual environment has been activated, you can install the packages required with pip. Note that it might also take some of the dependencies used in the Jupyter Notebook.

```python -m pip install -r requirements.txt```

4. Start the backend

To start Flask, simply run, from within the backend folder:

```python -m flask --app searchbk run```

5. (Optional) Run the frontend on a second terminal

If you wish to run the frontend, create a second terminal instance and navigate to the "search" folder. Inside the "search folder", run:

```pnpm i ```

And once the dependencies are installed, run:

```pnpm run dev```