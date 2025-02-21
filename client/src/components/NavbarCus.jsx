import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavbarCus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

    const token = localStorage.getItem('token');
    const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

    const getNavLink = (path) => token ? `${path}-customer` : path;

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                credentials: "include", // Cho phép gửi cookie nếu có
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.removeItem("token"); // Xóa token trên frontend
                navigate("/login"); // Điều hướng về trang login
            } else {
                console.error("Logout failed:", data.error);
            }
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <div className="w-full h-[100px] bg-[#F9FAEF] flex items-center justify-between px-6 md:px-12 lg:px-10 shadow-md relative z-10">
            <NavLink to="/" className="w-[155px] h-[52px] z-20">
                <div className="w-full h-full bg-[url(/images/logo.png)] bg-cover bg-no-repeat md:w-[150px] lg:w-[150px]"></div>
            </NavLink>

            <button
                className="md:hidden text-[#E27585] text-[30px] z-20 absolute right-6"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                ☰
            </button>

            <nav className={`flex-col md:flex-row md:flex gap-6 lg:gap-20 text-[18px] lg:text-[25px] font-semibold z-10 ${isMobileMenuOpen ? 'flex bg-[#F9FAEF] p-4 rounded-lg shadow-lg absolute top-[100px] left-0 right-0' : 'hidden'} md:flex`}>
                <NavLink to={getNavLink("/")} className={({ isActive }) => `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}>About</NavLink>
                <NavLink to={getNavLink("/service")} className={({ isActive }) => `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}>Services</NavLink>
                <NavLink to={getNavLink("/blog")} className={({ isActive }) => `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}>Blog</NavLink>
                <NavLink to={getNavLink("/Consultant")} className={({ isActive }) => `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}>Consultant</NavLink>
                <NavLink to={getNavLink("/quiz")} className={({ isActive }) => `text-center ${isActive ? 'text-[#fadade]' : 'text-[#E27585]'}`}>Quiz</NavLink>
            </nav>

            {!isLoginPage && (
                <div className="relative">
                    <button onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)} className="hidden md:block">
                        <i className="fas fa-user text-[#E27585] text-[30px] md:text-[40px] lg:text-[45px]"></i>
                    </button>
                    {isProfilePopupOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                            <NavLink to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 box-border">Profile</NavLink>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 box-border">Log out</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavbarCus;
