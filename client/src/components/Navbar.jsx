import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from '../utils/axiosInstance';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken") || sessionStorage.getItem("authToken"));
  const fullName = localStorage.getItem("fullName") || sessionStorage.getItem("fullName");

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isLoginPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/customer-profile" || location.pathname === "/forgot-password";

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    axios.post("/api/auth/logout")
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("roleName");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("roleName");
        navigate("/login");
      })
      .catch(error => {
        console.error("Logout failed:", error.response?.data?.message || error.message);
      });
  };

  return (
    <div className="w-full h-[80px] bg-[#F9FAEF] flex items-center justify-between px-6 md:px-12 lg:px-10 shadow-md relative z-10">
      <NavLink to="/" className="w-[150px] h-[50px]">
        <div className="w-full h-full bg-[url(/images/logo.png)] bg-cover bg-no-repeat"></div>
      </NavLink>

      <button
        className="md:hidden text-[#E27585] text-[30px] z-20"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      <nav
        className={`absolute top-[80px] left-0 w-full bg-[#F9FAEF] flex flex-col items-center pacifico-regular gap-4 p-6 shadow-lg rounded-md transition-transform duration-300 md:static md:w-auto md:p-0 md:flex-row md:shadow-none md:gap-10 ${isMobileMenuOpen ? "flex" : "hidden md:flex"}`}
      >
        {["About", "Services", "Blog", "Consultant", "Quiz"].map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `text-center text-[18px] font-semibold transition-colors ${isActive ? "text-[#fadade]" : "text-[#E27585] hover:text-[#fadade]"}`
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>

      {!isLoginPage && (
        <div className="relative">
          {token ? (
            <button onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)}>
              <i className="fas fa-user text-[#E27585] text-[30px]"></i>
            </button>
          ) : (
            <NavLink to="/login" className="hidden md:block bg-[#e78999] text-white text-[18px] px-4 py-2 rounded-full shadow-sm hover:opacity-80">
              Login
            </NavLink>
          )}

          {isProfilePopupOpen && token && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="block px-4 py-2 text-gray-800">
                Welcome, {fullName}
              </div>
              <NavLink to="/customer-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Profile
              </NavLink>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
