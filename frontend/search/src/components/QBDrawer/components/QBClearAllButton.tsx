/**
 * @fileoverview Button displayed in the Query Bags Drawer's Tab, with the text "Clear All". It deletes all terms
 * from all query bags when clicked.
 */
import TrashCanSvg from "../../../assets/TrashCanSvg"
import { useSearchStore } from "../../../store/searchStore"

/**
 * A button that displays the text "Clear All", and calls a function to delete all terms from all query bags
 * when clicked.
 * @returns {JSX.Element}
 */
const QBClearAllButton = () => {

    const deleteAllConstraintWords = useSearchStore((state) => state.queryBagSlice.deleteAllConstraintWords)

    return (
        <button
            className={` mx-2 font-bold 
                hover:cursor-pointer rounded-3xl bg-red-400 hover:bg-red-300 `}
            onClick={() => deleteAllConstraintWords()}
        >
            <div
                className={`py-2 px-3 flex justify-start items-center`}
            >
                <TrashCanSvg />
                <h4 className={"ml-1 text-[14px]"}>Clear All</h4>
            </div>
        </button>
    )
}

export default QBClearAllButton;