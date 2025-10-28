/**
 * @fileoverview This file acts as the overarching component for the TagCloud component,
 * which comes from the "react-tagcloud". It is a wrapper on top of it which helps with the
 * layout positioning of the element.
 */
import type { queryBagTypes } from "../../../../types/queryBagTypes"
import QBTagCloud from "./components/QBTagCloud"
import type { QueryBagSliceType } from "../../../../store/slices/queryBagSlice"
import { useSearchStore } from "../../../../store/searchStore"

/**
 * Wrapper for the TagCloud component that obtains the data from the Zustand store
 * and also helps position the TagCloud.
 * 
 * @param props.bagType - The query bag that this TagCloud should present.
 * @returns {JSX.Element}
 */
const QBTagCloudWrapper = ({ bagType } : {bagType : queryBagTypes}) => {

    const qbslice : QueryBagSliceType = useSearchStore((state) => state.queryBagSlice)
    const dataTruth = bagType === "must-have"
        ? qbslice.must_have_words
        : bagType === "forbidden"
            ? qbslice.forbidden_words
            : qbslice.related_words

    return (
        <div
            id={"query-bag-cloud"}
            className={`${import.meta.env.VITE_BORDERS === "ON" ? "border-b-fuchsia-700 border" : ""}
            h-[100%] w-[100%] -4 flex flex-wrap justify-center items-center z-10`}
        >
            <QBTagCloud
                terms={dataTruth} 
                bagType={bagType}
            />
        </div>
    )
}

export default QBTagCloudWrapper