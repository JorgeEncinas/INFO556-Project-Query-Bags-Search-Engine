import type { queryBagTypes } from "../../../../types/queryBagTypes"
import QBTagCloud from "./components/QBTagCloud"
import type { QueryBagSliceType } from "../../../../store/slices/queryBagSlice"
import { useSearchStore } from "../../../../store/searchStore"

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
            {/* bagType === "related" ? queryTagComplexData : queryTagSetData */}
            <QBTagCloud
                terms={dataTruth} 
                bagType={bagType}
            />
        </div>
    )
}

export default QBTagCloudWrapper