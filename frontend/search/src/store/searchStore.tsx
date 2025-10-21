import { create } from "zustand"
import { createQueryBagSlice, type QueryBagSliceType } from "../store/slices/queryBagSlice"
//import { devtools } from "zustand/middleware"

export interface SearchStoreType {
    queryBagSlice: QueryBagSliceType;
}

// Help from documentation
// AND from https://stackoverflow.com/a/74332509
// : StateCreator<SearchStoreType, [["zustand/devtools", never]], [], SearchStoreType>
//devtools(
export const useSearchStore = create<SearchStoreType>()(
    (set, get, store) : SearchStoreType => { //Format from https://refine.dev/blog/zustand-react-state/#getting-started-with-zustand
        return {
            queryBagSlice: createQueryBagSlice(set, get, store)
        }
    }
)