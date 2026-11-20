import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AcademicCapIcon,
  ArchiveBoxIcon,
  BeakerIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  CpuChipIcon,
  FolderOpenIcon,
  IdentificationIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

// Each menu is a list of columns. Each column has a heading and items.
const sectionLinks = {
  academics: [
    {
      heading: "Academics",
      items: [
        { id: "timetable", label: "Time Table", description: "Class schedules by semester", icon: CalendarDaysIcon },
        { id: "courses", label: "Courses", description: "Browse all courses offered", icon: BookOpenIcon },
        { id: "curriculum", label: "Curriculum", description: "Programme structure and credits", icon: AcademicCapIcon },
        { id: "rules", label: "Academic Rules", description: "Regulations and policies", icon: ScaleIcon },
        { id: "faq", label: "FAQs", description: "Common questions answered", icon: QuestionMarkCircleIcon },
      ],
    },
  ],

  // Each item has its own page path (`to`)
  programmes: [
    {
      heading: "Programmes",
      items: [
        { id: "btech", label: "B.Tech.", to: "/programmes/btech", description: "Undergraduate programme", icon: AcademicCapIcon },
        { id: "mtech", label: "M.Tech.", to: "/programmes/mtech", description: "Postgraduate coursework programme", icon: BuildingLibraryIcon },
        { id: "mtech-research", label: "M.Tech. with Research", to: "/programmes/mtech-research", description: "Research-focused master's programme", icon: BeakerIcon },
        { id: "phd", label: "Ph.D.", to: "/programmes/phd", description: "Doctoral research programme", icon: TrophyIcon },
      ],
    },
  ],

  people: [
    {
      heading: "Department",
      items: [
        { id: "faculty", label: "Faculty", description: "Meet our professors", icon: UserGroupIcon },
        { id: "staff", label: "Staff", description: "Administrative and technical team", icon: IdentificationIcon },
        { id: "students", label: "Students", to: "/people/students", description: "Current students", icon: UsersIcon },
        { id: "alumni", label: "Alumni", to: "/people/alumni", description: "Where our graduates are now", icon: AcademicCapIcon },
      ],
    },
    {
      heading: "Scholars",
      items: [
        { id: "phd-scholars", label: "PhD Scholars", description: "Current doctoral researchers", icon: BeakerIcon },
        { id: "graduated-scholars", label: "Graduated Scholars", description: "Our Ph.D. graduates", icon: TrophyIcon },
        { id: "former-members", label: "Former Members", description: "Past faculty and staff", icon: ArchiveBoxIcon },
      ],
    },
  ],

  research: [
    {
      heading: "Research",
      items: [
        { id: "research-areas", label: "Areas", to: "/research/research-areas", description: "Focus areas of the department", icon: CpuChipIcon },
        { id: "labs", label: "Labs", description: "Research laboratories", icon: BeakerIcon },
        { id: "research-projects", label: "Projects", description: "Ongoing and funded projects", icon: FolderOpenIcon },
      ],
    },
  ],
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    to: "/academics",
    label: "Academics",
    columns: sectionLinks.academics,
  },
  {
    to: "/programmes/btech",
    activePrefix: "/programmes", // stays highlighted on every programme page
    label: "Programmes",
    columns: sectionLinks.programmes,
  },
  {
    to: "/people",
    label: "People",
    columns: sectionLinks.people,
  },
  {
    to: "/research",
    label: "Research",
    columns: sectionLinks.research,
  },
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

// The horizontal bar is used from the "lg" breakpoint (1024px) upwards.
// Below that (phones AND tablets) the menu opens as a stacked list.
const isDesktopWidth = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches;

