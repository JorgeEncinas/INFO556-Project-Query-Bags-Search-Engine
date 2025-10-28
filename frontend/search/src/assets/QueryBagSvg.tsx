/**
 * @fileoverview An SVG of a big, wide bag used to display the metaphor of the Query Bags
 */
import { useSearchStore } from "../store/searchStore"

/**
 *  An SVG rendering a big, wide bag that is hollow inside, used to display the metaphor
 *  of the Query Bags. It changes size according to the displayed page, becoming smaller
 *  for the "results" page.
 * 
 *  @returns {JSX.Element}
 */
const QueryBagSvg = () => {

    const page = useSearchStore((state) => state.displayedPage)

    return(
        <svg
            className={`flex justify-center items-center
                ${import.meta.env.VITE_BORDERS === "ON" ? "border border-amber-200" : ""}`}
            width={page === "results" ? "250" : "350"}
            height={page === "results" ? "210" : "230"}
            viewBox="0 0 220 185" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.9698 168.264C25.3153 182.298 52.0148 182.298 105.413 182.298H114.037C167.436 182.298 194.137 182.298 208.482 168.264M10.9698 168.264C-3.37564 154.232 1.54474 132.927 11.3855 90.3179C18.3838 60.0165 21.883 44.8658 35.1674 35.915M208.482 168.264C222.827 154.232 217.906 132.927 208.066 90.3179C201.068 60.0165 197.569 44.8658 184.284 35.915M184.284 35.915C171 26.9643 152.012 26.9643 114.037 26.9643H105.413C67.4391 26.9643 48.4519 26.9643 35.1674 35.915"
                stroke="#969696" strokeWidth="4"/>
            <path d="M85.8074 26.9643V20.7232C85.8074 10.3827 96.2599 2 109.155 2C122.049 2 132.502 10.3827 132.502 20.7232V26.9643"
                stroke="#969696" strokeWidth="4" strokeLinecap="round"
            />
        </svg>    
    )
}

export default QueryBagSvg