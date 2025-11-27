/**
 * This element is a visual "plus" sign that represents an "Add" action. It is used in the button to add a new term.
 * 
 * @param props.isBeingHovered - Whether this element's parent container, and thus, this element, is being hovered on.
 * @returns {JSX.Element}
 */
const AddSvg = ({ isBeingHovered } : {
    isBeingHovered : boolean
}) => {
    return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.00738C12.4142 7.00739 12.75 7.34317 12.75 7.75739V11.25H16.25C16.6642 11.25 17 11.5858 17 12C17 12.4142 16.6642 12.75 16.25 12.75H12.75V16.2426C12.75 16.6568 12.4142 16.9926 12 16.9926C11.5857 16.9926 11.25 16.6568 11.25 16.2426V12.75H7.76476C7.35055 12.75 7.01476 12.4142 7.01476 12C7.01477 11.5857 7.35055 11.25 7.76477 11.25H11.25V7.75738C11.25 7.34317 11.5858 7.00738 12 7.00738Z"
            fill={isBeingHovered ? "#8EFFE5" : "#42FFD3"}
        />
        </svg>
    )
}

export default AddSvg;