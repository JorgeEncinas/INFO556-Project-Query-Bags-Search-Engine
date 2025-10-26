import type { StateCreator } from "zustand"
import type { SearchStoreType } from "../searchStore"
import type { Results } from "../../types/resultsTypes"

export type ResultsSliceType = {
    displayedResult: number|null, //Actually a string e.g. "0"
    results: Results | {},
    setResults : ( results : Results ) => void
}
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