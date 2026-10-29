import { useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import { getProgrammeKey } from "../../api/api";
import useAcademicPrograms from "../../hooks/useAcademicPrograms";

const sectionLinks = {
  academics: [
    { id: "timetable", label: "Time Table" },
    { id: "courses", label: "Courses" },
    { id: "curriculum", label: "Curriculum" },
    { id: "rules", label: "Academic Rules" },
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
  ],
};

// Keep the four required programme links available even when the
// Google Sheet is loading, unavailable, or has unrecognised headers.
const coreProgrammeLinks = [
  {
    id: "btech",
    label: "BTech",
    icon: "fa-graduation-cap",
    to: "/programmes/btech",
  },
  {
    id: "mtech",
    label: "MTech",
    icon: "fa-university",
    to: "/programmes/mtech",
  },
  {
    id: "mtech-research",
    label: "MTech with Research",
    icon: "fa-microscope",
    to: "/programmes/mtech-research",
  },
  {
    id: "phd",
    label: "PhD",
    icon: "fa-flask",
    to: "/programmes/phd",
  },
];

const programmeIcon = (key) => {
  if (key === "btech") return "fa-graduation-cap";
  if (key === "mtech") return "fa-university";
  if (key === "mtech-research") return "fa-microscope";
  if (key === "phd") return "fa-flask";

  return "fa-book-open";
};

const programmeKey = (programme) =>
  programme?.categoryKey ||
  getProgrammeKey(programme?.name) ||
  getProgrammeKey(programme?.shortName) ||
  getProgrammeKey(programme?.key) ||
  null;

function buildProgrammeLinks(academicProgrammes) {
  const sheetRows = Array.isArray(academicProgrammes)
    ? academicProgrammes
    : [];

  // Match sheet records to the four established programme routes.
  const sheetByCoreKey = new Map();

  for (const row of sheetRows) {
    const key = programmeKey(row);

    if (key && !sheetByCoreKey.has(key)) {
      sheetByCoreKey.set(key, row);
    }
  }

  // Always retain the four core navigation entries.
  // Spreadsheet values can update their display labels.
  const coreLinks = coreProgrammeLinks.map((base) => {
    const row = sheetByCoreKey.get(base.id);

    return {
      ...base,
      label:
        row?.shortName ||
        row?.menuLabel ||
        row?.displayName ||
        base.label,
    };
  });

  // Include additional programme records from the sheet without
  // duplicating BTech, MTech, MTech with Research, or PhD.
  const coreKeys = new Set(
    coreProgrammeLinks.map((item) => item.id),
  );

  const seenAdditional = new Set();
  const additionalLinks = [];

  sheetRows.forEach((row, index) => {
    const key = programmeKey(row);

    if (key && coreKeys.has(key)) {
      return;
    }

    const label =
      row?.shortName ||
      row?.menuLabel ||
      row?.displayName ||
      row?.name;

    const route =
      row?.route ||
      `/programmes/${row?.routeKey || row?.key || ""}`;

    if (!label || !route || route === "/programmes/") {
      return;
    }

    const identity = String(
      row?.routeKey || row?.key || label,
    ).toLowerCase();

    if (seenAdditional.has(identity)) {
      return;
    }

    seenAdditional.add(identity);

    additionalLinks.push({
      id: String(row?.id || identity || index),
      label,
      icon: programmeIcon(key),
      to: route,
    });
  });

  return [...coreLinks, ...additionalLinks];
}

function Navbar({ closeMenu, isMobileMenuOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const { data: academicProgrammes = [] } =
    useAcademicPrograms();

  const linkClass = (active) =>
    `flex items-center justify-center px-4 py-3 text-sm font-semibold transition-colors ${
      active
        ? "bg-purple-950 text-white"
        : "text-purple-50 hover:bg-purple-900 hover:text-white"
    }`;

  const closeDropdown = () => setOpenDropdown(null);

  const programmeLinks = buildProgrammeLinks(
    academicProgrammes,
  );

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    {
      to: "/academics",
      label: "Academics",
      sections: sectionLinks.academics,
    },
    {
      to: "/programmes/btech",
      label: "Programmes",
      sections: programmeLinks,
      programmeMenu: true,
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
    { to: "/join-as-faculty", label: "Join Us" },
    { to: "/contact", label: "Contact" },
    {
      href: "https://sites.google.com/iitdh.ac.in/cse/home",
      label: "Internal",
      external: true,
    },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 right-0 top-[70px] z-[100] bg-purple-800 shadow-sm ${
        isMobileMenuOpen ? "block" : "hidden sm:block"
      }`}
    >
      <ul className="mx-auto flex max-w-7xl flex-col sm:flex-row sm:items-stretch sm:justify-center">
        {navLinks.map((item) => {
          const hasDropdown = Array.isArray(item.sections);

          const isProgrammesRoute =
            item.label === "Programmes" &&
            location.pathname.startsWith("/programmes");

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() =>
                hasDropdown && setOpenDropdown(item.label)
              }
              onMouseLeave={() =>
                hasDropdown && closeDropdown()
              }
              onFocus={() =>
                hasDropdown && setOpenDropdown(item.label)
              }
            >
              {hasDropdown ? (
                <div className="relative flex items-center">
                  <NavLink
                    to={item.to}
                    onClick={() => {
                      closeMenu?.();
                      closeDropdown();
                    }}
                    className={({ isActive }) =>
                      `${linkClass(
                        isActive || isProgrammesRoute,
                      )} flex-1`
                    }
                  >
                    {item.label}
                  </NavLink>

                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} dropdown`}
                    aria-expanded={
                      openDropdown === item.label
                    }
                    onClick={(event) => {
                      event.preventDefault();

                      setOpenDropdown((current) =>
                        current === item.label
                          ? null
                          : item.label,
                      );
                    }}
                    className="flex h-full items-center px-2 py-3 text-white hover:bg-purple-900"
                  >
                    <svg
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.label
                          ? "rotate-180"
                          : ""
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

                  <ul
                    className="absolute left-0 top-full min-w-[220px] overflow-hidden rounded-b-md bg-purple-800 py-1 shadow-lg"
                    style={{
                      display:
                        openDropdown === item.label
                          ? "block"
                          : "none",
                      zIndex: 9999,
                    }}
                  >
                    {item.sections.map((section) => (
                      <li key={section.id || section.to}>
                        <NavLink
                          to={
                            section.to ||
                            `${item.to}#${section.id}`
                          }
                          onClick={() => {
                            closeDropdown();
                            closeMenu?.();
                          }}
                          className="flex items-center whitespace-nowrap px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-900"
                        >
                          {item.programmeMenu &&
                            section.icon && (
                              <span className="mr-3 inline-flex w-5 shrink-0 items-center justify-center text-purple-100">
                                <i
                                  aria-hidden="true"
                                  className={`fas ${section.icon}`}
                                />
                              </span>
                            )}

                          {section.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
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
                  className={({ isActive }) =>
                    linkClass(isActive)
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;