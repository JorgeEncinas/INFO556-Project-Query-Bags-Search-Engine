/** queryTagData.tsx
 *  
 *  This file contains dummy data for the Query Bag components, so that when initializing the system,
 *  I can already have items in the Query Bags for me to test.
 */
import type { relatedWordsBag } from "../src/types/queryBagTypes"
export const queryTagSetData = new Set<string>(["kipp", "star", "danc", "dancing", "with", "the", "stars", "ferrari", "overload", "by", "adding", "many", "examples"])
export const queryTagSetData2 = new Set<string>(["alien", "venus", "sun", "star", "dancing", "georgia"])
export const queryTagComplexData : relatedWordsBag = {
    "planet" : {
        "addedBy": "user",
        "weight":1.5,
        "added": true
    },
    "mars" : {
        "addedBy": "user",
        "weight":1.5,
        "added": true
    },
    "martian": {
        "addedBy":"system",
        "weight":1.2,
        "added": true
    },
    "earth": {
        "addedBy":"system",
        "weight":1.2,
        "added": true
    },
    "jupyter": {
        "addedBy":"system",
        "weight":1.2,
        "added": false
    },
    "saturn": {
        "addedBy":"system",
        "weight":1.2,
        "added": false
    },
    "sagan": {
        "addedBy":"system",
        "weight": 1.2,
        "added": false
    },
    "cosmos": {
        "addedBy":"system",
        "weight":1.2,
        "added": false
    },
    "andromeda":{
        "addedBy":"system",
        "weight":1.2,
        "added": false
    },
    "samsung":{
        "addedBy":"system",
        "weight":1.2,
        "added": false
    }
}