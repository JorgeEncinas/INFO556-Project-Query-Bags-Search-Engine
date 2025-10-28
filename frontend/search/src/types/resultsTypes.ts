/**
 * @fileoverview - This file defines types for the resulting entries from a search query,
 * as well as types for the suggestions the backend will yield. This helps maintain consistency
 * with the results from queries, making integration in the frontend easy.
 */

/**
 * This type defines a specific result entry. Refer to "Results" to get a better idea of what
 * exactly PyTerrier returns as results.
 */
export type ResultEntries = {
    [entryNumber : number] : string
}

/**
 * This type defines the exact format of the search results that PyTerrier returns.
 */
export type Results = {
    title: ResultEntries,
    body: ResultEntries,
    url: ResultEntries
}

/**
 * This type defines how each of the suggested terms from the backend is formatted
 */
export type SuggestedTerm = [
    string,
    number
] //Defines a tuple
// As seen in https://www.w3schools.com/typescript/typescript_tuples.php

/**
 * This type defines how the backend returns an array of suggestions from the /related endpoint.
 */
export type Suggestions = {
    related_words : Array<SuggestedTerm>
}