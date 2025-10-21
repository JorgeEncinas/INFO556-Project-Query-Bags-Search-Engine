import TrashCanSvg from "../../../assets/TrashCanSvg"

const QBTitle = ({ displayName } : { displayName : "Must-Have" | "Forbidden" | "Related"}) => {
    return(
        <div
            id={"query-bag-title-and-clear-area"}
            className={"flex justify-center items-center p-1"}
        >
            <h2 className={"font-bold select-none"}>{displayName} words</h2>
            <button
                onClick={() => {console.log("Deleting!")}}
                className={"m-2 p-1 bg-red-500 rounded-3xl hover:cursor-pointer hover:bg-red-400 transition-all duration-200 ease-in-out"}
            >
                <TrashCanSvg/>
            </button>
        </div>
    )
}

export default QBTitle