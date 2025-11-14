/**
 * @fileoverview Component that displays the list of results similar to how Search Engines do it: as a
 * scrollable list of items. Contains the logic from transforming data into components.
 */
import { useSearchStore } from "../../store/searchStore";
import type { Results } from "../../types/resultsTypes";
import ResultItem from "./components/ResultItem";

/**
 * Function that checks the specific type of an item, used to ensure TypeScript
 * that we're dealing with the exact type of object it expects.
 * 
 * @param item - The list of results, or an empty object.
 * @returns true if the object is of type "Results", false otherwise
 */
const isResultsType = (item : {} | Results): item is Results => {
    //From https://stackoverflow.com/a/40718205
    // and from https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
    return item.hasOwnProperty("title")
}

/**
 * Iterates over all the results from the query and transforms them into components to be rendered
 * inside a scrollable list, similar to Google's and other search engines' design.
 * 
 * @returns {JSX.Element}
 */
const ResultsList = () => {

    const results = useSearchStore((state) => state.resultsSlice.results)

    if (!isResultsType(results)) {
        return (
            <div 
                className={`
                    ${import.meta.env.VITE_BORDERS === "ON" ? "border border-violet-700" : ""}
                    w-[100%] h-[100%] flex items-center justify-center`}
            >
                No results found.
            </div>
        )
    }

    const resultsCount = isResultsType(results)
    ?   Object.keys(results.title).length
    :   0

    //Snippet inspired from https://stackoverflow.com/a/22877049
    const resultComponents = []
    for(let i = 0; i < resultsCount; i++) { 
        resultComponents.push(
            <ResultItem
                key={`result-list-item-${i}`}
                title={results.title[i]}
                body={results.body[i]}
                url={results.url[i]}
            />
        )
    } 

    return (
        <div
            className={`flex flex-col w-[100%] h-[100%] justify-center items-center`}
        >
            {
                resultComponents
            }
        </div>    
    )
}

export default ResultsList;