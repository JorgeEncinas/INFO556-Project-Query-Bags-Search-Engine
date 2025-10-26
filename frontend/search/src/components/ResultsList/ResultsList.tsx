import { useSearchStore } from "../../store/searchStore";
import type { Results } from "../../types/resultsTypes";
import ResultItem from "./components/ResultItem";

const isResultsType = (item : {} | Results): item is Results => {
    //From https://stackoverflow.com/a/40718205
    // and from https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
    //console.log(`${bagType} === related ??? ${bagType ==="related"}`)
    return item.hasOwnProperty("title")
}


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
            className={`flex flex-col w-[100%] h-[100%] justify-center items-start`}
        >
            {
                resultComponents
            }
        </div>    
    )
}

export default ResultsList;