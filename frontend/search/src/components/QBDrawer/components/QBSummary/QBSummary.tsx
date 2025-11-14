/**
 * @fileoverview A component that goes in the Query Bags Drawer's tab area.
 * It displays the three circles that illustrate how many terms are in each query bag. These buttons
 * can be clicked to delete the terms in the corresponding query bag. Lastly, a fourth button is shown to
 * delete all terms from all query bags.
 */
import { useSearchStore } from "../../../../store/searchStore"
import QBClearAllButton from "../QBClearAllButton"
import QBSummaryButton from "./QBSummaryButton"

/**
 * Displays the four buttons on the Query Bag Drawer's tab area.
 * The first three buttons display the amount of terms in their respective query bags, and delete the terms on it
 * when clicked. The fourth button displays "Clear All", and deletes all terms from all query bags when pressed.
 * @returns {JSX.Element}
 */
const QBSummary = () => {

    const related_words_count = useSearchStore((state) => state.queryBagSlice.related_words_count)
    const forbidden_words_count = useSearchStore((state) => state.queryBagSlice.forbidden_words).size
    const must_have_words_count = useSearchStore((state) => state.queryBagSlice.must_have_words).size

    const deleteConstraintWords = useSearchStore((state) => state.queryBagSlice.deleteConstraintWords)

    return (
        <div
            id={"query-bag-summary-numbers"}
            className={"px-2 flex items-center justify-start"}
        >
            <QBSummaryButton
                count={forbidden_words_count}
                bagType={"forbidden"}
                deleteFn = {
                    () => {
                        deleteConstraintWords("all", "forbidden")
                    }
                }

            />
            <QBSummaryButton
                count={must_have_words_count}
                bagType={"must-have"}
                deleteFn = {
                    () => {
                        deleteConstraintWords("all", "must-have")
                    }
                }
            />
            <QBSummaryButton
                count={related_words_count}
                bagType={"related"}
                deleteFn = {
                    () => {
                        deleteConstraintWords("all", "related")
                    }
                }
            />
            <QBClearAllButton />
        </div>
    )
}

export default QBSummary;