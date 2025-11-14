/**
 * @fileoverview Details the "Query Bag" Slice of the store, which contains all
 * variables that are maintained as the state of our query bags, such as the values of input fields,
 * the terms stored in each query bag, and the logic to modify these properties.
 */
import type { StateCreator } from "zustand"
import type { queryBagTypes, relatedWordsBag, relatedWordsBagItems } from "../../types/queryBagTypes"
import type { SearchStoreType } from "../../store/searchStore"
//import { queryTagComplexData, queryTagSetData, queryTagSetData2 } from "../../../data/queryTagData"
import type { SuggestedTerm } from "../../types/resultsTypes"

export const captureNumbers = new RegExp( //Followed this tutorial to help me with RegEx for React
    //https://www.tutorialspoint.com/regex-in-reactjs
    "[0-9]+\.?([0-9]+)?"
)

/**
 * Type definition of the Query Bag Slice.
 * 
 */
export type QueryBagSliceType = {
    /** The items in the "Related Words" query bag */
    related_words: relatedWordsBag,
    /** The items in the "Forbidden Words" query bag */
    forbidden_words: Set<string>,
    /** The items in the "Must-Have Words" query bag */
    must_have_words: Set<string>,
    /** The number of words actually added into the Related Words bag (ignores suggestions) */
    related_words_count : number,
    /** The text input field for a term in the "Related Words" query bag */
    related_words_text_input: string,
    /** The text input field for the weight in the "Related Words" query bag */
    related_words_weight_input: string,
    /** The text input field for a term in the "Forbidden Words" query bag */
    forbidden_words_text_input: string,
    /** The text input field for a term in the "Must-Have Words" query bag */
    must_have_words_text_input: string,
    /** Boolean that defines if the "Related Words" input field should be disabled
     *  Used whenever the user wants to update the weight of an already-added term.
     */
    disableRelatedWordsTextInput: boolean,
    /**
     *  Changes whether the "Related Words" term input should be disabled or not.
     *  It is disabled when the user is updating the weight of an existing term.
     *  If the user's cursor leaves the Query Bag, it is enabled again.
     * @param newValue - The new value of the boolean variable.
     * @returns nothing.
     */
    setDisableRelatedWordsTextInput: (newValue : boolean) => void,
    /**
     * Sets the value of the "Term" field input of the specified Query Bag.
     * 
     * @param text - The text that we should set in the "Term" input field
     * @param bagType - the Query Bag where we should apply this change.
     * @returns nothing.
     */
    setQueryBagTextInput: ( text : string, bagType: queryBagTypes) => void,
    /**
     * Sets the value of the "weight" input field in the "Related Words" query bag.
     * 
     * @param weight - the new weight to set in the input, may be an empty string
     * @returns nothing.
     */
    setQueryBagWeightInput: ( weight : string ) => void,
    /**
     * Deletes all words in the "Related Words" field that remain as suggestions. That is,
     * all pulsating, grayed-out words. Done so the system can insert new grayed-out pulsating words.
     * 
     * @returns nothing
     */
    deleteRelatedWords : () => void,
    /**
     * Adds or Updates a Query Bag's collection of items.
     * 
     * @param textInput - The value of the text input that will be added to the existing collection
     * @param weightInput - The weight value for the new term.
     * @param bagType - The query bag that this term should be added to.
     * @param addedBy - Who is responsible for suggesting this term, in the case of the "Related Words" query bag
     * @returns nothing.
     */
    addUpdateConstraintWords : (textInput : string, weightInput: string, bagType: queryBagTypes, addedBy:"user"|"system") => void,
    /**
     * Takes the terms from a query to the backend for suggestions, and adds them,
     * being careful of not overwriting terms that already exist in the "Related Terms" query bag.
     * 
     * @param terms - the suggested terms to be added as pulsating, grayed-out terms
     * @returns nothing.
     */
    addSuggestedRelatedWords : (terms : SuggestedTerm[]) => void,
    /**
     * Deletes all terms in all query bags.
     * 
     * @returns nothing
     */
    deleteAllConstraintWords : () => void,
    /**
     * Deletes terms from a specific query bag.
     * 
     * @param words_to_delete - the terms that should be deleted, or "all" if it should delete all terms
     * @param constraintType - The query bag that it should apply the deletion to.
     * @returns nothing.
     */
    deleteConstraintWords: (words_to_delete : Set<string> | "all", constraintType: queryBagTypes) => void
}

