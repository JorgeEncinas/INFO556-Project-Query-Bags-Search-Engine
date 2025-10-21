import DownArrowSvg from "../../../assets/DownArrowSvg";
import QBSummary from "./QBSummary/QBSummary";

const QBContractionTab = ({ isDrawerVisible, setIsDrawerVisible } : {
    isDrawerVisible : boolean,
    setIsDrawerVisible : ( newValue : boolean) => void
}) => {
    return (
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
                <h1 className={"font-bold text-lg px-2 select-none"}>Your Query Bags</h1>
            </div>
            <QBSummary />
        </div>

    )
}

export default QBContractionTab;