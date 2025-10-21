import type { queryBagTypes } from "../../../../types/queryBagTypes"

const QBWordInputs = ({ bagType, wordInput, weightInput, isInputVisible, setQueryBagTextInput, setQueryBagWeightInput} : {
    bagType: queryBagTypes,
    wordInput : string,
    weightInput : string,
    isInputVisible : boolean,
    setQueryBagTextInput: (text : string, bagType : queryBagTypes) => void,
    setQueryBagWeightInput: (text : string, bagType : queryBagTypes) => void,
}) => {
    if(bagType !== "related") {
        return(
           <div className={"relative border-blue-950 border w-[100%]"}>
            <div
                className={`${isInputVisible ? "" : "hidden"} top-[35px] absolute flex justify-center items-center w-[100%] border border-amber-300 z-[11] shadow-lg  py-1 h-7`}
            >
                <input
                    type="text"
                    className={`w-[60%] bg-white text-black p-1 outline-none rounded-lg`}
                    placeholder="Add a word..."
                    onChange={(e) => {
                        setQueryBagTextInput(e.target.value, bagType)
                    }}
                    value={wordInput}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            console.log("Enter pressed!")
                        }
                    }}
                />
            </div>
        </div> 
        )
    }

    return (
        <div className={"relative border-blue-950 border w-[100%]"}>
            <div
                className={`${isInputVisible ? "" : "hidden"} top-[35px] absolute flex justify-center items-center w-[100%] border border-amber-300 z-[11] shadow-lg  py-1 h-7`}
            >
                <input
                    type="text"
                    className={`w-[40%] bg-white text-black p-1 border-r-gray-400 border outline-none rounded-l-lg`}
                    placeholder="Add a word..."
                    onChange={(e) => {
                        setQueryBagTextInput(e.target.value, bagType)
                    }}
                    value={wordInput}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            console.log("Enter pressed!")
                        }
                    }}
                />
                <input
                    type="text"
                    className={`bg-white rounded-r-lg text-black w-[25%] outline-none p-1 border border-l-gray-400`}
                    placeholder="weight"
                    pattern={"[0-9]+"}
                    onChange={(e) => {
                        setQueryBagWeightInput(e.target.value, bagType)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            console.log("Enter pressed!")
                        }
                    }}
                    value={weightInput}
                />
            </div>
        </div>
    )
}

export default QBWordInputs;