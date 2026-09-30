import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"


const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
     <Route index element={<Home/>} />
    </Routes>
    </>
  )
}

export default App