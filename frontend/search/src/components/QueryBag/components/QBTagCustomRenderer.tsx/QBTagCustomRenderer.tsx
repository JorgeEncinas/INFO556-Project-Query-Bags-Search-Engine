/**
 * @fileoverview This file contains a component for rendering each word in a Tag Cloud,
 * used in overriding the rendering function that the "react-tagcloud" library uses.
 * This component defines the various components that come together to render the word and
 * gives them the desired layout.
 */
import { useState } from "react"
import type { Tag } from "react-tagcloud"
import type { tagProps } from "../QBTagCloudWrapper/hooks/useTransformIntoTags"
import QBTagCloseButton from "./components/QBTagCloseButton"
import QBTagWordDisplay from "./components/QBTagWordDisplay"

/**
 * Component that defines the layout of elements that come together to render a single word in a TagCloud.
 * It includes the "Close" button on a word, and the display of the word.
 * 
 * @param props.tag
 * @returns {JSX.Element}
 */
const QBTagCustomRenderer = ({tag} : {tag : Tag}) => { //From the library example in https://madox2.github.io/react-tagcloud/

        const [isXVisible, setIsXVisible] = useState<boolean>(false)
        let tagProps = tag.props as tagProps
        
        return (
            <div
                className={` ${import.meta.env.VITE_BORDERS === "ON" ? "border border-red-600" : ""} 
                    flaX flaY px-1 py-1 h-[35px] `}
                style={{
                    animationDelay: `${Math.random() * 2}s`
                }}
                onMouseEnter = {() => {setIsXVisible(true)}}
                onMouseLeave = {() => {setIsXVisible(false)}}
            >
                <QBTagCloseButton
                    tag={tag}
                    tagProps={tagProps}
                    isXVisible={isXVisible}
                />
                <QBTagWordDisplay
                    tag={tag}
                    tagProps={tagProps}
                />
            </div>
        )
    
}

export default QBTagCustomRenderer;