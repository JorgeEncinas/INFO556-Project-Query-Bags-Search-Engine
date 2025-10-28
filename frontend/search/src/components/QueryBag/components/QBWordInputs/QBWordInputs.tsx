/**
 * @fileoverview This file defines the Input Fields that go over each Query Bag. The logic
 * varies slightly for the "Related Words" bag, since it has a "weight" property that can be adjusted.
 */
import { useSearchStore } from "../../../../store/searchStore"
import type { queryBagTypes } from "../../../../types/queryBagTypes"

/**
 * This component renders an Input Field over the Query Bag that it is contained within.
 * The Input Field is different for the "Related Words" query bag, where we must include a field for the Weight property.
 * 
 * @param props.bagType - The type of Query Bag that this input field is contained within. Used to
 * know where to direct new terms that are added to this field, and to know if we should render the "weight" input.
 * @param props.wordInput - The Zustand Store saves a variable that contains the current string the user has written 
 * into the input field. It is this property; there is one per each Query Bag.
 * @param props.weightInput - The Zustand Store saves a variable that contains the current string the user has written
 * into the weight field (in the case of the "Related Words" query bag). It is this property.
 * @param props.isInputVisible - Whether the input field should be visible. Changes to "true" when the cursor is over the
 * query bag.
 * @param props.setQueryBagTextInput - Callback to modify the current Query Bag's text input. Comes from the Zustand Store.
 * @param props.setQueryBagWeightInput - Callback to modify the current Query Bag's weight input, meant to be used
 * exclusively in the "Related Words" query bag. Comes from the Zustand Store.
 * @returns {JSX.Element}
 */
const QBWordInputs = ({ bagType, wordInput, weightInput, isInputVisible, disabled, setQueryBagTextInput, setQueryBagWeightInput} : {
    bagType: queryBagTypes,
    wordInput : string,
    weightInput : string,
    isInputVisible : boolean,
    disabled: boolean,
    setQueryBagTextInput: (text : string, bagType : queryBagTypes) => void,
    setQueryBagWeightInput: (text : string, bagType : queryBagTypes) => void,
}) => {

    const addUpdateConstraintWords = useSearchStore((state) => state.queryBagSlice.addUpdateConstraintWords)
    
    if(bagType !== "related") {
        return(
           <div className={`${import.meta.env.VITE_BORDERS === "ON" ? "border-blue-950 border" : ""} relative w-[100%]`}>
            <div
                className={`${isInputVisible ? "" : "hidden"} 
                ${import.meta.env.VITE_BORDERS === "ON" ? "border border-amber-300" : ""}
                top-[20px] absolute flex justify-center items-center w-[100%] z-[11] py-1 h-7`}
            >
                <input
                    type="text"
                    className={` w-[60%] bg-white p-1 outline-none rounded-lg text-black`}
                    placeholder="Add a word..."
                    onChange={(e) => {
                        setQueryBagTextInput(e.target.value, bagType)
                    }}
                    value={wordInput}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            if(wordInput.length > 0) {
                                addUpdateConstraintWords(
                                    wordInput,
                                    weightInput="1",
                                    bagType=bagType,
                                    "user"
                                )
                                setQueryBagTextInput("", bagType)
                            }
                        }
                    }}
                />
            </div>
        </div> 
        )
    }

    return (
        <div className={`
            ${import.meta.env.VITE_BORDERS === "ON" ? "border-blue-950 border" : ""} 
            relative w-[100%]`}>
            <div
                className={`${isInputVisible ? "" : "hidden"}
                ${import.meta.env.VITE_BORDERS === "ON" ? "border border-amber-300" : ""}
                top-[20px] absolute flex justify-center items-center w-[100%]  z-[11] py-1 h-7`}
            >
                <input
                    type="text"
                    className={`${disabled ? "text-gray-500" : "text-black"} 
                        border-r-gray-400 border w-[40%] bg-white text-black p-1 outline-none rounded-l-lg`}
                    placeholder="Add a word..."
                    onChange={(e) => {
                        setQueryBagTextInput(e.target.value, bagType)
                    }}
                    value={wordInput}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            addUpdateConstraintWords(
                                wordInput,
                                weightInput=weightInput,
                                bagType=bagType,
                                "user"
                            )
                        }
                    }}
                    disabled={disabled}
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
                            addUpdateConstraintWords(
                                wordInput,
                                weightInput=weightInput,
                                bagType=bagType,
                                "user"
                            )
                        }
                    }}
                    value={weightInput}
                />
            </div>
        </div>
    )
}

export default QBWordInputs;