/**
 *  @fileoverview An SVG of a Magnifier Glass used to convey the idea of "Searching" in the Search Box.
 */
import { useSearchStore } from "../store/searchStore"

/**
 *  An SVG of a Magnifier Glass used in the Search Box to convey the idea of "searching" to the user.
 *  It changes size according to the page displayed, to become smaller in the "results" page.
 *  @returns {JSX.Element}
 */
const SearchMagnifierSvg = () => {

    const page = useSearchStore((state) => state.displayedPage)

    return (
        <svg
            width={page === "home" ? "24" : "20"} height={page === "home" ? "24" : "20"}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    )
}

export default SearchMagnifierSvg