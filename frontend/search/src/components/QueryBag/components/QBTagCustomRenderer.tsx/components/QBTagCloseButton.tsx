/**
 * @fileoverview This file contains a component for the Close Button on the Words displayed
 * on each Tag Cloud. The element appears when you hover the pointer over a word.
 */
import type { Tag } from "react-tagcloud"
import WhiteCloseSvg from "../../../../../assets/WhiteCloseSvg"
import { useSearchStore } from "../../../../../store/searchStore"
import type { tagProps } from "../../QBTagCloudWrapper/hooks/useTransformIntoTags"

/**
 * Renders a button with an X that serves to delete a word from a query bag when the button is clicked.
 * It is rendered inside the TagCloud, so it must handle the types that TagCloud defines, namely "Tag".
 * 
 * @param props.tag - A word, of type "Tag", which is defined by the TagCloud library.
 * @param props.tagProps - the tag's props, which contain properties beyond what's specified in the "Tag"
 * type.
 * @param props.isXVisible - Whether the element (an X) should be displayed.
 * @returns {JSX.Element}
 */
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