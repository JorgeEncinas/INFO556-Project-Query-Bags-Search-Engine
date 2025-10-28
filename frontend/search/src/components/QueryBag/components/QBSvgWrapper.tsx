/**
 * @fileoverview A wrapper for the big, wide, hollow QueryBag SVG that is used to display the TagCloud within it.
 * This wrapper serves to adjust the SVG so that it looks appropriately sized and placed.
 */
import QueryBagSvg from "../../../assets/QueryBagSvg";

/**
 * A component that serves as a wrapper for the QueryBag SVG that forms the metaphor of a bag with a
 * TagCloud inside. Used to better control the placement of the SVG.
 * @returns {JSX.Element}
 */
const QBSvgWrapper = () => {
    return(
        <div className={`${import.meta.env.VITE_BORDERS === "ON" ? "border border-red-600" : ""} 
            relative  w-[100%]`}> {/*From https://stackoverflow.com/a/65751233 */}
            <div className={`${import.meta.env.VITE_BORDERS === "ON" ? "border border-green-50" : ""} 
            absolute w-[100%] 0 flex justify-center items-center top-[10px]`}>
                <QueryBagSvg />
            </div>
        </div>
    )
}

export default QBSvgWrapper;