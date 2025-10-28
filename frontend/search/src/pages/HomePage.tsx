/**
 * @fileoverview This file defines the "Home" page and its layout. It includes the logo, the title of the page,
 * the search bar, and the Query Bags drawer with all of its included components.
 */
import HomeTitle from "../components/HomeTitle/HomeTitle";
import QBDrawer from "../components/QBDrawer/QBDrawer";
import SearchBar from "../components/SearchBar/SearchBar";

/**
 * Component that defines the layout of the Home Page.
 * 
 * @returns {JSX.Element}
 */
const HomePage = () => {
    return (
        <div
            id={"main-div"}
            className={`
                ${import.meta.env.VITE_BORDERS === "ON" ? "border border-green-400" : ""}
                h-[100%] w-[100%]  flex flex-col justify-start items-center`}
        >
            <div
                id={"search-bar-div"}
                className={`
                    ${import.meta.env.VITE_BORDERS === "ON" ? "border border-blue-400" : ""}
                    flex items-center justify-center  h-[30%] w-[100%]`}
            >
                <div className={`
                    ${import.meta.env.VITE_BORDERS === "ON" ? "border border-red-400" : ""}
                    w-[100%] flex flex-col justify-center items-center `}>
                <HomeTitle />
                <SearchBar />
                </div>
            </div>
            <QBDrawer />
        </div>
    )
}

export default HomePage;