/**
 * @fileoverview This component is the overall contraction tab of the Query Bag's Drawer. It defines the layout for showcasing
 * the arrow, the text, and the buttons, which are the summary buttons and the "Clear All" button.
 */
import DownArrowSvg from "../../../assets/DownArrowSvg";
import QBSummary from "./QBSummary/QBSummary";

/**
 * This component is the overall contraction tab of the Query Bag's Drawer. It is the highest-level component that orders
 * the rest of the components present in the drawer.
 * @param props.isDrawerVisible - Whether the drawer should be open (true) or not (false)
 * @param props.setIsDrawerVisible - Function to change the state of the drawer: open or closed (true or false)
 * @returns {JSX.Element}
 */
const QBContractionTab = ({ isDrawerVisible, setIsDrawerVisible } : {
    isDrawerVisible : boolean,
    setIsDrawerVisible : ( newValue : boolean) => void
}) => {

    return (
        <div 
            id={"query-bags-contraction-component"}
            className={`${import.meta.env.VITE_BORDERS === "ON" ? "border border-emerald-500" : "" }  flex items-center justify-start p-2`}
        >
            <div
                id={"query-bags-click-to-contract"}
                className={`
                    flex items-center justify-start p-2 cursor-pointer hover:text-gray-400 `}
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