import TrashCanSvg from "../../../assets/TrashCanSvg"

const QBTitle = ({ displayName, deleteFn } : { 
    displayName : "Must-Have" | "Forbidden" | "Related"
    deleteFn: () => void
}) => {
    return(
        <div
            id={"query-bag-title-and-clear-area"}
            className={"flex justify-center items-center px-1 mt-2 "}
        >
            <h2 className={"font-bold select-none"}>{displayName} words</h2>
            <button
                onClick={() => {
                    deleteFn()
                }}
                className={"m-2 p-1 bg-red-500 rounded-3xl hover:cursor-pointer hover:bg-red-400 transition-all duration-200 ease-in-out"}
            >
                <TrashCanSvg/>
            </button>
        </div>
    )
}

export default QBTitle