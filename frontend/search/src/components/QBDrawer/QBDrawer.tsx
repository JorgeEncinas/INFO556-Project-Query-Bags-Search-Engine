import { useState } from "react"
import QueryBag from "../QueryBag/QueryBag"
import DownArrowSvg from "../../assets/DownArrowSvg"
import QBSummary from "./components/QBSummary"

const QBDrawer = () => {
    const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(true)


    return (
        <div
            id={"query-bags-overall-component"}
            className={"border border-b-cyan-200 h-[70%] w-[100%] mx-2"}
        >
            <div 
                id={"query-bags-contraction-component"}
                className={"border border-b-emerald-500 flex items-center justify-start p-2"}
            >
                <div
                    id={"query-bags-click-to-contract"}
                    className={" flex items-center justify-start p-2 cursor-pointer hover:text-gray-400"}
                    onClick={() => {
                        setIsDrawerVisible(!isDrawerVisible)
                    }}
                >
                    <DownArrowSvg
                        shouldPointDown={!isDrawerVisible}
                    />
                    <h1 className={"font-bold text-lg px-2"}>Your Query Bags</h1>
                </div>
                <QBSummary />
            </div>
            <div
                id={"query-bags-drawer-component"}
                className={` ${isDrawerVisible ? "h-0" : "h-[85%]"} border border-amber-600 transition-all overflow-hidden duration-300 ease-in-out`}
            >
                <div
                    id={"query-bags-inner-holder"}
                    className={"flex justify-evenly h-[85%]"}
                >
                    <QueryBag bagType="forbidden" />
                    <QueryBag bagType="must-have" />
                    <QueryBag bagType="related" />
                </div>
            </div>
        </div>
    )
}

export default QBDrawer