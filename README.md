# QueryBags Search Engine

This project is a Search Engine created with PyTerrier. The special twist to it is that it adds a visual component
to specify term requirement, term exclusion, and query expansion; features that are usually widely available in search engines, but not always shown to the average user. My objective is to make these features visually explicit and easy to handle for users.

These features are implemented through a visual component I call a "Query Bag", and there are three of them:

- **Must-have words:** You can specify words that the results must have somewhere in the page.
- **Forbidden words:** You can specify words that the results must absolutely not have anywhere in the page.
- **Related words:** You can get suggestions from the system to enhance your query, or add your own related terms. Makes query expansions explicit.



## Check it out, no downloads needed!

You can go to [the website](https://www.ir-bagsearch.com) and check it out!

I highly recommend visiting the website over trying to index the MSMARCO-Document collection yourself, because it will take a while. If you do want to try and run this yourself, see below for a detailed guide.

# How to run the project

## PART 1: Setting up your environment. 

### 1. Navigate to the backend project in a new terminal

You should go to the `backend` folder within your terminal.

### 2. Create a virtual environment

Depending on your version of Python, you may need to create it with `virtualenv` or with `venv`. Below you can see some examples.

```
python -m virtualenv venv # Creates a virtual environment called "venv"

python -m venv venv # Same thing, but with venv
```

### 3. Start your Virtual Environment

Now you can start within the terminal the virtual environment you just created. If you're on Windows, it looks like this:

```.\venv\Scripts\activate```

On Linux, at least on Ubuntu, it looks like this:

``` source venv/bin/activate```

### 4. Install the required packages

The packages I used are detailed in `requirements.txt`, so you can try to install it like so:

``` python -m pip -r requirements.txt```

However, I have had this not work before, so just in case, you can install these libraries by hand:

- Flask - `python -m pip install Flask`
- flask-cors - `python -m pip install flask-cors`
- python-terrier - `python -m pip install python-terrier==0.13.1`
- jupyterlab - `python -m pip install jupyterlab`

I know the `requirements.txt` file captured a lot more dependencies, but these are the essentials; you'll be fine. Just make sure that you install `python-terrier==0.13.1`, because I accidentally installed `pyterrier` once and the query language for term exclusion stopped working.

## PART 2: Processing the indices

For this step, it's best if you follow the jupyter notebook I created, [terrier_setup](backend/terrier_setup.ipynb). In there you can see how I processed the indices. Then you can come back to read what's next.

## PART 3: Starting the backend

To start Flask, first, remember that you need your terminal to be in the `backend` folder, and that you need to have activated your virtual environment, and you need to have installed the libraries as described above.

Then, simply run:

```python -m flask --app searchbk run```

## PART 4: (Optional) How to run the frontend on a second terminal

In case you wish to run the frontend, I have outlined the steps you need.

### 1. Create a second terminal instance

Don't close the terminal that is running the Flask frontend, and don't stop Flask either. Instead, create a new terminal. In VSCode, you can do this by pressing the "+" button in the top-right corner of the small terminal window at the bottom.

Once you've created a new terminal instance, navigate to `frontend/search`, because "search" is the React project.

### 2. Install the packages for the frontend

You can install the packages with npm or with pnpm, which is what I use. To install with pnpm, simply run:

```pnpm i ```

If for some reason that doesn't work, check the `package.json` file to inspect the libraries used.

### 3. Create the `.env` file, optionally a `.env.production` file too

You're gonna need this file because it contains environment variables that the frontend uses to connect to the backend. I did not include it because it can contain sensitive data, so it's standard practice to exclude it.

Variables you'll need:
- VITE_BORDERS=OFF
- VITE_BACKEND_URL=http://localhost:5000

I have written them exactly as you should place them in the `.env` file. The `VITE_BORDERS` variable, if changed to `ON`, will display borders around many components. I used this early on to design the layout of my website. However, the extra pixels that the borders add, even if small, can make a difference, so be warned.

Now, as you can see, `VITE_BACKEND_URL` connects to your local computer, to port 5000, where it expects your Flask backend to be. Make sure that it is! When you started Flask, it warns you of what port it chose.

If you want to connect this frontend to the actual production backend, I'll show you how: create another file called `.env.production`.

Here are the variables you'll need:
- VITE_BORDERS=OFF
- VITE_BACKEND_URL=https://www.ir-bagsearch.com

The format is much the same, we just change the `VITE_BACKEND_URL` value. With this, you don't even need to set up the backend to try out the frontend system. However, there's still one more step to perform.

### 4. Running the frontend: development and production

The next step is pretty simple. Make sure you got the `.env` file to run the frontend in development mode. Once you got that, in your second terminal (not the one where you're running Flask), run the following:

```pnpm run dev```

To run the frontend in production mode, instead run the following:

```pnpm run production```

This uses the `.env.production` file, so make sure that you created it.

# Project Structure and more detailed documentation

The project structure is quite simple:

- **`frontend` folder:** This folder contains the `search` folder, which is where the React project was created and developed.
- **`backend` folder:** This folder contains the Flask backend server, called `searchbk.py`, as well as the Jupyter Notebook, `terrier_setup.ipynb`, used to create the MSMARCO-document indices.

To get detailed information about the contents of each part of the project, please refer to the [docs](/docs/) folder; the files contained therein describe the following:

- [BACKEND_API](docs/BACKEND_API.md) : Describes the API endpoints, both a quick view and an in-depth view in later sections
- [FRONTEND_STRUCTURE](docs/FRONTEND_STRUCTURE.md) : Describes the structure of the React frontend project and what major components do.