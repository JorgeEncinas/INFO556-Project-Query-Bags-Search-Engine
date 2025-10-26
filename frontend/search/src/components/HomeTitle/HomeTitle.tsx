import { useNavigate } from "react-router";
import BurlapSvg from "../../assets/BurlapSvg"
import { useSearchStore } from "../../store/searchStore";

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