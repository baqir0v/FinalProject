import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AdminPage from "./pages/Admin"
import { SignUp } from "./pages/SignUp"
import { LogIn } from "./pages/LogIn"
import Profile from "./pages/Profile"
import "./Scss/reset.scss"
import ContactPage from "./pages/Contact"
import { AddMovies } from "./pages/AddMovies"
import Details from "./pages/Details"
import MoviesPage from "./pages/Movies"

function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/addmovie" element={<AddMovies/>} />
        <Route path="/movies" element={<MoviesPage/>} />
        <Route path="/detail/:id" element={<Details/>} />
      </Routes>
    </>
  )
}

export default App
