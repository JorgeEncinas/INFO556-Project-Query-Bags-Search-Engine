/**
 * @fileoverview Displays the search bar that the user will use as input field for their queries.
 * Changes size depending on the page: it is bigger on the home page, smaller on the results page.
 */
import SearchMagnifierSvg from '../../assets/SearchMagnifierSvg'
import { useSearchStore } from '../../store/searchStore'
import { DebounceInput } from 'react-debounce-input'
import useQueryBackend from './hooks/useQueryBackend'

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
        <div className={" bg-white h-8 flex justify-start items-center px-4 rounded-3xl my-2 w-[50%]"}>
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
          </div>
      )
    }

    return (
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
          </div>
    )
}

export default SearchBar