import QueryBagSvg from "../../../assets/QueryBagSvg";

const QBSvgWrapper = () => {
    return(
        <div className={"relative border border-red-600 w-[100%]"}> {/*From https://stackoverflow.com/a/65751233 */}
            <div className={"absolute w-[100%] border border-green-500 flex justify-center items-center top-[20px]"}>
                <QueryBagSvg />
            </div>
        </div>
    )
}

export default QBSvgWrapper;