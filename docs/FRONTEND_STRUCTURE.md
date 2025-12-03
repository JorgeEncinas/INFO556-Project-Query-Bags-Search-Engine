# React Frontend Project Structure and Documentation

This document details how the Frontend is structured. Note that there are many components in there, and many of them are quite related, but nesting folders can create a labyrinth quite quickly, so I did my best to help maintain order.

## Technology Stack

Before we begin, let's go over the technology stack used in this project.

- **Vite:** Used to scaffold the initial React project with TailwindCSS and TypeScript
- **TypeScript:** Not so much a library or package as more of a language that allows using types in JavaScript, which makes code much more readable, and easier to come back to later.
- **TailwindCSS:** A library to style your components quickly and in real time.
- **react-tagcloud:** A library that allowed me to create and customize Word Clouds easily.
- **axios:** This library allows you to perform requests to the backend easily.
- **Zustand:** Used for state management without having to use more advanced or complex tools like Redux, or more manual tools like useReducer.
- **react-debounce-input:** Used for the search bar, so that we can get "Related Words" suggestions only once you're done typing.
- **React Router:** Used to create the two pages and change between them easily.
- **react-toastify:** Used to make notifications easily. They pop up when performing a search, or when you try to submit an empty field.

## Overview - Highest Level

Let's start by understanding the project at the highest level

- **"data" folder:** This folder contains files where I create dummy data. This dummy data helps me test the website's layout without having to actually connect the Frontend and the Backend. For this project, I needed dummy data for two different purposes:
    1. Testing out the Query Bags: How does it looks when there are many terms? Do all functionalities work as expected?
    2. Testing out the list of results displayed in /results, and their functionality
- **"public" folder:** This folder has the "SiteIcon.svg" and other svgs that are not made up of code. So it really only served to hold this svg.
- **"src" folder:** This folder is the home of all code components. We'll go into it on the section below.
- **".env" file:** You won't see this file in the repo because it holds sensitive data, but it's important that you create it if you want to test it out yourself. You only need to add two variables, so it's not all that sensible:
    1. `VITE_BORDERS=OFF` - This is an environment variable that turns OFF or ON some colored borders that I used during layout design. However, do note that when you turn them ON, because the borders are like 1-2px, it will change the layout slightly. Thus, it's misleading, but to me it was good enough when I was figuring out where the containers where placed.
    2. `VITE_BACKEND_URL=http://localhost:5000` - In essence the URL where your backend is. You can even point it at the production server (https://ir-bagsearch.com)

## The "src" folder and its contents

- **"assets" folder:** This folder hosts all the SVG components that are used in the app. I get the icons from free, open-source sites, and then transform them into code and adapt them to my use case.
- **"components" folder:** This folder hosts all the components I use in my website. The bigger components hold smaller components inside in a nested "components" folder. This helps me maintain order.
- **"pages" folder:** This folder hosts all the pages that my system shows. There are only really two pages: the `home` page and the `results` page, where you can see the list of results.
- **"store" folder:** This folder hosts the Zustand state store. In short, it holds my definition for the state and the operations that modify it. It is pretty amazing! Way easier than using useReducer hooks and all of that.
- **"types" folder:** This folder helps me define types for TypeScript, and keep them somewhat organized and clear.
- **App.tsx:** This file is where I do the setup for the page. You can see that the React Router is configured in there, the Toast container that is used for notifications, and the "Source Code" button that is always visible.
- **"index.css" file:** This file is the styling file. I added some custom things here, like the animation that makes terms in the query bag move up and down.

## The "components" folder: going over the main components.

This section concerns the main components of the website.

### 1. HomeTitle component

A pretty simple component, this is just the Logo that says "BagSearch". It is a button as well: when you click on it, it returns you to the "Home" page. Pretty much a standard in many websites and search engines, I believe.

In this and a few other components you will notice that there may be a conditional `if page !== "home"` or `page === "results"`. This is because I change the size of some components when we are in the "results" page: the Logo, the search bar, and the query bags.

### 2. QBDrawer Component

This is the main Query Bag Drawer component. I placed it in its own big folder because it is an overarching component. Inside of this component are many, many other components, nested in quite a few levels.

The Query Bag Drawer at its highest level has two components:
1. The "tab" that shows the summary of how many terms there are on each bag, and the "Clear All" button. The title can be clicked to contract the Query Bag Drawer.
2. The "Query Bag Area" as I call it, where the three query bags are displayed.

### 3. QueryBag Component

This is the Query Bag component, the main feature of this project! The reason it is not nested with the QBDrawer component is that it is a very dense component, it has:
- The QueryBag design and layout, in `QueryBag.tsx`
- The Query Bag title, in `QBTitle.tsx`
- The Bag svg which conveys the idea of a "bag" and must be carefully sized, in `QBSvgWrapper.tsx`
- The floating input field that appears when you hover over the bag, which is defined in `QBWordInput.tsx` and in `QBWeightInput.tsx` for the Weight segment that appears over the "Related Words" bag.
- The WordCloud rendering, in `QBTagCloudWrapper.tsx`, which calls the `react-tagcloud` library and manages the layout of the overall word cloud.
- The custom rendering for each word in `QBTagCustomRenderer.tsx`. This defines how every single word must be rendered inside the Word Cloud.

As you can see, the amount of components, to me, warrants placing it separately.

### 4. ResultsList Component

This component defines how the list of results from a query should look. It´s pretty simple, the `ResultsList.tsx` component is concerned with the layout of the overall items, while the `ResultItem.tsx` component defines the design of a single list item.

### 5. SearchBar Component

This component defines the Search Bar where the user types their query. It is also pretty central! It warrants its own placing, since it is important, has its own logic in a custom hook, and is placed in both pages.

## The "store" folder - Zustand Store

I won't go into detail here on what this store entails, because the store and its slices (which are like "compartments" of the store) are quite heavily documented with docstrings.

The important thing to know about it is that it handles all state for this app:
- The user's query and all terms in the query bags, including suggestions
- Keeps track of the current page (though React Router is mostly used for changing the page)
- Stores the results from the user's query, once the backend has retrieved relevant results.
- Holds all functions to modify this store.
