import './App.css'
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
import AboutGuest from './pages/guest/About.jsx';
import AboutCustomer from './pages/customer/About.jsx';
import BookingPageGuest from './pages/guest/Booking.jsx';
import BookingPageCustomer from './pages/customer/Booking.jsx';
import ConsultantGuest from './pages/guest/Consultant.jsx';
import ConsultantCustomer from './pages/customer/Consultant.jsx';
import ServiceGuest from './pages/guest/Services.jsx';
import ServiceCustomer from './pages/customer/Services.jsx';
import Calendar from './pages/customer/Calendar.jsx';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {

  return (
    <Routes>
      <Route index element={<AboutGuest />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/service' element={<ServiceGuest />} />
      <Route path='/service-customer' element={<ServiceCustomer />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<Forgotpassword />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/verify' element={<VerifyEmailPage />} />
      <Route path='/blog/:id' element={<BlogDetail />} />
      <Route path='/therapist-management' element={<TherapistManagement />} />
      <Route path='/service-management' element={<ServiceManagement />} />
      <Route path='/staff-management' element={<StaffManagement />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/booking' element={<BookingPageGuest/>} />
      <Route path='/booking-customer' element={<BookingPageCustomer/>} />
      <Route path='reset-password' element={<ResetPassword/>} />
      <Route path='consultant' element={<ConsultantGuest/>} />
      <Route path='consultant-customer' element={<ConsultantCustomer/>} />
      <Route path='blog-management' element={<BlogManagement/>} />
      <Route path='question-management' element={<QuestionManagement/>} />
      <Route path='about-customer' element={<AboutCustomer/>} />
      <Route path='calendar' element={<Calendar />} />
    </Routes>

  );
}

export default App