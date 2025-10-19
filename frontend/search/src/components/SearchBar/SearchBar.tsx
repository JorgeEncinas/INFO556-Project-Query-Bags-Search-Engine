import { useState } from 'react'
import SearchMagnifierSvg from '../../assets/SearchMagnifierSvg'

const SearchBar = () => {
    const [searchText, setSearchText] = useState<string>("") // Used https://www.joshwcomeau.com/react/data-binding/ as reminder
    

    return (
        <div className={" bg-white h-12 flex justify-start items-center px-4 rounded-3xl my-2 w-[65%]"}>
            <SearchMagnifierSvg />
            <input
              type="text"
              placeholder="Search for something..."
              className={"border-none focus:border-none focus:outline-none text-black mx-2 w-[80%]"}
              value={searchText}
              onKeyDown={(e) => {
                if(e.key == "Enter") {
                  console.log("Enter pressed!")
                }
              }}
              onChange={event => {
                setSearchText(event.target.value)
              }}
            />
          </div>
    )
}

export default SearchBar