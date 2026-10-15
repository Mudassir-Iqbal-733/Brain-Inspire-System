import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Overview from "./pages/About/Overview"
import DirectorMessagePage from "./pages/About/DirectorMessagePage"
import ManagingDirectorMessage from "./pages/About/ManagingDirectorMessage"
import PrincelyState from "./pages/About/PrincelyState"
import ContactUs from "./pages/ContactUs"
import CareerGuidance from "./pages/Admissions/AdmissionProcedure"
import NotFound from "./components/NotFound"
import WhyBise from "./pages/Admissions/WhyBise"
import FeeStructure from "./pages/Admissions/FeeStructure"
import RulesAndRegulations from "./pages/Admissions/RulesAndRegulations"
import Programs from "./pages/Programs/Programs"
import ProgramDetails from "./pages/Programs/ProgramDetails"
import ScrollToTop from "./components/ScrollToTop"
import { HelmetProvider } from "react-helmet-async"
import WhatsAppButton from "./components/WhatsAppButton"
import Gallery from "./pages/Gallery"
import Blog from "./pages/Blogs/Blogs"
import AdmissionProcedure from "./pages/Admissions/AdmissionProcedure"
import AdmissionForm from "./pages/Admissions/AdmissionForm"
import TopBar from "./components/TopBar"




const App = () => {
  return (
    <>
    <HelmetProvider >
    <ScrollToTop />
    <TopBar />
    <Navbar />
    <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/about/overview" element={<Overview />} />
     <Route path="/about/director-message" element={<DirectorMessagePage />} />
     <Route path="/about/managing-director-message" element={<ManagingDirectorMessage />} />
     <Route path="/about/princely-state" element={<PrincelyState />} />
    
     
     <Route path="/programs" element={<Programs />} />
<Route path="/programs/:slug" element={<ProgramDetails />} />

     <Route path="/admissions/why-bise" element={<WhyBise />} />
     <Route path="/admissions/apply-online" element={<AdmissionProcedure />} />
     <Route path="/admissions/admission-form" element={<AdmissionForm />} />
     <Route path="/admissions/fee-structure" element={<FeeStructure />} />
     <Route path="/admissions/rules-regulations" element={<RulesAndRegulations />} />
     
     <Route path="/gallery" element={<Gallery/>} />
     <Route path="/blogs" element={<Blog/>} />
     <Route path="/contact-us" element={<ContactUs />} />

     

     <Route path="*" element={<NotFound />} />

    </Routes>

    <Footer />

    </HelmetProvider>
    <WhatsAppButton />
    </>
  )
}

export default App