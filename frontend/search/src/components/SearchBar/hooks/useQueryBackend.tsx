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
        //Check that your search is not empty
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
        // Let's also clean the query
        let queryCasePattern = /[\'\"\-\+]+/g // Catches certain characters that might break the program
        let queryCleaned = query.replaceAll(queryCasePattern, "")
        //console.log(`${query} was modified to ${queryCleaned}`)

        // Protects against queries that would be empty as well.
        if (queryCleaned === "") return
        
        //Create the loading toast
        let loadingToast = toast.loading(
            "Searching...",
            {
                position:"bottom-right",
                theme: "dark"
            }
        )
        //This object will hold the related words in a format for the backend
        let sentRelatedWords : { [key: string] : any } = {}

        //Iterate over my words, and add them ONLY if they're not gray items (suggestions)
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
        // Creating the POST request
        let requestContent = {
            query: queryCleaned,
            query_bags: {
                related_words: sentRelatedWords,
                must_have_words : Array.from(must_have_words),
                forbidden_words: Array.from(forbidden_words),
            }
        }
        console.log("Searching with...", requestContent)
        try { // Try/catch syntax consulted from https://www.w3schools.com/js/js_errors.asp
            // Sending it and awaiting an answer with axios
            let axiosResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/search`,
                requestContent,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 10000 //Ten seconds
                }
            )
            // Set the search results received
            let results : Results = axiosResponse.data
            console.log(results)
            // If we have no results, then go back
            if(!results) {
                console.log("No results found")
                return
            }
            // If we do have results, then we can move to the results page.
            setResults(results)
            setDisplayedPage("results")
            navigate("/results")
            toast.dismiss(loadingToast)
        } catch (error) {
            toast.dismiss(loadingToast)
            toast.error("Oops! something happened and we couldn't process your request!", {
                theme: "dark"
            })
        }
        
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
        // If the current query is empty, then we can't ask for suggestions
        if(currentQuery === "") return

        // Let's also clean the query
        let queryCasePattern = /[\'\"\-\+]+/g // Catches certain characters that might break the program
        let queryCleaned = currentQuery.replaceAll(queryCasePattern, "")
        //console.log(`${currentQuery} was modified to ${queryCleaned}`)

        // Protects against queries that would be empty as well.
        if (queryCleaned === "") return

        // Creating the request to use in the POST
        let requestContent = {
            query: queryCleaned
        }
        console.log("Searching for suggestions with...", requestContent)
        // Doing the request and waiting with axios
        try { // Try/catch syntax consulted from https://www.w3schools.com/js/js_errors.asp
            let axiosResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/related`,
                requestContent
            )
            let data = axiosResponse.data
            console.log("response", axiosResponse)
            console.log("data ", data.related_words)
            // If the response is empty, we can't do anything
            if(!data.hasOwnProperty("related_words")) {
                console.log("No related words found")
                return
            }
            // Otherwise, we do have results! set them.
            
            addSuggestedRelatedWords(data.related_words)
        } catch (error) {
            console.log("Error getting suggestions", error)
        }
        
    }
    
    return {
        getQueryResults,
        getRelatedSuggestions
    }
}

export default useQueryBackend