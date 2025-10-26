import axios from "axios";
import type { Results, Suggestions } from "../../../types/resultsTypes";
import { useSearchStore } from "../../../store/searchStore";
import type { relatedWordsBag, relatedWordsBagItems } from "../../../types/queryBagTypes";
import { useNavigate } from "react-router";

/**
 * Return the function that will execute your search, and set the results
 */
const useQueryBackend = () => {

    const navigate = useNavigate()
    const { query, setDisplayedPage } = useSearchStore((state) => state)
    
    const {
        related_words,
        forbidden_words,
        must_have_words,
        addSuggestedRelatedWords
    } = useSearchStore((state) => state.queryBagSlice)

    const setResults = useSearchStore((state) => state.resultsSlice.setResults)

    const getQueryResults = async () => {
        if (query === "") return

        let sentRelatedWords : { [key: string] : any } = {}

        Object.entries(related_words).forEach(([key, items] : [
            key : string,
            items : relatedWordsBagItems
        ]) => {
            if (items.added === true) {
                sentRelatedWords[key] = {
                    addedBy: items.addedBy,
                    weight: items.weight
                }
            }
        }) 
        let requestContent = {
            query: query,
            query_bags: {
                related_words: sentRelatedWords,
                must_have_words : must_have_words,
                forbidden_words: forbidden_words,
            }
        }
        console.log("Searching with...", requestContent)
        let axiosResponse = await axios.post(
            "http://localhost:5000/search",
            requestContent
        )
        let results : Results = axiosResponse.data
        console.log(results)
        if(!results) {
            console.log("No results found")
            return
        }
        setResults(results)
        setDisplayedPage("results")
        navigate("/results")
    }

    const getRelatedSuggestions = async (currentQuery : string) => {
        if(currentQuery === "") return

        let requestContent = {
            query: currentQuery
        }
        console.log("Searching for suggestions with...", requestContent)
        let axiosResponse = await axios.post(
            "http://localhost:5000/related",
            requestContent
        )
        let data = axiosResponse.data
        console.log("response", axiosResponse)
        console.log("data ", data.related_words)
        if(!data.hasOwnProperty("related_words")) {
            console.log("No related words found")
            return
        }

        addSuggestedRelatedWords(data.related_words)
    }
    
    return {
        getQueryResults,
        getRelatedSuggestions
    }
}

export default useQueryBackend