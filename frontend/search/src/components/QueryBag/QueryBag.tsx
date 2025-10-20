import { useState } from "react"
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
            
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false)
    const [wordInput, setWordInput] = useState<string>("")
    const [weightInput, setWeightInput] = useState<number | "">("")
    
    //console.log(`bagtype ${bagType} === related - ${bagType === "related"}`)
    return (
        <div
            id={"query-bag-overall-container"}
            className={"h-[100%] w-[30%] mt-5 flex flex-col justify-center items-center"}
            onMouseEnter={() => setIsInputVisible(true)}
            onMouseLeave={() => setIsInputVisible(false)}
        >
            <div className={"relative border border-red-600 w-[100%]"}> {/*From https://stackoverflow.com/a/65751233 */}
                <div className={"absolute w-[100%] border border-green-500 flex justify-center items-center top-[20px]"}>
                    <QueryBagSvg />
                </div>
            </div>
            <div className={"relative border-blue-950 border w-[100%]"}>
                <div
                    className={`${isInputVisible ? "" : "hidden"} top-[35px] absolute flex justify-center items-center w-[100%] border border-amber-300 z-[11] shadow-lg  py-1 h-7`}
                >
                    <input
                        type="text"
                        className={`w-[40%] bg-white text-black p-1 border-r-gray-400 border outline-none rounded-l-lg`}
                        placeholder="Add a word..."
                        onChange={(e) => {
                            setWordInput(e.target.value)
                        }}
                        value={wordInput}
                    />
                    <input
                        type="text"
                        className={`bg-white rounded-r-lg text-black w-[25%] outline-none p-1 border border-l-gray-400`}
                        placeholder="weight"
                        pattern={"[0-9]+"}
                        onChange={(e) => {
                            let integer = Number(e.target.value) // From https://stackoverflow.com/a/28194039
                            if(!isNaN(integer)) {
                                setWeightInput(integer)
                            }
                        }}
                        value={weightInput}
                    />
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