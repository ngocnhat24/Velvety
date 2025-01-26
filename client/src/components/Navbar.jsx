import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Check if the current path is "/login" or "/register"
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="w-[1909.393px] h-[148.508px] bg-[#c86c79] relative overflow-hidden z-[2] mt-0 mr-0 mb-0 ml-0">
      {/* Logo */}
      <div className="w-[212.155px] h-[74.254px] bg-[url(@/assets/images/Logo.png)] bg-cover bg-no-repeat absolute top-[34.477px] left-[92.817px] z-[76]" />

      {/* Conditional Login Button */}
      {!isLoginPage && (
        <button className="w-[135.249px] h-[63.646px] bg-[#e78999] rounded-[1324.641px] border-none absolute top-[42.439px] right-[70.784px] overflow-hidden z-[5] pointer shadow-sm">
          <a
            href="/login"
            className="flex h-[34px] justify-start items-center font-['Lato'] text-[27.51934242248535px] font-semibold leading-[34px] text-[#faf5f0] absolute top-[14.582px] left-[31.829px] text-left whitespace-nowrap z-[6]"
          >
            Login
          </a>
        </button>
      )}

      {/* Navigation Links */}
      <ul>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "hover:underline flex w-[73px] h-[34px] justify-center items-center font-['Lato'] text-[26.51934242248535px] font-semibold leading-[34px] text-[#fadade] absolute top-[54.373px] right-[1170.764px] text-center whitespace-nowrap z-[3]"
              : "hover:underline flex w-[73px] h-[34px] justify-center items-center font-['Lato'] text-[26.51934242248535px] font-semibold leading-[34px] text-[#f1baba] absolute top-[54.373px] right-[1170.764px] text-center whitespace-nowrap z-[3]"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/service"
          className={({ isActive }) =>
            isActive
              ? "hover:underline flex w-[255px] h-[34px] justify-center items-center font-['Lato'] text-[26.51934242248535px] font-semibold leading-[34px] text-[#fadade] absolute top-[54.373px] right-[816.386px] text-center whitespace-nowrap z-[4]"
              : "hover:underline flex w-[255px] h-[34px] justify-center items-center font-['Lato'] text-[26.51934242248535px] font-semibold leading-[34px] text-[#f1baba] absolute top-[54.373px] right-[816.386px] text-center whitespace-nowrap z-[4]"
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? "hover:underline flex w-[53px] h-[34px] justify-center items-center font-['Lato'] text-[26.51934242248535px] font-semibold leading-[34px] text-[#fadade] absolute top-[54.373px] left-[1192.039px] text-center whitespace-nowrap z-[7]"
              : "hover:underline flex w-[53px] h-[34px] justify-center items-center font-['Lato'] text-[26.51934242248535px] font-semibold leading-[34px] text-[#f1baba] absolute top-[54.373px] left-[1192.039px] text-center whitespace-nowrap z-[7]"
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            isActive
              ? "hover:underline flex w-[53px] h-[34px] justify-center items-center font-['Lato'] text-[26.51934242248535px] font-semibold leading-[34px] text-[#fadade] absolute top-[54.373px] left-[1392.039px] text-center whitespace-nowrap z-[8]"
              : "hover:underline flex w-[53px] h-[34px] justify-center items-center font-['Lato'] text-[26.51934242248535px] font-semibold leading-[34px] text-[#f1baba] absolute top-[54.373px] left-[1392.039px] text-center whitespace-nowrap z-[8]"
          }
        >
          Quiz
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
