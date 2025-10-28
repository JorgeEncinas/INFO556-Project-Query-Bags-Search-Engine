/**
 * @fileoverview A button to display the number of terms in one query bag, and delete said terms
 * when the button is clicked on.
 */
import { useState } from "react";
import type { queryBagTypes } from "../../../../types/queryBagTypes";
import TrashCanSvg from "../../../../assets/TrashCanSvg";

/**
 * A component that renders a single button to display the number of terms in one query bag.
 * If clicked, it deletes the terms in said query bag.
 * 
 * @param props.count - The amount of terms in the Query Bag
 * @param props.bagType - A string that defines the category of this bag: "forbidden", "related", or "must-have"
 * @param props.deleteFn - A callback to delete the terms in this bag.
 * @returns {JSX.Element}
 */
const QBSummaryButton = ({ count, bagType, deleteFn } : { 
    count : number,
    bagType : queryBagTypes,
    deleteFn : () => void
}) => {

    const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

    return (
        <button
            onMouseEnter={() => { setIsMouseOver(true)}}
            onMouseLeave={() => { setIsMouseOver(false)}}
            className={` mx-2 font-bold hover:cursor-pointer rounded-[50%]
                ${ bagType === "related"
                    ? " bg-cyan-500 hover:bg-cyan-300 "
                    : bagType === "forbidden"
                        ? " bg-red-500 hover:bg-red-400 "
                        : " bg-green-500 hover:bg-green-400 "
                }    
            `}
            onClick={() => deleteFn()}
        >
            <p
                className={`${ isMouseOver ? "hidden" : ""} px-3 py-1 select-none`}
            >
                {count}
            </p>
            <div
                className={`${ isMouseOver ? "" : "hidden"} p-2 `}
            >
                <TrashCanSvg />
            </div>
        </button>
    )
}

export default QBSummaryButton;