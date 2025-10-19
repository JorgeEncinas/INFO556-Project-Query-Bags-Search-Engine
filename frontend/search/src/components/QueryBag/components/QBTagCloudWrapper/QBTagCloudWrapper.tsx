import type { queryBagTypes } from "../../../../../types/queryBagTypes"
import QBTagCloud from "./QBTagCloud"
import { queryTagSetData, queryTagComplexData } from "../../../../../data/queryTagData"

const QBTagCloudWrapper = ({ bagType } : {bagType : queryBagTypes}) => {
    return (
        <div
            id={"query-bag-cloud"}
            className={"h-[100%] w-[80%] border border-b-fuchsia-700 flex flex-wrap justify-center items-center "}
        >
            <QBTagCloud
                terms={bagType === "related" ? queryTagComplexData : queryTagSetData}
                bagType={bagType}
            />
        </div>
    )
}

export default QBTagCloudWrapper