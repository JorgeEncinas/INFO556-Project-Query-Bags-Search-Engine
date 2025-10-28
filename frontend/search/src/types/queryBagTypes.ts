/**
 * @fileoverview This file defines the types for the WordBag items as defined in the Zustand store slice
 * that is dedicated to the Query Bags.
 */

/**
 * This type defines the values that each item in the "Related Words" Query Bag contains.
 */
export type relatedWordsBagItems = {
    /** Whether the term was added by the system or by the user */
    "addedBy": "system"|"user",
    /** The weight assigned to this term, which determines its influence in the query */
    "weight": number,
    /** Whether the item is a recommendation that has been added or not.
     *  Terms not added appear in a pulsating gray font. */
    "added": boolean
}
/**
 * This type defines what the Related Words bag contains. It is a dictionary
 * in which each term has a "relatedWordsBagItem" (defined above).
 */
export type relatedWordsBag = { [ term : string] : relatedWordsBagItems }

/**
 * This type defines the possible types of the query bags. Since there are only three query bags,
 * there are thus only three specific strings. These are used for logic concerning
 * the manipulation of the items in the query bags, like color or size.
 */
export type queryBagTypes = "must-have" | "forbidden" | "related"
