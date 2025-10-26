import type { Tag } from "react-tagcloud"
import type { tagProps } from "../../QBTagCloudWrapper/hooks/useTransformIntoTags"
import { useSearchStore } from "../../../../../store/searchStore"

const QBTagWordDisplay = ({ tag, tagProps } : {
    tag : Tag,
    tagProps : tagProps
}) => {

    const page = useSearchStore((state) => state.displayedPage)
    const setQueryBagTextInput = useSearchStore((state) => state.queryBagSlice.setQueryBagTextInput)
    const setQueryBagWeightInput = useSearchStore((state) => state.queryBagSlice.setQueryBagWeightInput)
    const addUpdateConstraintWords = useSearchStore((state) => state.queryBagSlice.addUpdateConstraintWords)
    const setDisableRelatedWordsTextInput = useSearchStore((state) => state.queryBagSlice.setDisableRelatedWordsTextInput)

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
                        addUpdateConstraintWords(tag.value, `${tag.count}`, tagProps.bagType, "system")
                    } 
                }
            }}
        >
            {tag.value} 
        </span>
    )
}

export default QBTagWordDisplay;