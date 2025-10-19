import type { relatedWordsBag } from "../types/queryBagTypes"
export const queryTagSetData = new Set<string>(["kipp", "star", "danc", "dancing", "with", "the", "stars", "ferrari"])
export const queryTagComplexData : relatedWordsBag = {
    "planet" : {
        "addedBy": "user",
        "weight":1.5
    },
    "mars" : {
        "addedBy": "user",
        "weight":1.5
    },
    "martian": {
        "addedBy":"system",
        "weight":1.2
    },
    "earth": {
        "addedBy":"system",
        "weight":1.2
    }
}