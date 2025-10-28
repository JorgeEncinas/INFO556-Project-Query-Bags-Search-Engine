/**
 * @fileoverview This file defines the main Zustand store and defers to the slices for more contained
 * functionality. This is the control of the client state for the whole application, making it easier to
 * share important variables and logic without the use of something like useContext, or something more
 * hands-on like useReducer..
 */
import { create } from "zustand"
import { createQueryBagSlice, type QueryBagSliceType } from "../store/slices/queryBagSlice"
import { createResultsSlice, type ResultsSliceType } from "./slices/resultsSlice";
//import { devtools } from "zustand/middleware"

/** Defines the possible pages; there are only two of them. */
export type SearchPagesType = "home" | "results"

/**
 * The definition for the Zustand State Store that handles client state.
 * 
 */
export interface SearchStoreType {
    /** The "Query Bag" slice, which keeps logic and variables specific to
     * the query bags isolated (and allows for cleaner code).
     */
    queryBagSlice: QueryBagSliceType;
    /**
     * The "Results" slice, which keeps logic and variables specific to
     * the results retrieved from a search query.
     */
    resultsSlice: ResultsSliceType;
    /**
     * The page being currently displayed.
     */
    displayedPage: SearchPagesType;
    /**
     * The current query that the user has written down in the search box.
     */
    query : string,
    /**
     * Anytime the user changes their query, the value is changed here.
     * 
     * @param newValue the new query value that must be saved into the state.
     * @returns nothing.
     */
    setQuery : (newValue : string) => void,
    /**
     * Sets the page to be displayed.
     * 
     * @param newPage the page to be displayed.
     * @returns nothing
     */
    setDisplayedPage : (newPage : SearchPagesType) => void
}

// Help from documentation
// AND from https://stackoverflow.com/a/74332509
// : StateCreator<SearchStoreType, [["zustand/devtools", never]], [], SearchStoreType>

/**
 * The main search store and the hook to call on all components that need access to client state.
 * 
 */
export const useSearchStore = create<SearchStoreType>()(
    (set, get, store) : SearchStoreType => { //Format from https://refine.dev/blog/zustand-react-state/#getting-started-with-zustand
        return {
            query: "",
            queryBagSlice: createQueryBagSlice(set, get, store),
            resultsSlice: createResultsSlice(set, get, store),
            displayedPage: "home",
            setQuery : (newValue : string) => {
                set((state) => {
                    return {
                        ...state,
                        query: newValue
                    }
                })
            },
            setDisplayedPage: (newPage : SearchPagesType) => {
                set((state) => {
                    return {
                        ...state,
                        displayedPage: newPage
                    }
                })
            }
        }
    }
)