import { Route, Routes } from "react-router-dom"
import DashboardLayout from "./pages/dashboard/DashboardLayout"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./components/ProtectedRoute"


const App = () => {
  return (
    <>
    <Routes>

      <Route index element={<Login />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App