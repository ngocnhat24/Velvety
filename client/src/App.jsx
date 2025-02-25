import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/guest/LoginPage.jsx';
import Blog from './pages/guest/Blog.jsx';
import Forgotpassword from './pages/guest/Forgotpassword.jsx';
import RegisterPage from './pages/guest/RegisterPage.jsx';
import Quiz from './pages/customer/Quiz.jsx';
import axios from 'axios';
import VerifyEmailPage from './pages/guest/VerifyEmailPage.jsx';
import BlogDetail from './pages/guest/BlogDetail.jsx';
import ServiceManagement from './pages/manager/ServiceManagement.jsx';
import StaffManagement from './pages/admin/StaffManagement.jsx';
import Dashboard from './pages/manager/Dashboard.jsx';
import TherapistManagement from './pages/admin/TherapistManagement.jsx';
import ResetPassword from './pages/guest/ResetPassword.jsx';
import BlogManagement from './pages/manager/BlogManagement.jsx';
import QuestionManagement from './pages/manager/QuestionManagement.jsx';
import About from './pages/guest/About.jsx';
import BookingPageCustomer from './pages/customer/Booking.jsx';
import ConsultantGuest from './pages/guest/Consultant.jsx';
import ConsultantCustomer from './pages/customer/Consultant.jsx';
import ServiceGuest from './pages/guest/Services.jsx';
import Calendar from './pages/customer/Calendar.jsx';
import ProtectedRoute from "./components/ProtectedRoute";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Default route */}
        <Route index element={<About />} />

        {/* Other Routes */}
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/verify' element={<VerifyEmailPage />} />

        {/* Guest Pages */}
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<BlogDetail />} />
        <Route path='/services' element={<ServiceGuest />} />
        <Route path='/consultant' element={<ConsultantGuest />} />
        <Route path='/quiz' element={<Quiz />} />

        {/* Customer Pages */}
        <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
          <Route path='/booking' element={<BookingPageCustomer />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/consultant-customer' element={<ConsultantCustomer />} />
          <Route path='/quiz' element={<Quiz />} />
        </Route>

        {/* Manager Pages */}
        <Route element={<ProtectedRoute allowedRoles={["Manager"]} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/service-management' element={<ServiceManagement />} />
          <Route path='/blog-management' element={<BlogManagement />} />
          <Route path='/question-management' element={<QuestionManagement />} />
        </Route>

        {/* Admin Pages */}
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path='/staff-management' element={<StaffManagement />} />
          <Route path='/therapist-management' element={<TherapistManagement />} />
        </Route>
      </Routes>

    </div>


  );
}

export default App