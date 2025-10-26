import QueryBagSvg from "../../../assets/QueryBagSvg";

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