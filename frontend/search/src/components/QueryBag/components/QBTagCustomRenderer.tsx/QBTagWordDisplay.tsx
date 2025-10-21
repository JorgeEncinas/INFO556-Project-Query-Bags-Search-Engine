import type { Tag } from "react-tagcloud"
import type { tagProps } from "../QBTagCloudWrapper/hooks/useTransformIntoTags"
import { useSearchStore } from "../../../../store/searchStore"

const QBTagWordDisplay = ({ tag, tagProps } : {
    tag : Tag,
    tagProps : tagProps
}) => {

    const setQueryBagTextInput = useSearchStore((state) => state.queryBagSlice.setQueryBagTextInput)
    const setQueryBagWeightInput = useSearchStore((state) => state.queryBagSlice.setQueryBagWeightInput)

    return (
        <span
            className={` font-semibold border border-yellow-200 h-8 select-none ${tagProps.bagType === "related" ? "hover:cursor-pointer" : ""} `}
            style={{
                fontSize:`${tag.count}em`, //weight
                display:"inline-block",
                color: tag.color
            }}
            onClick={() => {
                if (tagProps.bagType === "related") {
                    setQueryBagTextInput(tag.value, tagProps.bagType)
                    setQueryBagWeightInput(String(tag.count), tagProps.bagType)
                }
            }}
        >
            {tag.value} 
        </span>
    )
}

export default QBTagWordDisplay;