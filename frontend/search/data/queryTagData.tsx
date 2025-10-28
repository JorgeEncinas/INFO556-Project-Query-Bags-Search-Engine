/** queryTagData.tsx
 *  
 *  @fileoverview This file contains dummy data for the Query Bag components, so that when initializing the system,
 *  I can already have items in the Query Bags for me to test.
 */
import type { relatedWordsBag } from "../src/types/queryBagTypes"
/**
 *  Placeholder 1 to put data into query bags. This one is longer to showcase the scrolling functionality.
 */
export const queryTagSetData = new Set<string>([
    "kipp", "star", "danc", "dancing", "with", "the", "stars",
    "ferrari", "overload", "by", "adding", "many", "examples"
])
/**
 * Placeholder 2 to put data into query bags. It can only be for the "Must-Have" bag
 * or for the "Forbidden" bag.
 */
export const queryTagSetData2 = new Set<string>([
    "alien", "venus", "sun", "star", "dancing", "georgia"
])
/**
 * Placeholder data for the "Related Words" bag, containing words added
 * by the user, or by the system, or words that are suggestions (i.e. not added yet).
 */
export const queryTagComplexData : relatedWordsBag = {
    "planet" : {
        "addedBy": "user",
        "weight":0.9,
        "added": true
    },
    "mars" : {
        "addedBy": "user",
        "weight":0.6,
        "added": true
    },
    "martian": {
        "addedBy":"system",
        "weight":0.7,
        "added": true
    },
    "earth": {
        "addedBy":"system",
        "weight":0.8,
        "added": true
    },
    "jupyter": {
        "addedBy":"system",
        "weight":0.9,
        "added": false
    },
    "saturn": {
        "addedBy":"system",
        "weight":1.2,
        "added": false
    },
    "sagan": {
        "addedBy":"system",
        "weight": 0.7,
        "added": false
    },
    "cosmos": {
        "addedBy":"system",
        "weight":1.2,
        "added": false
    },
    "andromeda":{
        "addedBy":"system",
        "weight":1.0,
        "added": false
    },
    "samsung":{
        "addedBy":"system",
        "weight":0.7,
        "added": false
    }
}