import { useState } from "react"
import QBContractionTab from "./components/QBContractionTab"
import QBBagsArea from "./components/QBBagsArea"

const QBDrawer = () => {
    
    const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(true)

    return (
        <div
            id={"query-bags-overall-component"}
            className={"border border-b-cyan-200 h-[70%] w-[100%] mx-2"}
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