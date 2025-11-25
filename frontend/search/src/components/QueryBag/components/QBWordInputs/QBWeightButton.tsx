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