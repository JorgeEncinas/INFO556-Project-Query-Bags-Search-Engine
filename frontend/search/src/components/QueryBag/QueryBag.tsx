import { useSearchStore } from "../../../store/searchStore"
import type { QueryBagSliceType } from "../../../store/slices/queryBagSlice"
import type { queryBagTypes, relatedWordsBag } from "../../../types/queryBagTypes"
import QueryBagSvg from "../../assets/QueryBagSvg"
import QBTitle from "./components/QBCloudAndTitle"
import QBTagCloudWrapper from "./components/QBTagCloudWrapper/QBTagCloudWrapper"

const QueryBag = ({ bagType } : { bagType : queryBagTypes}) => {

    const displayName = bagType === "must-have"
        ? "Must-Have"
        : bagType === "forbidden"
            ? "Forbidden"
            : "Related"
    const qbslice : QueryBagSliceType = useSearchStore((state) => state.queryBagSlice)
    const dataTruth = bagType === "must-have"
        ? qbslice.must_have_words
        : bagType === "forbidden"
            ? qbslice.forbidden_words
            : qbslice.related_words
    
    //console.log(`bagtype ${bagType} === related - ${bagType === "related"}`)
    return (
        <div
            id={"query-bag-overall-container"}
            className={"h-[100%] w-[30%] mt-5 flex flex-col justify-center items-center"}
        >
            <div className={"relative border border-red-600 w-[100%]"}> {/*From https://stackoverflow.com/a/65751233 */}
                <div className={"absolute w-[100%] border border-green-500 flex justify-center items-center top-[20px]"}>
                    <QueryBagSvg />
                </div>
            </div>
            <div className={"w-[100%] h-[100%] flex flex-col justify-end items-center border border-blue-500"}>
                <QBTagCloudWrapper bagType={bagType} />
                
                <QBTitle displayName={displayName} />
            </div>
            
            
        </div>
    )
}

export default QueryBag