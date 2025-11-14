/**
 * @fileoverview Displays the search bar that the user will use as input field for their queries.
 * Changes size depending on the page: it is bigger on the home page, smaller on the results page.
 */
import SearchMagnifierSvg from '../../assets/SearchMagnifierSvg'
import { useSearchStore } from '../../store/searchStore'
import { DebounceInput } from 'react-debounce-input'
import useQueryBackend from './hooks/useQueryBackend'
import RightArrowSvg from '../../assets/RightArrowSvg'

/**
 * Renders the Search Bar: an input field where the user can write down their query.
 * When they press enter, the query is applied. Changes size depending on the page.
 * 
 * @returns {JSX.Element}
 */
const SearchBar = () => {
    const { displayedPage, query, setQuery } = useSearchStore((state) => state)

    const { getQueryResults, getRelatedSuggestions } = useQueryBackend()
    
    if (displayedPage === "results") {
      return (
        <div className={" bg-white h-8 flex justify-between items-center px-4 rounded-3xl my-2 w-[50%]"}>
            <div className={"flex justify-start flex-1"}>
              <SearchMagnifierSvg />
              <input
                type="text"
                placeholder="Search for something..."
                className={"border-none focus:border-none focus:outline-none text-black mx-2 w-[92%]"}
                value={query}
                onKeyDown={(e) => {
                  if(e.key == "Enter") {
                    getQueryResults()
                  }
                }}
                onChange={event => {
                  setQuery(event.target.value)
                }}
              />
              <DebounceInput 
                type="hidden"
                value={query}
                className={"hidden"}
                debounceTimeout={300}
                onChange={event => {
                  getRelatedSuggestions(event.target.value)
                }}
              />
            </div>
            <div
              className={" rounded-3xl bg-blue-700 px-3 text-white font-semibold w-[50px] hover:bg-blue-500 cursor-pointer flex justify-center items-center"}
              onClick={() => {
                getQueryResults()
              }}
            >
              <RightArrowSvg />
            </div>
        </div>
      )
    }

    return (
      <div className={"w-full flex items-center justify-center space-x-2"}>
        <div className={" bg-white h-12 flex justify-start items-center px-4 rounded-3xl my-2 w-[55%]"}>
            <SearchMagnifierSvg />
            <DebounceInput
              type="text"
              debounceTimeout={300}
              placeholder="Search for something..."
              className={"border-none focus:border-none focus:outline-none text-black mx-2 w-[80%]"}
              value={query}
              onKeyDown={(e) => {
                if(e.key == "Enter") {
                  getQueryResults()
                }
              }}
              onChange={event => {
                setQuery(event.target.value)
                getRelatedSuggestions(event.target.value)
              }}
            />
            <div
              className={" rounded-3xl bg-blue-700 px-3 text-white font-semibold py-2 w-[120px] hover:bg-blue-500 cursor-pointer flex justify-center items-center"}
              onClick={() => {
                getQueryResults()
              }}
            >
              <h3 className={" mr-2 "} >Search</h3>
              <RightArrowSvg />
            </div>
        </div>
      </div>
    )
}

export default SearchBar