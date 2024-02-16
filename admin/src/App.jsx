import { Routes, Route } from "react-router-dom"
import { LogIn } from "./pages/LogIn"
import MoviesPage from "./pages/Movies"
import AdminPage from "./pages/Admin"
import "./reset.scss"
import "./color.scss"
import Profile from "./pages/Profile"
import { AddMovies } from "./pages/AddMovies"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/movies" element={<MoviesPage/>}/>
        <Route path="/add" element={<AddMovies/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
