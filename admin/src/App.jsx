import { Routes, Route } from "react-router-dom"
import { LogIn } from "./pages/LogIn"
import MoviesPage from "./pages/Movies"
import AdminPage from "./pages/Admin"
import "./reset.scss"
import "./color.scss"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/add" element={<MoviesPage/>}/>
      </Routes>
    </>
  )
}

export default App
