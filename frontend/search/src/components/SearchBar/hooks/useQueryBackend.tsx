/**
 * @fileoverview Custom Hook containing the logic for doing all needed requests to the backend.
 * There is only need for two queries: one to do a search, and another for getting suggested terms to
 * place in the "Related Words" bag.
 */
import axios from "axios";
import type { Results } from "../../../types/resultsTypes";
import { useSearchStore } from "../../../store/searchStore";
import type { relatedWordsBagItems } from "../../../types/queryBagTypes";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

/**
 * This custom hook contains the logic for doing requests to the backend. There are two requests to do:
 *  1) Send a query request. It uses the /search endpoint of the backend, and sets the results afterwards,
 *     redirecting to the /results page in the frontend.
 *  2) Send a request for suggestions of related terms. It uses the /related endpoint of the backend.
 *     It then adds those terms to the "Related Words" bag grayed-out, as suggestions.
 * 
 * @returns a function that sends a request for a search to the backend, and a function that gets suggestions
 * on your current query.
 */
const useQueryBackend = () => {

    const navigate = useNavigate()
    const { query, setDisplayedPage } = useSearchStore((state) => state)
    
    const related_words = useSearchStore((state) => state.queryBagSlice.related_words)
    const forbidden_words = useSearchStore((state) => state.queryBagSlice.forbidden_words)
    const must_have_words = useSearchStore((state) => state.queryBagSlice.must_have_words)
    const related_words_count = useSearchStore((state) => state.queryBagSlice.related_words_count)
    const must_have_words_count = useSearchStore((state) => state.queryBagSlice.must_have_words).size
    const addSuggestedRelatedWords = useSearchStore((state) => state.queryBagSlice.addSuggestedRelatedWords)

    const setResults = useSearchStore((state) => state.resultsSlice.setResults)

    /**
     * Calls the /search API endpoint in the backend, sending the query.
     * Only does so if the query text is not empty. Then it sets the results and changes
     * the route in the frontend to /results, which changes the displayed component
     * to the Results Page.
     * 
     * @returns nothing.
     */
    const getQueryResults = async () => {
        if (query === "" && related_words_count < 1 && must_have_words_count < 1) {
            toast.warn(
                "Please enter something to search in the search bar or on either Must-Have words, or Related words", {
                    position: "bottom-right",
                    autoClose: 8000,
                    closeOnClick: true,
                    theme: "dark"
                }
            )
            return
        }
        let loadingToast = toast.loading(
            "Searching...",
            {
                position:"bottom-right",
                theme: "dark"
            }
        )
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
                must_have_words : Array.from(must_have_words),
                forbidden_words: Array.from(forbidden_words),
            }
        }
        console.log("Searching with...", requestContent)
        let axiosResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/search`,
            requestContent,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
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
        toast.dismiss(loadingToast)
    }

    /**
     * Receives the user's current query, which comes from a debounced input,
     * and uses it to query the backend for related terms to suggest. It then
     * adds these terms grayed-out as suggestions in the "Related Terms" query bag.
     * 
     * @param currentQuery - the user's currentQuery, straight from the search bar, not from the Zustand Store.
     * @returns nothing.
     */
    const getRelatedSuggestions = async (currentQuery : string) => {
        if(currentQuery === "") return

        let requestContent = {
            query: currentQuery
        }
        console.log("Searching for suggestions with...", requestContent)
        let axiosResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/related`,
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