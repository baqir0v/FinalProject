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
import Video from "./pages/Video"
import PaymentPage from "./pages/Payment"
import Kids from "./pages/Kids"
import Playlist from "./pages/Playlist"
import CategoriesPage from "./pages/Categories"
import StripePage from "./pages/Stripe"
import ErrorPage from "./pages/Error"
import AboutPage from "./pages/About"

function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/movies" element={<MoviesPage/>} />
        <Route path="/detail/:id" element={<Details/>} />
        <Route path="/video/:id" element={<Video/>} />
        <Route path="/payment" element={<StripePage/>} />
        <Route path="/kids" element={<Kids/>} />
        <Route path="/playlist" element={<Playlist/>} />
        <Route path="/categories/:id" element={<CategoriesPage/>} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/about" element={<AboutPage/>} />
      </Routes>
    </>
  )
}

export default App
