import { useEffect, useId, useState } from "react";
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
    { id: "btech", label: "B.Tech.", to: "/programmes/btech" },
    { id: "mtech", label: "M.Tech.", to: "/programmes/mtech" },
    {
      id: "mtech-research",
      label: "M.Tech. with Research",
      to: "/programmes/mtech-research",
    },
    { id: "phd", label: "Ph.D.", to: "/programmes/phd" },
  ],

  people: [
    { id: "faculty", label: "Faculty" },
    { id: "staff", label: "Staff" },
    { id: "former-members", label: "Former Members" },
    { id: "phd-scholars", label: "PhD Scholars" },
    { id: "graduated-scholars", label: "Graduated Scholars" },
    { id: "students", label: "Students", to: "/people/students" },
    { id: "alumni", label: "Alumni", to: "/people/alumni" },
  ],

  research: [
    { id: "research-areas", label: "Areas", to: "/research/research-areas" },
    { id: "labs", label: "Labs" },
    { id: "research-projects", label: "Projects" },
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
  const dropdownId = useId();

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!openDropdown) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [openDropdown]);

  const linkClass = (active) =>
    `main-navigation-link flex items-center justify-start gap-1 px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-200 lg:h-full lg:justify-center lg:px-4 lg:py-0 ${
      active
        ? "main-navigation-link-active"
        : "hover:text-white"
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
      id="main-navigation"
      aria-label="Main navigation"
      className={`main-navigation fixed left-0 right-0 top-[70px] z-[100] bg-[#19007B] shadow-none max-lg:bottom-0 max-lg:w-72 max-lg:max-w-[85vw] max-lg:overflow-y-auto max-lg:overflow-x-hidden max-lg:shadow-xl max-lg:transition-all max-lg:duration-300 max-lg:ease-out lg:absolute lg:h-[54px] lg:w-full ${
        isMobileMenuOpen
          ? "mobile-nav-open"
          : "mobile-nav-closed"
      }`}
    >
      <ul className="mx-auto flex  flex-col lg:h-full lg:w-full lg:max-w-[1440px] lg:flex-row lg:items-stretch lg:justify-center lg:bg-[#19007B]">
        {navLinks.map((item) => (
          <li
            key={item.label}
            className="relative border-b border-[#19007B] last:border-b-0 lg:flex lg:h-full lg:items-stretch lg:border-b-0"
            onPointerEnter={(e) => handlePointerEnter(e, item)}
            onPointerLeave={(e) => handlePointerLeave(e, item)}
          >
            {item.sections ? (
              <div className="relative lg:flex lg:h-full">
                {/* Row: main link + arrow button */}
                <div className="relative flex items-stretch lg:h-full">
                  <NavLink
                    to={item.to}
                    onClick={() => {
                      setOpenDropdown(null);
                      closeMenu?.();
                    }}
                    className={({ isActive }) =>
                      `${linkClass(isActiveItem(item, isActive))} flex-none pr-0 lg:pr-0`
                    }
                  >
                    {item.label}
                  </NavLink>

                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} dropdown`}
                    aria-expanded={openDropdown === item.label}
                    aria-controls={`${dropdownId}-${item.label.toLowerCase()}`}
                    onClick={() =>
                      setOpenDropdown((current) =>
                        current === item.label ? null : item.label
                      )
                    }
                    className="flex h-auto w-5 shrink-0 items-center justify-center text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:h-full lg:flex-none"
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
                  id={`${dropdownId}-${item.label.toLowerCase()}`}
                  className="main-navigation-dropdown lg:absolute lg:left-0 lg:top-full lg:min-w-[220px] lg:shadow-md"
                  style={{
                    display: openDropdown === item.label ? "block" : "none",
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
                      className="main-navigation-dropdown-link block whitespace-nowrap px-9 py-3 text-sm font-medium text-white transition-colors duration-200 lg:px-5"
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
                  className="h-3.5 w-3.5"
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
                className={({ isActive }) =>
                  linkClass(isActive)
                }
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