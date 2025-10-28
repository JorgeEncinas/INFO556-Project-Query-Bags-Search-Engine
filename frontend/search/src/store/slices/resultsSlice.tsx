/**
 * @fileoverview This file specifies the state for the "results" page. It is a slice of the Zustand store.
 */
import type { StateCreator } from "zustand"
import type { SearchStoreType } from "../searchStore"
import type { Results } from "../../types/resultsTypes"

/**
 * Type definition for the "Results" Slice.
 */
export type ResultsSliceType = {
    /**
     * If I were to support displaying a result in-page, this would serve to know which result is being displayed TODO 
     */
    displayedResult: number|null, //Actually a string e.g. "0"
    /**
     * The list of results retrieved from a query to the /search endpoint in the backend.
     */
    results: Results | {},
    /**
     * Function to set the results retrieved from the backend into the slice
     * 
     * @param results - The list of results obtained from a search query.
     * @returns nothing.
     */
    setResults : ( results : Results ) => void
}

/**
 * The slice for maintaining the state of the "results" page.
 * 
 * @param set - the "set" function that is needed to modify the state. Provided by Zustand.
 * @returns A slice of the Zustand store.
 */
export const createResultsSlice : StateCreator<SearchStoreType, [], [], ResultsSliceType> = (set) => ({
    displayedResult: null,
    results: {},
    setResults : (results : Results) => {
        set((state) => {
            return {
                ...state,
                resultsSlice: {
                    ...state.resultsSlice,
                    results: results
                }
            }
        })
    }
})