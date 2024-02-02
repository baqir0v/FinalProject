import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AdminPage from "./pages/Admin"
import Navbar from "./layout/Navbar"
import { SignUp } from "./pages/SignUp"
import { LogIn } from "./pages/LogIn"
import Profile from "./pages/Profile"
import "./Scss/reset.scss"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App
