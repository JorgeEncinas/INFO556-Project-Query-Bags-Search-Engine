import BurlapSvg from "../../assets/BurlapSvg"

const HomeTitle = () => {

    return (
        <div
            className={"flex justify-center items-center w-[100%]"}
          >
            <BurlapSvg />
            <p className={"text-3xl my-2 py-2 ml-1 text-center font-bold"}>BagSearch</p>
          </div>
    )
}

export default HomeTitle;