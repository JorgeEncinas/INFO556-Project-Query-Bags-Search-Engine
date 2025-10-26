import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'

function App() {

  // Routing done consulting https://www.robinwieruch.de/react-router/
  return (
    <Routes>
      <Route index path="/" element={ <HomePage /> }/>
      <Route path="results" element={ <ResultsPage /> } />
    </Routes>
  )
}

export default App
