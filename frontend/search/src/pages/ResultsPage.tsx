/**
 * @fileoverview This component specifies the Results page, where the results from a search are displayed.
 * It contains the logo and title, smaller and next to the search bar, which has also been reduced in size.
 * The Query Bags drawer is included, diminished in size. Below these elements, the results are displayed as
 * a scrollable list.
 */
import HomeTitle from "../components/HomeTitle/HomeTitle";
import QBDrawer from "../components/QBDrawer/QBDrawer";
import ResultsList from "../components/ResultsList/ResultsList";
import SearchBar from "../components/SearchBar/SearchBar";

/**
 * Component that defines the layout of the Results page, where all results from a search
 * are displayed.
 * 
 * @returns {JSX.Element}
 */
const ResultsPage = () => {

    return (
        <div
            id={"main-div"}
            className={`
                ${import.meta.env.VITE_BORDERS === "ON" ? " border border-green-400" : ""}
                h-[100%] w-[100%] m-0 flex flex-col justify-start items-center overflow-y-scroll`}
        >
            <div
                id={"search-bar-area"}
                className={"flex justify-start items-center w-[100%] px-2 ml-2 py-1"}
            >
                <HomeTitle />
                <div
                    className={"ml-3 mt-1 w-[100%]"}
                >
                    <SearchBar />
                </div>
            </div>
            <div
                    id={"results-query-bags-area"}
                    className={" h-auto w-[100%] mb-4"}
            >
                <QBDrawer />
            </div>
            <div
                id={"results-area"}
                className={`${import.meta.env.VITE_BORDERS === "ON" ? "border border-blue-800" : ""} w-[100%] `}
            >
                <ResultsList />
            </div>
        </div>
    )
}

export default ResultsPage;