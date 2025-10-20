import { useState } from "react";
import type { queryBagTypes } from "../../../../types/queryBagTypes";
import TrashCanSvg from "../../../assets/TrashCanSvg";

const QBSummaryButton = ({ count, bagType } : { count : number, bagType : queryBagTypes}) => {

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
        >

            <p
                className={`${ isMouseOver ? "hidden" : ""} px-3 py-1 `}
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