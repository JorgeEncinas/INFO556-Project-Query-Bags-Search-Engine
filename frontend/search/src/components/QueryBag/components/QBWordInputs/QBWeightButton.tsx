/** 
 * This component renders a button that is small, for selecting a specific weight for the user.
 * It was narrowed down to "small", "medium", and "large" to lessen the burden placed on users about weight contribution on each term
 * 
 * @param props.displayText - The text to show on this button
 * @param props.isActive - whether this button is the one currently selected
 * @param props.onClickFunction - The function that should run when this button is pressed (selects this option)
 * @returns {JSX.Element}
 */
const QBWeightButton = ({ displayText, isActive, onClickFunction } : {
    displayText : string,
    isActive : boolean,
    onClickFunction : () => void
}) => {
    return (
        <button
            onClick={() => onClickFunction()}
            className={`rounded-3xl p-1 text-sm hover:cursor-pointer transition-all duration-300 ease-in-out
            ${isActive 
                ? "bg-cyan-400 text-blue-800 hover:text-blue-500 hover:bg-cyan-300" 
                : "bg-none text-gray-600 hover:text-gray-400"
            }`}>
            {displayText}
        </button>
    )
}

export default QBWeightButton;