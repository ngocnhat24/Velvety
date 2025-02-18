import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if the current path is "/login" or "/register"
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="w-full h-[100px] bg-[#F9FAEF] flex items-center justify-between px-6 md:px-12 lg:px-10 shadow-md relative z-10">
      {/* Logo */}
      <NavLink to="/" className="w-[155px] h-[52px] z-20">
        <div className="w-full h-full bg-[url(/images/logo.png)] bg-cover bg-no-repeat md:w-[150px] lg:w-[150px]"></div>
      </NavLink>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-[#E27585] text-[30px] z-20"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Navigation Links */}
      <nav className={`flex-col md:flex-row md:flex gap-6 lg:gap-20 text-[18px] lg:text-[25px] font-semibold z-10 ${isMobileMenuOpen ? 'flex bg-[#F9FAEF] p-4 rounded-lg shadow-lg absolute top-[100px] left-0 right-0' : 'hidden'} md:flex`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}
        >
          About
        </NavLink>
        <NavLink
          to="/service"
          className={({ isActive }) =>
            `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}
        >
          Services
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}
        >
          Blog
        </NavLink>
        <NavLink
          to="/Consultant"
          className={({ isActive }) =>
            `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}
        >
          Consultant
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}
        >
          Quiz
        </NavLink>
      </nav>

      {/* Conditional Login Button */}
      {!isLoginPage && (
        <a href="/login" className="hidden md:block bg-[#e78999] text-[#faf5f0] text-[18px] lg:text-[25px] font-semibold px-4 lg:px-6 py-2 rounded-full shadow-sm hover:opacity-80">
          Login
        </a>
      )}
    </div>
  );
};

export default Navbar;
