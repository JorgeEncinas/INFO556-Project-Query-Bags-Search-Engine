import SearchBar from './components/SearchBar/SearchBar'
import QBDrawer from './components/QBDrawer/QBDrawer'
function App() {
  
  return (
    <div
      id={"main-div"}
      className={"h-[100%] w-[100%] border border-green-400 flex flex-col justify-start items-center"}
    >
      <div
        id={"search-bar-div"}
        className={"flex items-center justify-center border border-blue-400 h-[30%] w-[100%]"}
      >
        <div className={" border border-red-400 w-[100%] flex flex-col justify-center items-center"}>
          <p className={"text-3xl my-2 py-2 text-center font-bold"}>BagSearch</p>
          <SearchBar />
        </div>
      </div>
      <QBDrawer />
    </div>
  )
}

export default App
