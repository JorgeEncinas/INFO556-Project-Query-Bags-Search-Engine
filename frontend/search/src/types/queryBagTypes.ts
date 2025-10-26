export type relatedWordsBagItems = {
    "addedBy": "system"|"user",
    "weight": number,
    "added": boolean  //Whether the item is a recommendation that has been added or not
}
export type relatedWordsBag = { [ term : string] : relatedWordsBagItems }

export type queryBagTypes = "must-have" | "forbidden" | "related"
