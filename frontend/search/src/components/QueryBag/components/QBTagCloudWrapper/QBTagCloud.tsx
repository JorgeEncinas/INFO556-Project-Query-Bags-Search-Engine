import { TagCloud, type TagCloudProps } from "react-tagcloud"
import type { queryBagTypes, relatedWordsBag, relatedWordsBagItems } from "../../../../../types/queryBagTypes"
import useTransformIntoTags from "./hooks/useTransformIntoTags"
// ts-ignore from https://stackoverflow.com/a/54571297
// I added it because it seems like the library does not have type implementations

export const tagScalingFactor = 0.8
export const minTagSize = 0.5*tagScalingFactor
export const maxTagSize = 3*tagScalingFactor

export type tagPropsType = {
    addedBy : "user"|"system"|null
}

const QBTagCloud = ({ terms, bagType } : {
    terms : relatedWordsBag | Set<string>,
    bagType: queryBagTypes
}) => {
    //I think the terms received here can be specified as either of three types
    //  the "Forbidden" and "Must-Have" words all have the same weight (1)
    // While the "Related" words DO have different weights AND might even have a different color
    // That logic goes here! I think it's where it makes most sense
    //  So "related" have "addedBy" and "weight"

    // Tags need two values, though not necessarily, from what I am seeing
    //  1) value
    //  2) count

    const { list_of_tags, customRenderer } = useTransformIntoTags({ terms, bagType })
    //console.log(terms)
    //console.log(list_of_tags)

    return (
        <TagCloud
            tags={list_of_tags}
            className={"h-[50%] w-[70%] border border-b-rose-400 flex justify-between flex-wrap translate-y-6"}
            shuffle={true}
            minSize={minTagSize}
            maxSize={maxTagSize} //Get the max!
            renderer={customRenderer}
        />
    )
}

export default QBTagCloud