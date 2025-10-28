/**
 * @fileoverview Component that renders the overall Query Bag element. It prepares the Query Bag SVG, the Title,
 * the input field(s), and the TagCloud.
 */
import { useState } from "react"
import type { queryBagTypes } from "../../types/queryBagTypes"
import QBTitle from "./components/QBTitle"
import QBTagCloudWrapper from "./components/QBTagCloudWrapper/QBTagCloudWrapper"
import { useSearchStore } from "../../store/searchStore"
import QBWordInputs from "./components/QBWordInputs/QBWordInputs"
import QBSvgWrapper from "./components/QBSvgWrapper"


/**
 * Component that renders the overall Query Bag element. It prepares many of the subcomponents that are
 * displayed: Word input Fields, TagCloud, Query Bag Title, and the SVG of the Query Bag.
 * 
 * @param props.bagType - The specific Query Bag this will render, whether "related", "forbidden", or "must-have"
 * @param props.wordInput - The Zustand store field that saves the value on the input field for new words
 * @param props.weightInput - The Zustand store field that saves the value on the input field for the weight of
 * new words (only applies to the "Related Words" bag)
 * @returns {JSX.Element}
 */
const QueryBag = ({ bagType, wordInput, weightInput } : { 
    bagType : queryBagTypes, 
    wordInput: string, 
    weightInput: string
}) => {

    const {
        setQueryBagTextInput,
        setQueryBagWeightInput,
        deleteConstraintWords,
        disableRelatedWordsTextInput,
        setDisableRelatedWordsTextInput
    } = useSearchStore((state) => state.queryBagSlice)

    const displayName = bagType === "must-have"
        ? "Must-Have"
        : bagType === "forbidden"
            ? "Forbidden"
            : "Related"
            
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false)

    /**
     * Calls the Zustand Store's function to delete all words of the current Query Bag.
     * If the current query bag is "Related Words", then it also cleans the Weight input. TODO
     */
    const deleteAllWordsAndCleanText = () => {
        deleteConstraintWords("all", bagType)
        setQueryBagTextInput("", bagType)
        if(bagType === "related") {
            setQueryBagWeightInput("")
        }
    }
    
    return (
        <div
            id={"query-bag-overall-container"}
            className={"h-[100%] w-[100%] mt-2 flex flex-col justify-center items-center"}
            onMouseEnter={() => setIsInputVisible(true)}
            onMouseLeave={() => {
                setQueryBagTextInput("", bagType)
                if(bagType === "related") {
                    setQueryBagWeightInput("") //, bagType
                    setDisableRelatedWordsTextInput(false)
                }
                setIsInputVisible(false)
            }}
        >
            <QBSvgWrapper />
            <QBWordInputs
                bagType={bagType}
                wordInput={wordInput}
                weightInput={weightInput}
                isInputVisible={isInputVisible}
                disabled={bagType !== "related" 
                    ? false 
                    : disableRelatedWordsTextInput
                }
                setQueryBagTextInput={setQueryBagTextInput}
                setQueryBagWeightInput={setQueryBagWeightInput}
            />
            <div className={`${import.meta.env.VITE_BORDERS === "ON" ? "border border-blue-500" : ""} 
                w-[100%] h-[100%] flex flex-col justify-end items-center
            `}>
                <QBTagCloudWrapper bagType={bagType} />
                <QBTitle
                    displayName={displayName}
                    deleteFn={deleteAllWordsAndCleanText} 
                />
            </div>
            
            
        </div>
    )
}

export default QueryBag