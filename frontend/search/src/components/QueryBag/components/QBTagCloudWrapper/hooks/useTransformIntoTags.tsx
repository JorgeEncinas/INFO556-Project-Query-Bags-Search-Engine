import type { queryBagTypes, relatedWordsBag, relatedWordsBagItems } from "../../../../../../types/queryBagTypes"
import type { Tag } from "react-tagcloud"
import { maxTagSize, minTagSize, tagScalingFactor, type tagPropsType } from "../QBTagCloud"
import { useState } from "react"
import WhiteCloseSvg from "../../../../../assets/WhiteCloseSvg"
import QBTagCustomRenderer from "../QBTagCustomRenderer"

const mustHaveColors = [
    "#42D923",
    "#1EB400",
    "#2BFF00",
    "#68FF4A"
]
const forbiddenColors = [
    "#CC1212",
    "#FB0404",
    "#FF4C4C",
    "#BE0D0D"
]
const relatedCase1Colors = [
    "#13BDD0",
    "#4DEDFF",
    "#46BDCA",
    "#0D94A3"
]

const isRelatedWordsBag = (item : relatedWordsBag | Set<string>, bagType : queryBagTypes): item is relatedWordsBag => {
    //From https://stackoverflow.com/a/40718205
    // and from https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
    //console.log(`${bagType} === related ??? ${bagType ==="related"}`)
    return bagType === "related"
}

const useTransformIntoTags = ({ terms, bagType } : { 
        terms : relatedWordsBag | Set<string>,
        bagType : queryBagTypes
    }) => {
    
    const chooseRandomFromArray = (array : Array<string>) => {
        // From https://www.geeksforgeeks.org/javascript/how-to-select-a-random-element-from-array-in-javascript/
        return array[Math.floor(Math.random() * array.length) ]
    }
    
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
                    color: getColor(items.addedBy)
                } as Tag 
            )
        })
    } else {
        //console.log("Entered term extension")
        terms.forEach((term : string) => {
            list_of_tags.push({
                value: term,
                key: term,
                count: 1.1,
                color: getColor(null)
                } as Tag
            )
        })
    }

    const customRenderer = (tag : Tag) => { //From the library example in https://madox2.github.io/react-tagcloud/

        return (
            <QBTagCustomRenderer tag={tag}/>
        )
        return (
            <span
                key={tag.key} //term
                className={`flaX flaY px-[2px] font-semibold border border-yellow-200 h-8`}
                style={{
                    animationDelay: `${Math.random() * 2}s`,
                    fontSize:`${tag.count}em`, //weight
                    display:"inline-block",
                    color: tag.color
                }}
            >
                {tag.value} 
            </span>
        )
    }
        
    return {
        list_of_tags,
        customRenderer
    }
}

export default useTransformIntoTags