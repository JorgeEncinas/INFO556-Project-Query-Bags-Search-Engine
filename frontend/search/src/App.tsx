import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import { useSearchStore } from './store/searchStore'
function App() {

  const displayedPage = useSearchStore((state) => state.displayedPage)
  
  if(displayedPage === "results") {
    return (
      <ResultsPage />
    )
  }
  return (
    <HomePage />
  )
}

export default App
