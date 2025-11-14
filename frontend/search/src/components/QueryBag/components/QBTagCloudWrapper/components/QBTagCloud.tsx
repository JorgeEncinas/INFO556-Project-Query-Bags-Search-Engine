/**
 * @fileoverview This component is the inner component of the Query Bag TagCloud.
 * A Tag Cloud or Word Cloud is the chosen visual display for the query constraints and reformulations
 * the user will pile on top of their query. This component sets up the data rendering for the tags and
 * calls the TagCloud library.
 */
import { TagCloud } from "react-tagcloud"
import type { queryBagTypes, relatedWordsBag } from "../../../../../types/queryBagTypes"
import useTransformIntoTags from "../hooks/useTransformIntoTags"

/**
 * This constant is used to vary the size of the words displayed in the query bags.
 */
export const tagScalingFactor = 0.8
/**
 * This constant is to choose the minimum value which must be specified for the TagCloud library
 * I am not sure exactly of what it does, so I just set it to a reasonable min considering
 * the range of values I decided for the weights
 */
export const minTagSize = 0.5*tagScalingFactor
/**
 * This constant defines the maximum value, a parameter that must be specified for the TagCloud library.
 * I am not exactly sure of what it does, so I just set it to a reasonable max, considering
 * the range of values I decided for the weights.
 */
export const maxTagSize = 3*tagScalingFactor

export type tagPropsType = {
    addedBy : "user"|"system"|null
}

/**
 * Component that renders the TagCloud component (from the react-tagcloud library), setting up
 * the elements that it needs. This is the inner element of the QBTagCloudWrapper.
 * 
 * @param props.terms - The terms which must be rendered in this specific TagCloud
 * @param props.bagType -  The bagType that all of these terms belong to. Used for the logic (contained in the hook)
 * @returns {JSX.Element}
 */
const QBTagCloud = ({ terms, bagType } : {
    terms : relatedWordsBag | Set<string>,
    bagType: queryBagTypes
}) => {

    const { list_of_tags, customRenderer } = useTransformIntoTags({ terms, bagType })    

    return (
        <TagCloud
            tags={list_of_tags}
            className={`${import.meta.env.VITE_BORDERS === "ON" ? "border border-rose-400" : ""} 
                h-[71%] w-[57%] pt-1 mt-4 flex justify-around flex-wrap translate-y-8 overflow-y-scroll`}
            shuffle={false}
            minSize={minTagSize}
            maxSize={maxTagSize} //Get the max!
            renderer={customRenderer}
        />
    )
}

export default QBTagCloud