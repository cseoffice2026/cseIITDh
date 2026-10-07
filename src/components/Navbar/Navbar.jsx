import { useState } from "react";
import { NavLink } from "react-router-dom";

const sectionLinks = {
  academics: [
    { id: "timetable", label: "Time Table" },
    { id: "courses", label: "Courses" },
    { id: "curriculum", label: "Curriculum" },
    { id: "rules", label: "Academic Rules" },
    // { id: "placements", label: "Placements" },
    { id: "faq", label: "FAQs" },
  ],

  people: [
    { id: "faculty", label: "Faculty" },
    { id: "staff", label: "Staff" },
    { id: "former-members", label: "Former Members" },
    { id: "phd-scholars", label: "PhD Scholars" },
    { id: "graduated-scholars", label: "Graduated Scholars" },
    { id: "students", label: "Students" },
  ],

  research: [
    { id: "research-projects", label: "Research Projects" },
    // { id: "Department Facilities", label: "Department Facilities" },
  ],
};

const navLinks = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/academics",
    label: "Academics",
    sections: sectionLinks.academics,
  },
  {
    to: "/people",
    label: "People",
    sections: sectionLinks.people,
  },
  {
    to: "/research",
    label: "Research",
    sections: sectionLinks.research,
  },
  {
    href: "https://iitdh.ac.in/admissions",
    label: "Admissions",
    external: true,
  },
  {
    to: "/join-as-faculty",
    label: "Join Us",
  },
  {
    to: "/contact",
    label: "Contact",
  },
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

  const handleMouseEnter = (label) => {
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 right-0 top-[70px] z-[100] bg-purple-800 shadow-sm ${
        isMobileMenuOpen ? "block" : "hidden sm:block"
      }`}
    >
      <ul className="mx-auto flex max-w-7xl flex-col sm:flex-row sm:items-stretch sm:justify-center">
        {navLinks.map((item) => (
          <li
            key={item.label}
            className="relative"
            onMouseEnter={() => {
              if (item.sections) {
                handleMouseEnter(item.label);
              }
            }}
            onMouseLeave={() => {
              if (item.sections) {
                handleMouseLeave();
              }
            }}
          >
            {item.sections ? (
              <div className="relative flex items-center">
                {/* Main Navigation Link */}
                <NavLink
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${linkClass(isActive)} flex-1`
                  }
                >
                  {item.label}
                </NavLink>

                {/* Arrow */}
                <button
                  type="button"
                  aria-label={`Toggle ${item.label} dropdown`}
                  aria-expanded={openDropdown === item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDropdown((current) =>
                      current === item.label ? null : item.label
                    );
                  }}
                  className="flex h-full items-center px-2 text-white hover:bg-purple-900"
                >
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
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
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className="absolute left-0 top-full min-w-[220px] rounded-b-md bg-purple-800 shadow-lg"
                  style={{
                    display:
                      openDropdown === item.label ? "block" : "none",
                    zIndex: 9999,
                  }}
                >
                  {item.sections.map((section) => (
                    <NavLink
                      key={section.id}
                      to={`${item.to}#${section.id}`}
                      onClick={() => {
                        setOpenDropdown(null);
                        closeMenu?.();
                      }}
                      className="block whitespace-nowrap px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-900"
                    >
                      {section.label}
                    </NavLink>
                  ))}
                </div>
              </div>
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