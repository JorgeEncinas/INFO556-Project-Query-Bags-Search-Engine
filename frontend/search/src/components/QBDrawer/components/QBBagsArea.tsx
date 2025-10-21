import { useSearchStore } from "../../../store/searchStore";
import QueryBag from "../../QueryBag/QueryBag";

const QBBagsArea = ({ isDrawerVisible } : {
    isDrawerVisible : boolean
}) => {

    const { 
        related_words_text_input,
        related_words_weight_input,
        must_have_words_text_input,
        must_have_words_weight_input,
        forbidden_words_text_input,
        forbidden_words_weight_input
    } = useSearchStore((state) => state.queryBagSlice)

    return (
        <div
                id={"query-bags-drawer-component"}
                className={` ${isDrawerVisible ? "h-0" : "h-[85%]"} border border-amber-600 transition-all overflow-hidden duration-300 ease-in-out`}
            >
                <div
                    id={"query-bags-inner-holder"}
                    className={"flex justify-evenly h-[85%]"}
                >
                    <QueryBag
                        bagType="forbidden"
                        wordInput={forbidden_words_text_input}
                        weightInput={forbidden_words_weight_input}
                    />
                    <QueryBag
                        bagType="must-have"
                        wordInput={must_have_words_text_input}
                        weightInput={must_have_words_weight_input}
                    />
                    <QueryBag
                        bagType="related"
                        wordInput={related_words_text_input}
                        weightInput={related_words_weight_input}
                    />
                </div>
            </div>
    )
}

export default QBBagsArea;