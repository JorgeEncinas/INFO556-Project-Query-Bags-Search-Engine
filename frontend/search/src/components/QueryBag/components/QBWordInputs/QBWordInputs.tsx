/**
 * @fileoverview This file defines the Input Fields that go over each Query Bag. The logic
 * varies slightly for the "Related Words" bag, since it has a "weight" property that can be adjusted.
 */
import { toast } from "react-toastify"
import { useSearchStore } from "../../../../store/searchStore"
import type { queryBagTypes } from "../../../../types/queryBagTypes"
import AddSvg from "../../../../assets/AddSvg"
import { useEffect, useState } from "react"
import QBWeightButton from "./QBWeightButton"

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
    const [isAddBeingHovered, setIsAddBeingHovered] = useState<boolean>(false)
    const [weightValue, setWeightValue] = useState<"small" | "mid" | "big">("mid")

    useEffect(() => {
        let floatWeight = parseFloat(weightInput)
        if (floatWeight <= 0.6) {
            setWeightValue("small")
        } else if (floatWeight <= 0.7) {
            setWeightValue("mid")
        } else {
            setWeightValue("big") //large
        }
    }, [weightInput])
    
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
                            } else {
                                toast.warn(
                                    "The field for adding a term is blank.",
                                    {
                                        position:"bottom-right",
                                        theme:"dark"
                                    }
                                )
                            }
                        }
                    }}
                />
                <div
                    className={"ml-1 hover:cursor-pointer"}
                    onClick={() => {
                        if(wordInput.length > 0) {
                            addUpdateConstraintWords(
                                wordInput,
                                weightInput="1",
                                bagType=bagType,
                                "user"
                            )
                            setQueryBagTextInput("", bagType)
                        } else {
                            toast.warn(
                                "The field for adding a term is blank.",
                                {
                                    position:"bottom-right",
                                    theme:"dark"
                                }
                            )
                        }
                    }}
                    onMouseEnter={() => setIsAddBeingHovered(true)}
                    onMouseLeave={() => setIsAddBeingHovered(false)}
                >
                    <AddSvg isBeingHovered={isAddBeingHovered} />
                </div>
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
                            // Check that no fields are empty
                            if (wordInput === "") {
                                toast.warn(
                                    `Please fill the word field to add a term to "Related Words".`,
                                    {
                                        position:"bottom-right",
                                        theme:"dark"
                                    }
                                )
                                return
                            }
                            let newWeight = weightValue === "small"
                                ? 0.6 //small 
                                : weightValue === "mid" 
                                    ? 0.7 //mid
                                    : 0.8 //large
                            addUpdateConstraintWords(
                                wordInput,
                                weightInput=newWeight.toString(),
                                bagType=bagType,
                                "user"
                            )
                        }
                    }}
                    disabled={disabled}
                />
                <div className={" flex flex-col items-center justify-center w-[28%] bg-white h-8 rounded-r-lg"}>
                    <div className={"relative h-px"}>
                        <div className={"absolute flex items-center justify-center w-full -top-7 text-white"}>
                            <h3>Importance</h3>
                        </div>
                    </div>
                    <div className={"flex justify-center items-center space-x-1"}>
                        <QBWeightButton 
                            displayText={"small"}
                            isActive={weightValue === "small"}
                            onClickFunction={() => {setWeightValue("small")}}
                        />
                        <QBWeightButton 
                            displayText={"mid"}
                            isActive={weightValue === "mid"}
                            onClickFunction={() => {setWeightValue("mid")}}
                        />
                        <QBWeightButton 
                            displayText={"large"}
                            isActive={weightValue === "big"}
                            onClickFunction={() => {setWeightValue("big")}}
                        />
                    </div>
                </div>
                <div
                    className={"ml-1 hover:cursor-pointer"}
                    onClick={() => {
                        if (wordInput === "") {
                            toast.warn(
                                `Please fill the word field to add a term to "Related Words".`,
                                {
                                    position:"bottom-right",
                                    theme:"dark"
                                }
                            )
                            return
                        }
                        let newWeight = weightValue === "small"
                                ? 0.6 //small 
                                : weightValue === "mid" 
                                    ? 0.7 //mid
                                    : 0.8 //large
                        addUpdateConstraintWords(
                            wordInput,
                            weightInput=newWeight.toString(),
                            bagType=bagType,
                            "user"
                        )
                    }}
                    onMouseEnter={() => setIsAddBeingHovered(true)}
                    onMouseLeave={() => setIsAddBeingHovered(false)}
                >
                    <AddSvg isBeingHovered={isAddBeingHovered} />
                </div>
            </div>
        </div>
    )
}

export default QBWordInputs;