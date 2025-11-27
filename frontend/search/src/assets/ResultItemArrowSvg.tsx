/**
 * This is an arrow within a circle, used to show that a result list item can be clicked and will take
 * the user to another page.
 * 
 * @param props.isBeingHovered - Whether the parent element (and thus this one) is being hovered.
 * @returns {JSX.Element}
 */
const ResultItemArrowSvg = ({ isBeingHovered } : {
    isBeingHovered : boolean
}) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 17V13H7V11H12V7L17 12L12 17Z" 
            fill={isBeingHovered ? "#6FB6D9" : "white"}
        />
        </svg>

    )
}

export default ResultItemArrowSvg;