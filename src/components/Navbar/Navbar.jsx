import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const sectionLinks = {
  academics: [
    { id: "timetable", label: "Time Table" },
    { id: "courses", label: "Courses" },
    { id: "curriculum", label: "Curriculum" },
    { id: "rules", label: "Academic Rules" },
    // { id: "placements", label: "Placements" },
    { id: "faq", label: "FAQs" },
  ],

  // Each item has its own page path (`to`)
  programmes: [
    { id: "btech", label: "B.Tech", to: "/programmes/btech" },
    { id: "mtech", label: "M.Tech", to: "/programmes/mtech" },
    {
      id: "mtech-research",
      label: "M.Tech with Research",
      to: "/programmes/mtech-research",
    },
    { id: "phd", label: "PhD", to: "/programmes/phd" },
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
    to: "/programmes/btech",
    activePrefix: "/programmes", // stays highlighted on every programme page
    label: "Programmes",
    sections: sectionLinks.programmes,
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

// The horizontal bar is used from the "lg" breakpoint (1024px) upwards.
// Below that (phones AND tablets) the menu opens as a stacked list.
const isDesktopWidth = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches;

function Navbar({ closeMenu, isMobileMenuOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const linkClass = (active) =>
    `flex items-center justify-start px-5 py-3.5 text-sm font-semibold transition-colors lg:justify-center lg:px-3 lg:py-3 xl:px-4 ${active
      ? "bg-purple-950 text-white"
      : "text-purple-50 hover:bg-purple-900 hover:text-white"
    }`;

  // Hover opens the dropdown only for a mouse on a wide screen.
  // On touch screens the arrow button toggles it (avoids open-then-close).
  const handlePointerEnter = (event, item) => {
    if (
      item.sections &&
      event.pointerType === "mouse" &&
      isDesktopWidth()
    ) {
      setOpenDropdown(item.label);
    }
  };

  const handlePointerLeave = (event, item) => {
    if (
      item.sections &&
      event.pointerType === "mouse" &&
      isDesktopWidth()
    ) {
      setOpenDropdown(null);
    }
  };

  const isActiveItem = (item, isActive) =>
    isActive ||
    Boolean(
      item.activePrefix && location.pathname.startsWith(item.activePrefix)
    );

  return (
        <nav
      aria-label="Main navigation"
      className={`fixed left-0 right-0 top-[70px] z-[100] bg-purple-800 shadow-sm max-lg:right-auto max-lg:bottom-0 max-lg:w-72 max-lg:max-w-[85vw] max-lg:overflow-y-auto max-lg:overflow-x-hidden max-lg:shadow-xl max-lg:transition-all max-lg:duration-300 max-lg:ease-out ${
        isMobileMenuOpen
          ? "max-lg:visible max-lg:translate-x-0"
          : "max-lg:invisible max-lg:-translate-x-full"
      }`}
    >
      <ul className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-stretch lg:justify-center">
        {navLinks.map((item) => (
          <li
            key={item.label}
            className="relative border-b border-purple-700/70 last:border-b-0 lg:border-b-0"
            onPointerEnter={(e) => handlePointerEnter(e, item)}
            onPointerLeave={(e) => handlePointerLeave(e, item)}
          >
            {item.sections ? (
              <div className="relative">
                {/* Row: main link + arrow button */}
                <div className="flex items-stretch">
                  <NavLink
                    to={item.to}
                    onClick={() => {
                      setOpenDropdown(null);
                      closeMenu?.();
                    }}
                    className={({ isActive }) =>
                      `${linkClass(isActiveItem(item, isActive))} flex-1`
                    }
                  >
                    {item.label}
                  </NavLink>

                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} dropdown`}
                    aria-expanded={openDropdown === item.label}
                    onClick={() =>
                      setOpenDropdown((current) =>
                        current === item.label ? null : item.label
                      )
                    }
                    className="flex items-center border-l border-purple-700/70 px-5 text-white hover:bg-purple-900 lg:border-l-0 lg:px-2"
                  >
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dropdown: inline list below lg, floating panel on lg+ */}
                <div
                  className="bg-purple-900 lg:absolute lg:left-0 lg:top-full lg:min-w-[220px] lg:rounded-b-md lg:bg-purple-800 lg:shadow-lg"
                  style={{
                    display: openDropdown === item.label ? "block" : "none",
                    zIndex: 9999,
                  }}
                >
                  {item.sections.map((section) => (
                    <NavLink
                      key={section.id}
                      // Programmes items have their own page path (section.to);
                      // the others still scroll to a #section on the same page.
                      to={section.to ?? `${item.to}#${section.id}`}
                      onClick={() => {
                        setOpenDropdown(null);
                        closeMenu?.();
                      }}
                      className="block whitespace-nowrap px-9 py-3 text-sm font-medium text-purple-50 transition-colors hover:bg-purple-950 hover:text-white lg:px-5 lg:text-white lg:hover:bg-purple-900"
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