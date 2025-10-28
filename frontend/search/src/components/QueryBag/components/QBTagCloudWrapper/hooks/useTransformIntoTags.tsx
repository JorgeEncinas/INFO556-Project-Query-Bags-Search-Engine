/**
 * @fileoverview This file contains the custom hook for the logic concerning the rendering of words
 * that the TagCloud library requires. It specifies logic for defining the color and size of the words,
 * as well as the custom rendering function that is passed onto the TagCloud component to override its default
 * settings for visualization.
 */
import type { queryBagTypes, relatedWordsBag, relatedWordsBagItems } from "../../../../../types/queryBagTypes"
import type { Tag } from "react-tagcloud"
import { maxTagSize, minTagSize, tagScalingFactor } from "../components/QBTagCloud"
import QBTagCustomRenderer from "../../QBTagCustomRenderer.tsx/QBTagCustomRenderer"

/**
 * Constant that specifies the possible colors the words in the Tag Cloud can have.
 * This one defines words in the Must-Have Words bag, which are green.
 */
const mustHaveColors = [
    "#42D923",
    "#1EB400",
    "#2BFF00",
    "#68FF4A"
]
/**
 * Constant that specifies the possible colors the words in the Tag Cloud can have.
 * This one defines words in the Forbidden Words bag, which are red.
 */
const forbiddenColors = [
    "#CC1212",
    "#FB0404",
    "#FF4C4C",
    "#BE0D0D"
]
/**
 * Constant that specifies the possible colors the words in the Tag Cloud can have.
 * This one defines words in the Related Words bag, which are blue when added by the system.
 */
const relatedCase1Colors = [
    "#13BDD0",
    "#4DEDFF",
    "#46BDCA",
    "#0D94A3"
]

/**
 * This type defines the props that will go into the "Tag" type's props.
 * When the props are extracted, they must be parsed back into the "tagProps" type,
 * otherwise if it is an "object" type, TypeScript doesn't know what the object contains.
 */
export type tagProps = {
    bagType: queryBagTypes,
    added: boolean,
    weight: number
}

/**
 * This function casts an item into a "relatedWordsBag" type, which is the type definition
 * for the "Related Words" bag. It is different because this bag accepts "weight" measurements,
 * and separates words added by the user from those added by the system.
 * The way I find out is simply using the "bagType" property.
 * 
 * @param item - The set of items that will be parsed into the type of word bag it is.
 * @param bagType - The definition of the bag, which lets us infer the type of item collection we're dealing with.
 * @returns {boolean} - Whether the item is of type "relatedWordsBag"
 */
const isRelatedWordsBag = (item : relatedWordsBag | Set<string>, bagType : queryBagTypes): item is relatedWordsBag => {
    //From https://stackoverflow.com/a/40718205
    // and from https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
    return bagType === "related"
}

/**
 * Hook that encapsulates the logic for preparing the words in query bags into elements of type Tag,
 * as well as the function to override the rendering of TagCloud words.
 * 
 * @param props.terms - A collection of items that a query bag contains.
 * @param props.bagType - String that specifies the query bag that will be populated. Changes behavior slightly when
 * it is the "Related Words" query bag, since this one contains weights.
 * @returns The list of tags, and a custom renderer that overrides the TagCloud component's default rendering style
 * for the words
 */
const useTransformIntoTags = ({ terms, bagType } : { 
        terms : relatedWordsBag | Set<string>,
        bagType : queryBagTypes
    }) => {
    
    /** A function to choose a random item from an array.
     *  Taken from https://www.geeksforgeeks.org/javascript/how-to-select-a-random-element-from-array-in-javascript/ 
     */
    const chooseRandomFromArray = (array : Array<string>) => {
        return array[Math.floor(Math.random() * array.length) ]
    }
    
    /**
     * A function to get a color at random, and the array of colors depends on the Query Bag we're working on.
     * Must-Have Words are green, Forbidden Words are red, and Related Words are blue when added by the system,
     * white when added by the user.
     * @param addedBy - Determines who added the word: system or user. It is "null" when it doesn't apply,
     * that is, it doesn't apply for Forbidden Words nor Must-Have Words.
     * @returns a HEX Color as a string, used to define the color of a word
     */
    const getColor = (addedBy: "user"|"system"|null) => {
        if (bagType === "must-have") {
            return chooseRandomFromArray(mustHaveColors)
        } else if (bagType === "forbidden") {
            return chooseRandomFromArray(forbiddenColors)
        } else if (bagType === "related") {
            if (addedBy === null || addedBy === "user") {
                return "#FFF";
            }
            return chooseRandomFromArray(relatedCase1Colors)
        }
    }
    
    /**
     * Takes the weight of a word and transforms it into a size of that word.
     * Applies a constraint that limits the minimum and maximum value of the size.
     * 
     * @param weight The weight of the term as specified in the data storage (whether by the system or by the user).
     * @returns The size that the word should be displayed in.
     */
    const getFontSize = (weight: number | null) => {
        if(weight === null) {
            weight = 1*tagScalingFactor
        }
        return Math.max(Math.min(maxTagSize, weight*tagScalingFactor), minTagSize)
    }

    let list_of_tags = Array<Tag>()
    if(isRelatedWordsBag(terms, bagType)) {
        //console.log("Entered relatedWordsBag")
        
        Object.entries(terms).forEach(([term, items] : [term : string, items : relatedWordsBagItems]) => {
           
            list_of_tags.push(
                {
                    value: term,
                    key: term,
                    count: getFontSize(items.weight),
                    color: getColor(items.addedBy),
                    props: {
                        bagType: bagType,
                        added: items.added,
                        weight: items.weight
                    } as tagProps
                } as Tag 
            )
        })
    } else {

        terms.forEach((term : string) => {
            list_of_tags.push({
                value: term,
                key: term,
                count: 0.7,
                color: getColor(null),
                props: {
                    bagType: bagType,
                    added: true,
                    weight: 0.7
                } as tagProps
            } as Tag
            )
        })
    }

    /**
     * The custom rendering function that the TagCloud function expects to be able to override
     * the way terms are displayed in the Tag Cloud.
     * 
     * @param tag the item that the TagCloud component expects and passes on to the rendering function.
     * @returns The component that should be rendered to display the word.
     */
    const customRenderer = (tag : Tag) => { //From the library example in https://madox2.github.io/react-tagcloud/
        return (
            <QBTagCustomRenderer tag={tag} key={tag.key} />
        )
    }
        
    return {
        list_of_tags,
        customRenderer
    }
}

export default useTransformIntoTags