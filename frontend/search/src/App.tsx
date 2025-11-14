/**
 * @fileoverview The main "App" component. It renders the component currently displayed depending on
 * the route.
 */
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import { ToastContainer } from 'react-toastify'
import GitHubSvg from './assets/GitHubSvg'

/**
 * The main App component. Renders the page according to the current Route.
 * 
 * @returns {JSX.Element}
 */
function App() {

  // Routing done consulting https://www.robinwieruch.de/react-router/
  return (
    <>
    <a className={`absolute top-[10px] right-[20px] opacity-40 hover:opacity-80 hover:cursor-pointer 
      flex justify-center items-center p-2 rounded-2xl space-x-2
    `}
      href="https://github.com/JorgeEncinas/INFO556-Project-Query-Bags-Search-Engine"
      target="_blank"
    >
        <GitHubSvg />
        <div>Source Code</div>
    </a>
    <Routes>
      <Route index path="/" element={ <HomePage /> }/>
      <Route path="results" element={ <ResultsPage /> } />
    </Routes>
    <ToastContainer 
      position="bottom-right"
    />
    </>
  )
}

export default App
