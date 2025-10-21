import HomeTitle from "../components/HomeTitle/HomeTitle";
import QBDrawer from "../components/QBDrawer/QBDrawer";
import SearchBar from "../components/SearchBar/SearchBar";

const ResultsPage = () => {
    return (
        <div
            id={"main-div"}
            className={"h-[100%] w-[100%] border border-green-400 flex flex-col justify-start items-center overflow-y-scroll"}
        >
            <div
                id={"search-bar-area"}
            >
                <div
                    id={"search-bar-with-logo"}
                    className={"flex justify-start items-center"}
                >
                    <HomeTitle />
                    <SearchBar />
                </div>
                
            </div>
            <div
                    id={"results-query-bags-area"}
                    className={"h-[800px]"}
            >
                <QBDrawer />
            </div>
            <div
                id={"results-area"}
                className={" h-auto "}
            >

            </div>
        </div>
    )
}

export default ResultsPage;