import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

function Topbar({ toggleMobileMenu, isMobileMenuOpen }) {
  const navigate = useNavigate();

  const openInstituteWebsite = () => {
    window.open(
      "https://www.iitdh.ac.in/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[70px] items-center justify-between border-t-[5px] border-[#263c38] bg-white px-4 py-2 shadow-sm sm:px-6">

      {/* Mobile menu button: visible below 1024px */}
      <div className="flex shrink-0 items-center">
        <button
          type="button"
          className="mr-2 flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-gray-900 focus:outline-none lg:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
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
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
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
          className="hidden bg-transparent p-0 sm:block"
          style={{ lineHeight: 0, border: 0 }}
        >
          <img
            loading="eager"
            decoding="async"
            src="/images/logo.png"
            alt="Indian Institute of Technology Dharwad"
            style={{
              display: "block",
              height: "clamp(40px, 5vw, 55px)",
              maxHeight: "55px",
              width: "auto",
              maxWidth: "min(42vw, 320px)",
              objectFit: "contain",
            }}
          />
        </button>

        {/* Mobile logo */}
        <button
          type="button"
          onClick={openInstituteWebsite}
          className="block border-0 bg-transparent p-0 sm:hidden"
          style={{ lineHeight: 0 }}
          aria-label="IIT Dharwad Home"
        >
          <img
            loading="eager"
            decoding="async"
            src="/institute_favicon.png"
            alt="IIT Dharwad"
            style={{
              display: "block",
              width: "46px",
              height: "46px",
              maxWidth: "46px",
              maxHeight: "46px",
              objectFit: "contain",
            }}
          />
        </button>
      </div>

      {/* Department name: tablet and desktop */}
      <div className="hidden min-w-0 flex-1 items-center justify-center px-3 sm:flex">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer border-0 bg-transparent p-0 text-center text-[0.8rem] font-semibold tracking-wide text-purple-900 outline-none md:text-[0.95rem] lg:text-[1rem]"
          style={{ outline: "none" }}
        >
          <h1 className="pointer-events-none m-0">
            DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
          </h1>
        </button>
      </div>

      {/* Department name: mobile */}
      <div className="flex max-w-[300px] min-w-0 flex-1 justify-center sm:hidden">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer border-0 bg-transparent p-0 text-center text-[0.65rem] font-semibold tracking-wide text-purple-900 outline-none"
          style={{ outline: "none" }}
        >
          <h1 className="pointer-events-none m-0">
            Department of Computer Science &amp; Engineering
          </h1>
        </button>
      </div>

      {/* Keep existing SearchInput import compatibility */}
      <SearchInput />

    </header>
  );
}

export default Topbar;