/**
 * @fileoverview A component that displays the website's logo and title, changing size depending on
 * the page displayed, "home" or "results". It displays the logo, which is a burlap sack, to the left,
 * and to the right of it, the name "BagSearch".
 */
import { useNavigate } from "react-router";
import BurlapSvg from "../../assets/BurlapSvg"
import { useSearchStore } from "../../store/searchStore";

/**
 * A component that displays the title of the website alongside the logo, a burlap sack, to the left.
 * This element functions as a button that can be clicked to go back to the home page. When the user is on the
 * results page, this action clears all suggestions of words, and sets the query to an empty string.
 * Added terms to the query bags remain untouched, however.
 * @returns {JSX.Element}
 */
const HomeTitle = () => {

    const page = useSearchStore((state) => state.displayedPage)
    const { setDisplayedPage, setQuery } = useSearchStore((state) => state)
    const deleteRelatedWords = useSearchStore((state) => state.queryBagSlice.deleteRelatedWords)
    const navigate = useNavigate()

    if (page !== "home") {
      return (
        <div
            className={"flex justify-start items-center cursor-pointer"}
            onClick={() => {
              setDisplayedPage("home")
              navigate("/")
              setQuery("")
              deleteRelatedWords()
            }}
          >
          <BurlapSvg />
          <p className={"text-2xl my-2 py-2 ml-1 text-center font-bold"}>BagSearch</p>
        </div>
      )
    }

    return (
        <div
            className={"flex justify-center items-center w-[100%]"}
            onClick={() => {
              setDisplayedPage("home")
              navigate("/")
            }}
          >
          <BurlapSvg />
          <p className={"text-3xl my-2 py-2 ml-1 text-center font-bold"}>BagSearch</p>
        </div>
    )
}

export default HomeTitle;