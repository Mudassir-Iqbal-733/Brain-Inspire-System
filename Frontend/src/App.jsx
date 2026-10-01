import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
     <Route index element={<Home/>} />
    </Routes>

    <Footer />
    </>
  )
}

export default App