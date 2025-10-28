/**
 * @fileoverview Component to render each of the results retrieved by the Search Engine.
 */

/**
 * Component that renders one of the retrieved results from the backend when doing a query.
 * It is a simple display of title, body, and url.
 * 
 * @param props.title - The title of the article
 * @param props.body - The body of the article
 * @param props.url - The URL of the article
 * @returns {JSX.Element}
 */
const ResultItem = ({ title, body, url } : {
    title : string,
    body: string,
    url : string
}) => {
    return (
        <div
            className={` 
                ${import.meta.env.VITE_BORDERS === "ON" ? "border border-b-emerald-500" : ""}
                flex flex-col justify-center items-start px-2 py-4 w-[70%]`}
        >   
            <h3
                className={" p-2 font-semibold text-[18px] text-wrap"}
            >
                {title}
            </h3>
            <div
                className={"flex justify-start items-center w-[100%]"}
            >
                <div className={" h-[1px] border border-[#9c9c9c] w-[100%]"}></div>
            </div>
            <div
                className={" flex flex-col items-start justify-center pl-2"}
            >
                <p className={"text-wrap text-[14px] w-[100%] text-justify py-1"}>
                    {body.substring(0,200)}
                </p>
                <p
                    className={"text-[11px] text-blue-300 cursor-pointer"}
                >
                    <a href={url} target="_blank">{url}</a>
                </p>
            </div>
        </div>
    )
}

export default ResultItem;