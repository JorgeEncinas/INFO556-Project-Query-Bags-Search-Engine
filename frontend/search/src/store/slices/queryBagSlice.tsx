import type { StateCreator } from "zustand"
import type { queryBagTypes, relatedWordsBag } from "../../types/queryBagTypes"
import type { SearchStoreType } from "../../store/searchStore"
import { queryTagComplexData, queryTagSetData, queryTagSetData2 } from "../../../data/queryTagData"

export const captureNumbers = new RegExp( //Followed this tutorial to help me with RegEx for React
    //https://www.tutorialspoint.com/regex-in-reactjs
    "[0-9]+\.?([0-9]+)?"
)

export type QueryBagSliceType = {
    related_words_text_input: string,
    related_words_weight_input: string,
    forbidden_words_text_input: string,
    //forbidden_words_weight_input: string,
    must_have_words_text_input: string,
    //must_have_words_weight_input: string,
    setQueryBagTextInput: ( text : string, bagType: queryBagTypes ) => void,
    setQueryBagWeightInput: ( weight : string ) => void,
    related_words: relatedWordsBag,
    forbidden_words: Set<string>,
    must_have_words: Set<string>,
    addUpdateConstraintWords : (textInput : string, weightInput: string, bagType: queryBagTypes, addedBy:"user"|"system") => void,
    deleteConstraintWords: (words_to_delete : Set<string> | "all", constraintType: queryBagTypes) => void
}

// Guidance on slice type definition from https://zustand.docs.pmnd.rs/guides/typescript
// One key part is the "create without curried workaround" section, to pass in the arguments
// ["zustand/devtools", never]
export const createQueryBagSlice : StateCreator<SearchStoreType, [], [], QueryBagSliceType> = (set) => ({
    related_words_text_input: "",
    related_words_weight_input: "",
    forbidden_words_text_input: "",
    //forbidden_words_weight_input: "",
    must_have_words_text_input: "",
    //must_have_words_weight_input: "",
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
    related_words: queryTagComplexData,//{},
    forbidden_words: new Set<string>(queryTagSetData),
    must_have_words: new Set<string>(queryTagSetData2),
    addUpdateConstraintWords : (textInput : string, weightInput: string, bagType: queryBagTypes, addedBy:"user"|"system") => {
        //Check that no fields are empty
        if (textInput === "" || weightInput === "") {
            return
        }
        // Check that the weightInput can be registered as a number!
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
            } else { //related
                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        related_words: {
                            ...state.queryBagSlice.related_words,
                            [textInput]: {
                                "addedBy": addedBy,
                                "weight": newWeight
                            }
                        }
                    }
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
                        related_words: {}
                    }
                }
            }
            else {
                Object.keys(state.queryBagSlice.related_words).filter((term : string) => {
                    if (!(words_to_delete.has(term))) { //Only returns items NOT in the deletion list.
                        copy[term] = state.queryBagSlice.related_words[term]
                    }
                })
                return {
                    ...state,
                    queryBagSlice: {
                        ...state.queryBagSlice,
                        related_words: {
                            ...copy
                        }
                    }
                }
            }
            
        }
    })
})