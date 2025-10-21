import type { Tag } from "react-tagcloud"
import WhiteCloseSvg from "../../../../assets/WhiteCloseSvg"
import { useSearchStore } from "../../../../store/searchStore"
import type { tagProps } from "../QBTagCloudWrapper/hooks/useTransformIntoTags"

const QBTagCloseButton = ({ tag, tagProps, isXVisible } : {
    tag : Tag,
    tagProps : tagProps
    isXVisible : boolean
}) => {

    const deleteConstraintWords = useSearchStore((state) => state.queryBagSlice.deleteConstraintWords)
    return (
        <div
            className={"relative"}
        >
            <button
                onClick={() => {
                    console.log(`Delete fn called on word renderer ${tag.key} - ${typeof(tag.key)}`)
                    deleteConstraintWords(
                        new Set<string>().add(tag.value),
                        tagProps.bagType
                    )
                }}
                className={`${isXVisible ? "" : "hidden"} 
                    rounded-3xl bg-gray-400 p-1 hover:bg-gray-300 
                    transition-all ease-in-out duration-300 hover:cursor-pointer
                    absolute right-[-5px] top-[-10px] select-none
                `}
            >
                <WhiteCloseSvg />
            </button>
        </div>
    )
}

export default QBTagCloseButton;