// Guidance on slice type definition from https://zustand.docs.pmnd.rs/guides/typescript
// One key part is the "create without curried workaround" section, to pass in the arguments
// ["zustand/devtools", never]

/**
 * "Query Bag" Slice for maintaining the client state regarding the query bag components. 
 * 
 * @param set - Zustand's needed "set" property for modifying the current state of the store.
 * @returns A slice of the Zustand store, specifically, the "Query Bag" slice.
 */
export const createQueryBagSlice : StateCreator<SearchStoreType, [], [], QueryBagSliceType> = (set) => ({
    related_words: {}, //queryTagComplexData,//{},
    forbidden_words: new Set<string>(), //new Set<string>(queryTagSetData),
    must_have_words: new Set<string>(), //new Set<string>(queryTagSetData2),
    related_words_count : 0,
    related_words_text_input: "",
    related_words_weight_input: "",
    forbidden_words_text_input: "",
    must_have_words_text_input: "",
    disableRelatedWordsTextInput: false,
    setDisableRelatedWordsTextInput: (newValue : boolean) => {
        set((state) => {
            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    disableRelatedWordsTextInput: newValue
                }
            }
        })
    },
    deleteRelatedWords : () => {
        set((state) => {
            let copy_of_related_words : relatedWordsBag = state.queryBagSlice.related_words
            let new_related_words : relatedWordsBag = {}

            Object.entries(copy_of_related_words).forEach(([term, items] : [
                term : string,
                items: relatedWordsBagItems
            ]) => {
                if (items.added) {
                    new_related_words[term] = items
                }
            })

            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    related_words: new_related_words
                }
            }
        })
    },
    setQueryBagTextInput: (text : string, bagType : queryBagTypes) => set((state) => {
        if (bagType === "forbidden") {
            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    forbidden_words_text_input: text
                }
            }
        } else if (bagType === "must-have") {
            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    must_have_words_text_input: text
                }
            }
        } else { //"related"
            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    related_words_text_input: text
                }
            }
        }
    }),
    setQueryBagWeightInput: ( weight : string) => { //, bagType: queryBagType
        set((state) => {
            /*if (bagType === "forbidden") {
                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        forbidden_words_weight_input: weight
                    }
                }
            } else if (bagType == "must-have") {
                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        must_have_words_weight_input: weight
                    }
                }
            } */ 
            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    related_words_weight_input: weight
                }
            }
            
        })
    },
    addSuggestedRelatedWords : (terms : SuggestedTerm[]) => {
        set((state) => {

            // STEP 1: GET A COPY OF THE CURRENT RELATED WORDS
            let copy_of_related_terms = { 
                ...state.queryBagSlice.related_words
            }
        
            // STEP 2: GRAB JUST THE WORDS THAT ARE OFFICIALLY ADDED
            let related_terms : relatedWordsBag = {}
            Object.entries(copy_of_related_terms).forEach(([key, items] : [
                key: string,
                items: relatedWordsBagItems
            ]) => {
                if(items.added === true) {
                    related_terms[key] = items
                }
            })

            // STEP 3: FOR EACH OF THE SUGGESTED WORDS, JUST CHECK
            //         THAT IT HASN'T BEEN ADDED YET!
            //         Effectively, we deleted all gray words, and just add
            //         new gray words.
            terms.forEach(([term, weight] : [
                term : string,
                weight : number
            ]) => {
                if(!(term in related_terms)) {
                    related_terms[term] = {
                        addedBy: "system",
                        weight: Math.min(Math.max(weight, 0.6), 1.0),
                        added: false
                    }
                }
            })

            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    related_words: related_terms
                }
            }
        })
    },
    addUpdateConstraintWords : (textInput : string, weightInput: string, bagType: queryBagTypes, addedBy:"user"|"system") => {
        // Check that no fields are empty
        if (textInput === "" || weightInput === "") {
            return
        }
        let newWeight = Number(weightInput)
        if(bagType === "related" && isNaN(newWeight)) { //Otherwise we don't really care about the weight!
            return
        }
        // At this point, we're sure that 1) We got a string, 2) we got a valid number
        set((state) => {
            if(bagType === "must-have") {
                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        must_have_words: new Set<string>([...state.queryBagSlice.must_have_words, textInput]) // From https://stackoverflow.com/a/55603608
                    }
                }
            } else if (bagType == "forbidden") {
                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        forbidden_words: new Set<string>([...state.queryBagSlice.forbidden_words, textInput]) // From https://stackoverflow.com/a/55603608
                    }
                }
            } else { // Related

                const new_related_words : { [x: string] : relatedWordsBagItems } = {
                    ...state.queryBagSlice.related_words,
                        [textInput]: {
                            "addedBy": addedBy,
                            "weight": newWeight,
                            "added":true
                        }
                }
                let new_related_words_count = 0
                
                Object.keys(new_related_words).map((key : string) => {
                    if (new_related_words[key].added === true) {
                        new_related_words_count++;
                    }
                })


                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        related_words_text_input: "",
                        related_words_weight_input: "",
                        related_words: new_related_words,
                        related_words_count: new_related_words_count
                    }
                }
            }
            
        })
    },
    deleteAllConstraintWords : () => {
      set((state) => {
        return {
            ...state,
            queryBagSlice: {
                ...state.queryBagSlice,
                related_words: {},
                related_words_count: 0,
                must_have_words: new Set<string>(),
                forbidden_words: new Set<string>()
            }
        }
      })  
    },
    deleteConstraintWords: (words_to_delete : Set<string> | "all", constraintType: queryBagTypes) => set((state) => {
        if (constraintType === "forbidden") {
            let newSet = new Set<string>()
            if (words_to_delete !== "all") { // When "all" the set remains empty, deleting all entries.
                state.queryBagSlice.forbidden_words.forEach((word : string) => {
                    if (!(words_to_delete.has(word))) {
                        newSet.add(word)
                    }
                })
            }
            return {
            ...state,
            queryBagSlice: {
                ...state.queryBagSlice,
                forbidden_words: newSet
            }
        }
        } else if (constraintType === "must-have") { //"must-have"
            let newSet = new Set<string>()
            if (words_to_delete !== "all") { // When "all" the set remains empty, deleting all entries.   
                state.queryBagSlice.must_have_words.forEach((word : string) => {
                    if (!(words_to_delete.has(word))) {
                        newSet.add(word)
                    }
                })
            }
            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    must_have_words: newSet
                }
            }
        } else { // "related"
            console.log("Deletion entered related")
            let copy : relatedWordsBag = {}
            if (words_to_delete === "all") { // When "all" the set remains empty, deleting all entries.
                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        related_words: {},
                        related_words_count: 0
                    }
                }
            }
            else {
                let new_related_words_count = 0
                Object.keys(state.queryBagSlice.related_words).filter((term : string) => {
                    if (!(words_to_delete.has(term))) { //Only returns items NOT in the deletion list.
                        copy[term] = state.queryBagSlice.related_words[term]
                    }
                })
                Object.keys(copy).forEach((term : string) => {
                    if (copy[term].added) {
                        new_related_words_count++;
                    }
                })
                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        related_words: copy,
                        related_words_count: new_related_words_count
                    }
                }
            }
            
        }
    })
})