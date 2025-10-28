/**
 * @fileoverview This component is the component for displaying a word in a TagCloud.
 * It contains logic for displaying it and for what should happen when you click on the word,
 * which is to add it or prepare it for modification of its weight value.
 */
import type { Tag } from "react-tagcloud"
import type { tagProps } from "../../QBTagCloudWrapper/hooks/useTransformIntoTags"
import { useSearchStore } from "../../../../../store/searchStore"

/**
 * This component is used to render each word in the TagCloud component. It is used for replacing
 * the default word rendering the "react-tagcloud" library provides. It also prepares the callbacks
 * that are called when you click on the word.
 * 
 * @param props.tag - The tag element that the TagCloud component will pass to this component to render
 * @param props.tagProps - the tagProps, which contains the additional data of the word that doesn't fit
 * the pre-defined properties of the "Tag" type.
 * @returns {JSX.Element}
 */
const QBTagWordDisplay = ({ tag, tagProps } : {
    tag : Tag,
    tagProps : tagProps
}) => {

    const page = useSearchStore((state) => state.displayedPage)
    const { 
        setQueryBagTextInput,
        setQueryBagWeightInput,
        addUpdateConstraintWords,
        setDisableRelatedWordsTextInput 
    } = useSearchStore((state) => state.queryBagSlice)

    return (
        <span
            className={`font-semibold  h-6 select-none 
                ${import.meta.env.VITE_BORDERS === "ON" ? "border border-yellow-200" : ""}
                ${tagProps.bagType === "related" ? "hover:cursor-pointer" : ""} 
                ${tagProps.added === false ? "animate-pulse" : ""}`}
            style={{
                fontSize:`${page === "results" ? tag.count*1.3 : tag.count*1.5}em`, //weight
                display:"inline-block",
                color: tagProps.added === false ? "#8f8f8f" : tag.color
            }}
            onClick={() => {
                if (tagProps.bagType === "related") {
                    if(tagProps.added === true) {
                        setQueryBagTextInput(tag.value, tagProps.bagType)
                        setDisableRelatedWordsTextInput(true)
                        setQueryBagWeightInput(String(tagProps.weight)) //, tagProps.bagType
                    } else {
                        //console.log(`${tag.value} clicked to add --> ${tagProps.weight}`)
                        addUpdateConstraintWords(tag.value, `${tagProps.weight+0.01}`, tagProps.bagType, "system")
                    } 
                }
            }}
        >
            {tag.value} 
        </span>
    )
}

export default QBTagWordDisplay;