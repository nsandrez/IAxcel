import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PaginaComparacionArchivos from "./pages/PaginaComparacionArchivos"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaComparacionArchivos />} />
      </Routes>
    </Router>
  )
}

export default App
