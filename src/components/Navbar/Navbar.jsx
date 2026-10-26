import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
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

const defaultProgrammeLinks = [
  {
    id: "btech",
    label: "BTech",
    icon: "fa-graduation-cap",
    to: "/admissions#btech",
  },
  {
    id: "mtech",
    label: "MTech",
    icon: "fa-university",
    to: "/admissions#mtech",
  },
  {
    id: "mtech-research",
    label: "MTech by Research",
    icon: "fa-microscope",
    to: "/admissions#ms",
  },
  {
    id: "phd",
    label: "PhD",
    icon: "fa-flask",
    to: "/admissions#phd",
  },
];

const getProgrammeCategory = (name = "") => {
  const normalized = String(name)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  if (
    /m\.?\s?tech.*research|research.*m\.?\s?tech|mfr|ms\.?\s?by research|mtech with research/.test(
      normalized,
    )
  ) {
    return "mtech-research";
  }

  if (/ph\.?\s?d|doctor/.test(normalized)) return "phd";
  if (/m\.?\s?tech|master/.test(normalized)) return "mtech";
  if (/b\.?\s?tech|bachelor|undergraduate/.test(normalized)) {
    return "btech";
  }

  return null;
};

// Accept safe website URLs or same-site absolute paths from the sheet.
const getSafeProgrammeTarget = (value) => {
  if (!value || typeof value !== "string") return null;

  const markdownUrl = value.match(
    /\[[^\]]*\]\((https?:\/\/[^)]+)\)/i,
  );
  const foundUrl = value.match(/https?:\/\/[^\s)]+/i);
  const candidate = (
    markdownUrl?.[1] ||
    foundUrl?.[0] ||
    value
  ).trim();

  if (/^https?:\/\//i.test(candidate)) {
    try {
      const url = new URL(candidate);

      if (url.protocol === "http:" || url.protocol === "https:") {
        return { href: url.href, external: true };
      }
    } catch {
      return null;
    }
  }

  if (candidate.startsWith("/") && !candidate.startsWith("//")) {
    return { href: candidate, external: false };
  }

  return null;
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    to: "/academics",
    label: "Academics",
    sections: sectionLinks.academics,
  },

  // New Programmes dropdown
  {
    to: "/admissions",
    label: "Programmes",
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

function Navbar({ closeMenu, isMobileMenuOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const { data: programmes = [] } = useAcademicPrograms();

  // Use programme links from the sheet when available.
  // Otherwise, fall back to the existing Admissions sections.
  const programmeSections = useMemo(
    () =>
      defaultProgrammeLinks.map((defaultItem) => {
        const matchingProgramme = programmes.find(
          (programme) =>
            getProgrammeCategory(programme?.name) === defaultItem.id,
        );

        const sheetTarget = getSafeProgrammeTarget(
          matchingProgramme?.link,
        );

        return {
          ...defaultItem,
          ...(sheetTarget?.external
            ? {
                href: sheetTarget.href,
                external: true,
              }
            : sheetTarget?.href
              ? { to: sheetTarget.href }
              : {}),
        };
      }),
    [programmes],
  );

  const linkClass = (active) =>
    `flex items-center justify-center px-4 py-3 text-sm font-semibold transition-colors ${
      active
        ? "bg-purple-950 text-white"
        : "text-purple-50 hover:bg-purple-900 hover:text-white"
    }`;

  const closeDropdown = () => setOpenDropdown(null);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 right-0 top-[70px] z-[100] bg-purple-800 shadow-sm ${
        isMobileMenuOpen ? "block" : "hidden sm:block"
      }`}
    >
      <ul className="mx-auto flex max-w-7xl flex-col sm:flex-row sm:items-stretch sm:justify-center">
        {navLinks.map((item) => {
          const dropdownItems = item.programmeMenu
            ? programmeSections
            : item.sections;

          const hasDropdown = Array.isArray(dropdownItems);

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                if (hasDropdown) {
                  setOpenDropdown(item.label);
                }
              }}
              onMouseLeave={() => {
                if (hasDropdown) {
                  closeDropdown();
                }
              }}
              onFocus={() => {
                if (hasDropdown) {
                  setOpenDropdown(item.label);
                }
              }}
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
                      `${linkClass(isActive)} flex-1`
                    }
                  >
                    {item.label}
                  </NavLink>

                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} dropdown`}
                    aria-expanded={openDropdown === item.label}
                    onClick={(event) => {
                      event.preventDefault();

                      setOpenDropdown((current) =>
                        current === item.label ? null : item.label,
                      );
                    }}
                    className="flex h-full items-center px-2 py-3 text-white hover:bg-purple-900"
                  >
                    <svg
                      aria-hidden="true"
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

                  <ul
                    className="absolute left-0 top-full min-w-[220px] overflow-hidden rounded-b-md bg-purple-800 py-1 shadow-lg"
                    style={{
                      display:
                        openDropdown === item.label ? "block" : "none",
                      zIndex: 9999,
                    }}
                  >
                    {dropdownItems.map((section) => (
                      <li key={section.id}>
                        {section.external ? (
                          <a
                            href={section.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              closeDropdown();
                              closeMenu?.();
                            }}
                            className="flex items-center whitespace-nowrap px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-900"
                          >
                            {item.programmeMenu && (
                              <span className="mr-3 inline-flex w-5 shrink-0 items-center justify-center text-purple-100">
                                <i
                                  aria-hidden="true"
                                  className={`fas ${section.icon || "fa-book-open"}`}
                                />
                              </span>
                            )}

                            {section.label}
                          </a>
                        ) : (
                          <NavLink
                            to={section.to || `${item.to}#${section.id}`}
                            onClick={() => {
                              closeDropdown();
                              closeMenu?.();
                            }}
                            className="flex items-center whitespace-nowrap px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-900"
                          >
                            {item.programmeMenu && (
                              <span className="mr-3 inline-flex w-5 shrink-0 items-center justify-center text-purple-100">
                                <i
                                  aria-hidden="true"
                                  className={`fas ${section.icon || "fa-book-open"}`}
                                />
                              </span>
                            )}

                            {section.label}
                          </NavLink>
                        )}
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
                  className={({ isActive }) => linkClass(isActive)}
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