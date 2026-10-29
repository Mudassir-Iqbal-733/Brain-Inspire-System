import { Route, Routes, Navigate } from "react-router-dom";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Blogs from "./pages/Blogs/Blogs";
import BlogForm from "./pages/Blogs/BlogForm";
import Comments from "./pages/comments/Comments";
import Dashboard from "./pages/dashboard/Dashboard"; 
import HeaderSettings from "./components/settings/HeaderSettings"; 
import FooterSettings from "./components/settings/FooterSettings";
import DirectorForm from "./components/settings/DirectorForm";
import ContactSettings from "./components/settings/ContactSettings";
import Feedbacks from "./pages/Feedbacks";
import AboutSettings from "./pages/AboutSettings";
import SocialSettings from "./components/settings/SocialSettings";
import SliderSettings from "./components/settings/SliderSettings";
import Programs from "./pages/Programs";
import Admissions from "./pages/Admissions";
import AdmissionList from "./pages/AdmissionList";
import Gallery from "./pages/Gallery";
import Videos from "./components/settings/Videos";
import AdminProfile from "./pages/AdminProfile";
import GeneralSettings from "./components/settings/GeneralSettings";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard/settings/header" replace />} />

        <Route path="settings" element={<Dashboard />}>
          <Route index element={<Navigate to="header" replace />} />
          <Route path="header" element={<HeaderSettings />} />
          <Route path="footer" element={<FooterSettings />} />
          <Route path="director" element={<DirectorForm type="director" titleLabel="Director" />}  />
          <Route path="managing-director" element={<DirectorForm type="managing-director" titleLabel="Managing Director" />} />
           <Route path="social" element={<SocialSettings />} />
           <Route path="slider" element={<SliderSettings />} />
           <Route path="videos" element={<Videos />} />
           <Route path="general" element={<GeneralSettings />} />

        </Route>

        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/create" element={<BlogForm />} />
        <Route path="blogs/edit/:id" element={<BlogForm />} />

        <Route path="comments" element={<Comments />} />
        <Route path="contact" element={<ContactSettings />} />
        
        <Route path="feedbacks" element={<Feedbacks />} />

        <Route path="about" element={<AboutSettings />} />
        <Route path="programs" element={<Programs />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="admission-list" element={<AdmissionList />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="profile" element={<AdminProfile />} />




        

      </Route>
    </Routes>
  );
};

export default App;