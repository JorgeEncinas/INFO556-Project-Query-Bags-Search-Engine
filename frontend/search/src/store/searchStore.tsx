import { create } from "zustand"
import { createQueryBagSlice, type QueryBagSliceType } from "../store/slices/queryBagSlice"
import { createResultsSlice, type ResultsSliceType } from "./slices/resultsSlice";
//import { devtools } from "zustand/middleware"

export type SearchPagesType = "home" | "results"

export interface SearchStoreType {
    queryBagSlice: QueryBagSliceType;
    resultsSlice: ResultsSliceType;
    displayedPage: SearchPagesType;
    query : string,
    setQuery : (newValue : string) => void,
    setDisplayedPage : (newPage : SearchPagesType) => void
}

// Help from documentation
// AND from https://stackoverflow.com/a/74332509
// : StateCreator<SearchStoreType, [["zustand/devtools", never]], [], SearchStoreType>
//devtools(
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