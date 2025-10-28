/**
 * @fileoverview Component that renders the title that goes below each of the Query Bags,
 * as well as the button next to it that clears the terms in the query bag.
 */
import TrashCanSvg from "../../../assets/TrashCanSvg"

/**
 * Renders the title that defines each Query Bag, as well as a button right next to it
 * that deletes the items on the query bag when it is clicked.
 * 
 * @param props.displayName - the text that should be displayed for this query bag, defined to be either of
 * the three allowed titles: "Must-Have", "Forbidden", or "Related".
 * @param props.deleteFn - Callback that deletes all words in the current query bag.
 * @returns {JSX.Element}
 */
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