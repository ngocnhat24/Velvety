import './App.css'
import { Routes, Route } from "react-router-dom";
import About from './pages/guest/About.jsx';
import LoginPage from './pages/guest/LoginPage.jsx';
import Blog from './pages/guest/Blog.jsx';
import Services from './pages/guest/Services.jsx';
import Forgotpassword from './pages/guest/Forgotpassword.jsx';
import RegisterPage from './pages/guest/RegisterPage.jsx';
import Quiz from './pages/guest/Quiz.jsx';
import axios from 'axios';
import VerifyEmailPage from './pages/guest/VerifyEmailPage.jsx';

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <Routes>
      <Route index element={<About />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/service' element={<Services />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<Forgotpassword />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/verify' element={<VerifyEmailPage/>} />
    </Routes>

  );
}

export default App
