import type { StateCreator } from "zustand"
import type { relatedWordsBag } from "../../types/queryBagTypes"
import type { SearchStoreType } from "../searchStore"

export type QueryBagSliceType = {
    related_words: relatedWordsBag,
    forbidden_words: Set<string>,
    must_have_words: Set<string>,
    addConstraintWords : (words_to_add : Array<string>, constraintType: "forbidden" | "must-have") => void,
    deleteConstraintWords: (words_to_delete : Set<string> | "all", constraintType: "forbidden" | "must-have") => void,
    deleteRelatedWords: (words_to_delete : Set<string>) => void,
    addUpdateRelatedWords: (new_related_words : relatedWordsBag) => void
}

// Guidance on slice type definition from https://zustand.docs.pmnd.rs/guides/typescript
// One key part is the "create without curried workaround" section, to pass in the arguments
// ["zustand/devtools", never]
export const createQueryBagSlice : StateCreator<SearchStoreType, [], [], QueryBagSliceType> = (set) => ({
    related_words: {},
    forbidden_words: new Set<string>(),
    must_have_words: new Set<string>(),
    addConstraintWords : (words_to_add : Array<string>, constraintType: "forbidden" | "must-have") => set((state) => {
        if (constraintType === "forbidden") {
            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    forbidden_words: new Set<string>([...state.queryBagSlice.forbidden_words, ...words_to_add]) // From https://stackoverflow.com/a/55603608
                }
            }
        } else {
            return {
                ...state,
                queryBagSlice: {
                    ...state.queryBagSlice,
                    must_have_words: new Set<string>([...state.queryBagSlice.must_have_words, ...words_to_add])
                }
            }
        }
    }),
    deleteConstraintWords: (words_to_delete : Set<string> | "all", constraintType: "forbidden" | "must-have") => set((state) => {
        if (constraintType === "forbidden") {
            let newSet = new Set<string>()
            if (words_to_delete !== "all") { // When "all" the set remains empty, deleting all entries.
                state.queryBagSlice.forbidden_words.forEach((word : string) => {
                    if (!(word in words_to_delete)) {
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
        } else { //"must-have"
            let newSet = new Set<string>()
            if (words_to_delete !== "all") { // When "all" the set remains empty, deleting all entries.
                state.queryBagSlice.must_have_words.forEach((word : string) => {
                    if (!(word in words_to_delete)) {
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
        }
    }),
    deleteRelatedWords: (words_to_delete : Set<string>) => set((state) => {
        let copy : relatedWordsBag = {}
        Object.keys(state.queryBagSlice.related_words).filter((term : string) => {
            if (!(term in words_to_delete)) { //Only returns items NOT in the deletion list.
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
    }),
    addUpdateRelatedWords: (new_related_words : relatedWordsBag) => set((state) => {
        let state_copy_related_words = {...state.queryBagSlice.related_words }
        
        for(const [term, wordsBag] of Object.entries(new_related_words)) {
            state_copy_related_words[term] = wordsBag
        }
        return {
            ...state,
            queryBagSlice: {
                ...state.queryBagSlice,
                related_words: state_copy_related_words
            }
        }
    })
})