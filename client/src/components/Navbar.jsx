import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Check if the current path is "/login" or "/register"
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="w-full h-[100px] bg-[#F9FAEF] flex items-center justify-between px-6 md:px-12 lg:px-10 shadow-md relative z-10">
      {/* Logo */}
      <div className="w-[100px] h-[35px] bg-[url(@/assets/images/Logo.png)] bg-cover bg-no-repeat md:w-[120px] md:h-[45px] lg:w-[150px] lg:h-[55px] z-20"></div>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-24 text-[25px] font-semibold z-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` text-center ${isActive ? 'text-[#fadade]' : 'text-[#f1baba]'}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/service"
          className={({ isActive }) =>
            ` text-center ${isActive ? 'text-[#fadade]' : 'text-[#f1baba]'}`
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            ` text-center ${isActive ? 'text-[#fadade]' : 'text-[#f1baba]'}`
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            ` text-center ${isActive ? 'text-[#fadade]' : 'text-[#f1baba]'}`
          }
        >
          Quiz
        </NavLink>
      </nav>

      {/* Conditional Login Button */}
      {!isLoginPage && (
        <a href="/login" className="bg-[#e78999] text-[#faf5f0] text-[25px] font-semibold px-6 py-2 rounded-full shadow-sm hover:opacity-80">
          Login
        </a>
      )}
    </div>
  );
};

export default Navbar;
