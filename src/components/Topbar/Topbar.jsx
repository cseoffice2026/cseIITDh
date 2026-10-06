// src/components/Topbar.jsx
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

// import logo from "../../assets/institute-logo.png";

function Topbar({ toggleMobileMenu, isMobileMenuOpen }) {
  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white py-2 px-4 sm:px-6 flex items-center justify-between border-t-[5px] border-[#263c38] shadow-sm z-50 h-[70px]">
        {/* Mobile menu button and Logo */}
        <div className="flex items-center">
          <button
            type="button"
            className="sm:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none mr-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Open menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          {/* Default Logo (hidden on small screens) */}
          <button
            type="button"
            onClick={() => window.open("https://www.iitdh.ac.in/", "_blank")}
          >
            <img
              loading="lazy"
              src={"/images/logo.png"}
              alt="IIT DH"
              className="hidden sm:block cursor-pointer h-[40px] sm:h-[45px] md:h-[55px] w-auto transition-transform duration-200 hover:scale-[1.02]"
            />
          </button>
          {/* Mobile Logo (visible only on small screens) */}
          <button
            type="button"
            onClick={() => window.open("https://www.iitdh.ac.in/", "_blank")}
            className="block sm:hidden p-0 bg-transparent border-none"
            style={{ lineHeight: 0 }}
            aria-label="IIT DH Home"
          >
            <img
              loading="lazy"
              src="/institute_favicon.png"
              alt="IIT DH"
              className="cursor-pointer h-[50px] w-auto transition-transform duration-200 hover:scale-[1.02]"
            />
          </button>
        </div>

        {/* Department name - centered on laptop+ screens */}
        <div className="flex-1 hidden sm:flex justify-center items-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer text-[0.8rem] md:text-[0.95rem] lg:text-[1rem] font-semibold text-purple-900 tracking-wide text-center bg-transparent border-none p-0"
            style={{ outline: "none" }}
          >
            <h1 className="pointer-events-none m-0">
              DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
            </h1>
          </button>
        </div>

        {/* Department name - mobile only - abbreviated */}
        <div className="flex sm:hidden max-w-[300px]">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer text-[0.65rem] font-semibold text-purple-900 tracking-wide text-center bg-transparent border-none p-0"
            style={{ outline: "none" }}
          >
            <h1 className="pointer-events-none m-0">
              Department of Computer Science & Engineering
            </h1>
          </button>
        </div>

        {/* Search bar and results container */}
        <SearchInput />
      </header>
    </>
  );
}

export default Topbar;
