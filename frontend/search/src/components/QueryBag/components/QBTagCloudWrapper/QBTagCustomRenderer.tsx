import { useState } from "react"
import type { Tag } from "react-tagcloud"
import WhiteCloseSvg from "../../../../assets/WhiteCloseSvg"
import { useSearchStore } from "../../../../../store/searchStore"
import type { tagProps } from "./hooks/useTransformIntoTags"

const QBTagCustomRenderer = ({tag} : {tag : Tag}) => { //From the library example in https://madox2.github.io/react-tagcloud/

        const [isXVisible, setIsXVisible] = useState<boolean>(false)
        const deleteConstraintWords = useSearchStore((state) => state.queryBagSlice.deleteConstraintWords)
        return (
            <div
                //key={tag.key} //term
                className={"flaX flaY px-1 py-1 h-[40px] border border-red-600"}
                style={{
                    animationDelay: `${Math.random() * 2}s`
                }}
                onMouseEnter = {() => {setIsXVisible(true)}}
                onMouseLeave = {() => {setIsXVisible(false)}}
            >
                <div
                    className={"relative"}
                >
                    <button
                        onClick={() => {
                            console.log(`Delete fn called on word renderer ${tag.key} - ${typeof(tag.key)}`)
                            deleteConstraintWords(
                                new Set<string>().add(tag.value),
                                (tag.props as tagProps).bagType
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
                <span
                    className={` font-semibold border border-yellow-200 h-8 select-none hover:cursor-pointer `}
                    style={{
                        fontSize:`${tag.count}em`, //weight
                        display:"inline-block",
                        color: tag.color
                    }}
                >
                    {tag.value} 
                </span>
            </div>
        )
    
}

export default QBTagCustomRenderer;