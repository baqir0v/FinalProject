import { Routes, Route } from "react-router-dom"
import { LogIn } from "./pages/LogIn"
import MoviesPage from "./pages/Movies"
import AdminPage from "./pages/Admin"
import "./reset.scss"
import "./color.scss"
import Profile from "./pages/Profile"
import { AddMovies } from "./pages/AddMovies"
import Errorpage from "./pages/Error"
import Swiper from "./pages/Swiper"
import SwipePage from "./pages/SwipePage"
import ErrorPage from "./pages/Error"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/movies" element={<MoviesPage/>}/>
        <Route path="/add" element={<AddMovies/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/swiper" element={<Swiper/>}/>
        <Route path="/swipepage" element={<SwipePage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </>
  )
}

export default App
