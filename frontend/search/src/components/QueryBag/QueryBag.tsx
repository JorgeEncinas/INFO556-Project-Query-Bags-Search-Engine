import { useState } from "react"
import type { queryBagTypes } from "../../types/queryBagTypes"
import QBTitle from "./components/QBTitle"
import QBTagCloudWrapper from "./components/QBTagCloudWrapper/QBTagCloudWrapper"
import { useSearchStore } from "../../store/searchStore"
import QBWordInputs from "./components/QBWordInputs/QBWordInputs"
import QBSvgWrapper from "./components/QBSvgWrapper"



const QueryBag = ({ bagType, wordInput, weightInput } : { bagType : queryBagTypes, wordInput: string, weightInput: string}) => {

    const setQueryBagTextInput = useSearchStore((state) => state.queryBagSlice.setQueryBagTextInput)
    const setQueryBagWeightInput = useSearchStore((state) => state.queryBagSlice.setQueryBagWeightInput)

    const displayName = bagType === "must-have"
        ? "Must-Have"
        : bagType === "forbidden"
            ? "Forbidden"
            : "Related"
            
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false)
    
    //console.log(`bagtype ${bagType} === related - ${bagType === "related"}`)
    return (
        <div
            id={"query-bag-overall-container"}
            className={"h-[100%] w-[30%] mt-5 flex flex-col justify-center items-center"}
            onMouseEnter={() => setIsInputVisible(true)}
            onMouseLeave={() => {
                setQueryBagTextInput("", bagType)
                setQueryBagWeightInput("", bagType)
                setIsInputVisible(false)
            }}
        >
            <QBSvgWrapper />
            <QBWordInputs
                bagType={bagType}
                wordInput={wordInput}
                weightInput={weightInput}
                isInputVisible={isInputVisible}
                setQueryBagTextInput={setQueryBagTextInput}
                setQueryBagWeightInput={setQueryBagWeightInput}
            />
            <div className={"w-[100%] h-[100%] flex flex-col justify-end items-center border border-blue-500"}>
                <QBTagCloudWrapper bagType={bagType} />
                <QBTitle displayName={displayName} />
            </div>
            
            
        </div>
    )
}

export default QueryBag