import type { relatedWordsBag } from "../src/types/queryBagTypes"
export const queryTagSetData = new Set<string>(["kipp", "star", "danc", "dancing", "with", "the", "stars", "ferrari"])
export const queryTagSetData2 = new Set<string>(["alien", "venus", "sun", "star", "dancing", "georgia"])
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