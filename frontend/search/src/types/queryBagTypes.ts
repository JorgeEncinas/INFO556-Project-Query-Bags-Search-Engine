export type relatedWordsBagItems = {
    "addedBy": "system"|"user",
    "weight": number
}
export type relatedWordsBag = { [ term : string] : relatedWordsBagItems }

export type queryBagTypes = "must-have" | "forbidden" | "related"
