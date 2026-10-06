import { useState } from "react";
import { NavLink } from "react-router-dom";

const sectionLinks = {
  academics: [
    { id: "timetable", label: "Time Table" },
    { id: "courses", label: "Courses" },
    { id: "curriculum", label: "Curriculum" },
    { id: "rules", label: "Academic Rules" },
    { id: "placements", label: "Placements" },
    { id: "faq", label: "FAQs" },
  ],
  people: [
    { id: "faculty", label: "Faculty" },
    { id: "former-faculty", label: "Former Faculty" },
    { id: "staff", label: "Staff" },
    { id: "former-members", label: "Former Staff" },
    { id: "phd-scholars", label: "PhD Scholars" },
    { id: "graduated-scholars", label: "Graduated Scholars" },
    { id: "students", label: "Students" },
  ],
  research: [
    { id: "labs", label: "Research Labs" },
    { id: "research-projects", label: "Research Projects" },
  ],
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics", sections: sectionLinks.academics },
  { to: "/people", label: "People", sections: sectionLinks.people },
  { to: "/research", label: "Research", sections: sectionLinks.research },
  {
    href: "https://iitdh.ac.in/admissions",
    label: "Admissions",
    external: true,
  },
  { to: "/join-as-faculty", label: "Join Us" },
  { to: "/contact", label: "Contact" },
  {
    href: "https://sites.google.com/iitdh.ac.in/cse/home",
    label: "Internal",
    external: true,
  },
];

function Navbar({ closeMenu, isMobileMenuOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const linkClass = (active) =>
    `flex items-center justify-center px-4 py-3 text-sm font-semibold transition-colors ${
      active
        ? "bg-purple-950 text-white"
        : "text-purple-50 hover:bg-purple-900 hover:text-white"
    }`;

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 right-0 top-[70px] z-50 overflow-visible bg-purple-800 shadow-sm ${
        isMobileMenuOpen ? "block" : "hidden sm:block"
      }`}
    >
      <ul className="hide-scrollbar mx-auto flex max-h-[calc(100vh-70px)] max-w-7xl flex-col overflow-y-auto sm:max-h-none sm:flex-row sm:items-stretch sm:justify-center sm:overflow-visible">
        {navLinks.map((item) => (
          <li
            key={item.label}
            className={`relative ${openDropdown === item.label ? "z-50" : ""}`}
            onMouseEnter={() => item.sections && setOpenDropdown(item.label)}
            onMouseLeave={() =>
              item.sections &&
              setOpenDropdown((current) =>
                current === item.label ? null : current,
              )
            }
          >
            {item.sections ? (
              <>
                <div className="flex items-center">
                  <NavLink
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${linkClass(isActive)} flex-1`
                    }
                  >
                    {item.label}
                  </NavLink>
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} menu`}
                    aria-expanded={openDropdown === item.label}
                    onClick={() =>
                      setOpenDropdown((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    className="px-3 py-3 text-purple-100 hover:bg-purple-900 sm:-ml-3"
                  >
                    <svg
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  </button>
                </div>
                {openDropdown === item.label && (
                  <ul className="z-50 bg-purple-800 py-1 shadow-lg sm:absolute sm:left-0 sm:top-full sm:min-w-52 sm:rounded-b-md">
                    {item.sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          to={`${item.to}#${section.id}`}
                          onClick={() => {
                            setOpenDropdown(null);
                            closeMenu?.();
                          }}
                          className="block px-5 py-2.5 text-sm text-purple-50 hover:bg-purple-900"
                        >
                          {section.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className={linkClass(false)}
              >
                {item.label}
                <svg
                  aria-hidden="true"
                  className="ml-1 h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5h5v5m-1-4-8 8M5 7v12h12v-7"
                  />
                </svg>
              </a>
            ) : (
              <NavLink
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) => linkClass(isActive)}
              >
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
