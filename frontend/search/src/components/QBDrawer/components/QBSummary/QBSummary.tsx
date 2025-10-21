import { useSearchStore } from "../../../../store/searchStore"
import QBSummaryButton from "./QBSummaryButton"

const QBSummary = () => {
    const related_words_count = Object.keys(useSearchStore((state) => state.queryBagSlice.related_words)).length
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
        </div>
    )
}

export default QBSummary;