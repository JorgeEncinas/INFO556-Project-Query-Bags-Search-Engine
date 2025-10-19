import { useState } from "react"
import type { Tag } from "react-tagcloud"
import WhiteCloseSvg from "../../../../assets/WhiteCloseSvg"

const QBTagCustomRenderer = ({tag} : {tag : Tag}) => { //From the library example in https://madox2.github.io/react-tagcloud/

        const [isXVisible, setIsXVisible] = useState<boolean>(false)

        return (
            <div
                className={"flaX flaY px-1 py-1 border border-red-600"}
                onMouseEnter = {() => {setIsXVisible(true)}}
                onMouseLeave = {() => {setIsXVisible(false)}}
            >
                <div
                    className={"relative"}
                >
                    <button
                        onClick={() => {console.log("delete this item!")}}
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
                    key={tag.key} //term
                    className={` font-semibold border border-yellow-200 h-8 select-none`}
                    style={{
                        animationDelay: `${Math.random() * 2}s`,
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