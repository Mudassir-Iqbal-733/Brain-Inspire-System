import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Overview from "./pages/About/Overview"
import DirectorMessagePage from "./pages/About/DirectorMessagePage"
import ManagingDirectorMessage from "./pages/About/ManagingDirectorMessage"
import PrincelyState from "./pages/About/PrincelyState"
import ContactUs from "./pages/ContactUs"
import CareerGuidance from "./pages/CareerGuidance"



const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
     <Route index element={<Home/>} />
     <Route path="/about/overview" element={<Overview />} />
     <Route path="/about/director-message" element={<DirectorMessagePage />} />
     <Route path="/about/managing-director-message" element={<ManagingDirectorMessage />} />
     <Route path="/about/princely-state" element={<PrincelyState />} />


     <Route path="/contact-us" element={<ContactUs />} />
     <Route path="/career-guidance" element={<CareerGuidance />} />

    </Routes>

    <Footer />
    </>
  )
}

export default App