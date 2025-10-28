/**
 * @fileoverview The main "App" component. It renders the component currently displayed depending on
 * the route.
 */
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'

/**
 * The main App component. Renders the page according to the current Route.
 * 
 * @returns {JSX.Element}
 */
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
