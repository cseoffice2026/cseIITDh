import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

function Topbar({ toggleMobileMenu, isMobileMenuOpen }) {
  const navigate = useNavigate();

  const openInstituteWebsite = () => {
    window.open("https://www.iitdh.ac.in/", "_blank", "noopener,noreferrer");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-t-[5px] border-[#263c38] bg-white px-4 shadow-sm sm:px-6"
      style={{
        height: "70px",
        minHeight: "70px",
        maxHeight: "70px",
        boxSizing: "border-box",
      }}
    >
      {/* Institute logo */}
      <div
        className="flex shrink-0 items-center gap-2"
        style={{
          height: "100%",
          maxWidth: "min(45vw, 390px)",
        }}
      >
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop and tablet logo */}
        <button
          type="button"
          onClick={openInstituteWebsite}
          aria-label="Visit IIT Dharwad website"
          className="hidden items-center bg-transparent p-0 sm:flex"
          style={{
            height: "100%",
            maxHeight: "55px",
            lineHeight: 0,
            border: 0,
          }}
        >
          <img
            src="/images/logo.png"
            alt="Indian Institute of Technology Dharwad"
            loading="eager"
            decoding="async"
            style={{
              display: "block",
              height: "55px",
              minHeight: "0",
              maxHeight: "55px",
              width: "auto",
              maxWidth: "min(42vw, 360px)",
              objectFit: "contain",
            }}
          />
        </button>

        {/* Mobile menu and logo */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={openInstituteWebsite}
            aria-label="IIT Dharwad Home"
            className="flex items-center bg-transparent p-0"
            style={{
              lineHeight: 0,
              border: 0,
            }}
          >
            <img
              src="/institute_favicon.png"
              alt="IIT Dharwad"
              loading="eager"
              style={{
                display: "block",
                width: "42px",
                height: "42px",
                maxWidth: "42px",
                maxHeight: "42px",
                objectFit: "contain",
              }}
            />
          </button>
        </div>
      </div>

      {/* Department name */}
      <div className="hidden min-w-0 flex-1 items-center justify-center px-3 sm:flex">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-transparent p-0 text-center font-semibold tracking-wide text-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
          style={{
            border: 0,
            fontSize: "clamp(11px, 1vw, 15px)",
            lineHeight: 1.4,
          }}
        >
          DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
        </button>
      </div>

      {/* Mobile department name */}
      <div className="flex min-w-0 flex-1 items-center justify-center sm:hidden">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-transparent p-0 text-center font-semibold text-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
          style={{
            border: 0,
            fontSize: "10px",
            lineHeight: 1.3,
          }}
        >
          Department of Computer Science & Engineering
        </button>
      </div>

      {/* Search component remains compatible with existing imports */}
      <div className="shrink-0">
        <SearchInput />
      </div>
    </header>
  );
}

export default Topbar;