/**
 * @fileoverview The component that renders the Query Bags drawer, which includes two parts. The first one is
 * the drawer button with an indicator of its state, a button to change the status, a summary of each bag, and
 * buttons to clear the terms in the query bags. The second part is the area that displays the query bags.
*/
import { useState } from "react"
import QBContractionTab from "./components/QBContractionTab"
import QBBagsArea from "./components/QBBagsArea"
import { useSearchStore } from "../../store/searchStore"

/**
 * The overall component that renders the Query Bags drawer, which includes two parts:
 *  1) The Drawer Tab, which contains:
 *      1.1) An Arrow SVG that indicates this component is a drawer, as well as the current state of it (i.e. open or closed)
 *      1.2) An implicit button that says "Your Query Words", which changes color when hovered, and the cursor becomes a pointer
 *           to make clear this is a button
 *      1.3) The Summary of the query bags, which consists of three circles, each indicating how many query terms
 *           its respective query bag contains. These can be clicked to delete the query bag's terms
 *      1.4) A "Clear All" button, which deletes all terms from all query bags.
 *  2) The Query Bags area, which displays the three query bags side-by-side, with their respective terms within.
 * @returns {JSX.Element}
 */
const QBDrawer = () => {

    const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(true)
    const displayedPage = useSearchStore((state) => state.displayedPage)

    return (
        <div
            id={"query-bags-overall-component"}
            className={`${import.meta.env.VITE_BORDERS === "ON" ? "border border-cyan-200" : "" }  ${isDrawerVisible ? "" : "max-h-[1px]"} 
                ${displayedPage === "results" ? "h-[370px]" : "h-[70%]"}
                w-[100%] mb-3 pb-4 `}
        >
            <QBContractionTab
                isDrawerVisible={isDrawerVisible}
                setIsDrawerVisible={setIsDrawerVisible}
            />
            <QBBagsArea
                isDrawerVisible={isDrawerVisible}
            />
        </div>
    )
}

export default QBDrawer