function Navbar({ closeMenu, isMobileMenuOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownId = useId();
  const navRef = useRef(null);

  // Close dropdown on route / hash change
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname, location.hash]);

  // Close dropdown on Escape or click outside
  useEffect(() => {
    if (!openDropdown) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    const closeOnOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [openDropdown]);

  const linkClass = (active) =>
    `main-navigation-link flex items-center justify-start gap-1 px-5 py-3.5 text-sm text-white transition-colors duration-200 lg:h-full lg:justify-center lg:px-4 lg:py-0 ${
      active ? "main-navigation-link-active" : "hover:text-white"
    }`;

  // Hover opens the dropdown only for a mouse on a wide screen.
  // On touch screens the arrow button toggles it (avoids open-then-close).
  const handlePointerEnter = (event, item) => {
    if (item.columns && event.pointerType === "mouse" && isDesktopWidth()) {
      setOpenDropdown(item.label);
    }
  };

  const handlePointerLeave = (event, item) => {
    if (item.columns && event.pointerType === "mouse" && isDesktopWidth()) {
      setOpenDropdown(null);
    }
  };

  const isActiveItem = (item, isActive) =>
    isActive ||
    Boolean(
      item.activePrefix && location.pathname.startsWith(item.activePrefix)
    );

  const closeAll = () => {
    setOpenDropdown(null);
    closeMenu?.();
  };

  return (
    <nav
      ref={navRef}
      id="main-navigation"
      aria-label="Main navigation"
      className={`main-navigation fixed left-0 right-0 top-[70px] z-[100] bg-brand-600 shadow-none max-lg:bottom-0 max-lg:w-72 max-lg:max-w-[85vw] max-lg:overflow-y-auto max-lg:overflow-x-hidden max-lg:shadow-xl max-lg:transition-all max-lg:duration-300 max-lg:ease-out lg:absolute lg:h-[54px] lg:w-full ${
        isMobileMenuOpen ? "mobile-nav-open" : "mobile-nav-closed"
      }`}
    >
      <ul className="mx-auto flex flex-col bg-brand-600 lg:h-full lg:w-full lg:max-w-[1440px] lg:flex-row lg:items-stretch lg:justify-center">
        {navLinks.map((item) => (
          <li
            key={item.label}
            className="relative border-b border-white/10 last:border-b-0 lg:flex lg:h-full lg:items-stretch lg:border-b-0"
            onPointerEnter={(e) => handlePointerEnter(e, item)}
            onPointerLeave={(e) => handlePointerLeave(e, item)}
          >
            {item.columns ? (
              <div className="relative lg:flex lg:h-full">
                {/* Row: main link + arrow button */}
                <div className="relative flex items-stretch lg:h-full">
                  <NavLink
                    to={item.to}
                    onClick={closeAll}
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
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
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

                {/* Dropdown: stacked list below lg, compact floating card on lg+.
                    The wrapper's top padding (not margin) lets the mouse travel
                    from the link to the card without closing it. */}
                <div
                  id={`${dropdownId}-${item.label.toLowerCase()}`}
                  className="lg:absolute lg:left-1/2 lg:top-full lg:z-50 lg:w-max lg:-translate-x-1/2 lg:pt-2"
                  style={{
                    display: openDropdown === item.label ? "block" : "none",
                  }}
                >
                  <div className="lg:flex lg:gap-4 lg:rounded-2xl lg:bg-white lg:p-3 lg:shadow-xl lg:ring-1 lg:ring-black/5">
                    {item.columns.map((column) => (
                      <div key={column.heading} className="lg:w-72">
                        {/* Column heading (desktop only) */}
                        <p className="hidden px-3 pb-2 pt-1 text-sm font-semibold text-gray-900 lg:block">
                          {column.heading}
                        </p>

                        <div className="lg:space-y-1">
                          {column.items.map((section) => {
                            const Icon = section.icon;
                            return (
                              <NavLink
                                key={section.id}
                                // Programmes items have their own page path (section.to);
                                // the others still scroll to a #section on the same page.
                                to={section.to ?? `${item.to}#${section.id}`}
                                onClick={closeAll}
                                className="group block px-9 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-700 lg:flex lg:gap-3 lg:rounded-xl lg:p-3 lg:text-gray-900 lg:hover:translate-x-1 lg:hover:bg-brand-50 lg:hover:shadow-sm"
                              >
                                {Icon && (
                                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm transition-all duration-200 lg:flex lg:group-hover:scale-105 lg:group-hover:border-brand-600 lg:group-hover:bg-brand-600 lg:group-hover:text-accent">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                )}
                                <span className="block">
                                  <span className="block whitespace-nowrap transition-colors duration-200 lg:text-base lg:font-semibold lg:text-gray-900 lg:group-hover:text-brand-600">
                                    {section.label}
                                  </span>
                                  {section.description && (
                                    <span className="mt-0.5 hidden text-sm font-normal leading-snug text-gray-600 lg:block">
                                      {section.description}
                                    </span>
                                  )}
                                </span>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
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
                end={item.to === "/"}
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