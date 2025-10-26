import { useState } from "react"
import QBContractionTab from "./components/QBContractionTab"
import QBBagsArea from "./components/QBBagsArea"
import { useSearchStore } from "../../store/searchStore"

const QBDrawer = () => {

    const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(true)
    const displayedPage = useSearchStore((state) => state.displayedPage)

    return (
        <div
            id={"query-bags-overall-component"}
            className={`${import.meta.env.VITE_BORDERS === "ON" ? "border border-cyan-200" : "" }  ${isDrawerVisible ? "" : "max-h-[1px]"} 
                ${displayedPage === "results" ? "h-[370px]" : "h-[70%]"}
                w-[100%] mb-3 pb-4 `}
        >
            <QBContractionTab
                isDrawerVisible={isDrawerVisible}
                setIsDrawerVisible={setIsDrawerVisible}
            />
            <QBBagsArea
                isDrawerVisible={isDrawerVisible}
            />
        </div>
    )
}

export default QBDrawer