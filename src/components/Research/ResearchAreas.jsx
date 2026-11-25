import { useEffect, useRef, useState } from "react";
import useResearchAreas from "../../hooks/useResearchAreas";
import DepartmentHeading from "../DepartmentHeading";
import Loading from "../Loading";

const areaPalettes = [
  {
    type: "ml",
    image: "/research_areas/artificial-intelligence.jpeg",
    accent: "#7b3fbe",
    tint: "from-fuchsia-900/70",
  },
  {
    type: "sys",
    image: "/research_areas/systems.jpg",
    accent: "#5e2a9e",
    tint: "from-violet-900/70",
  },
  {
    type: "net",
    image: "/research_areas/networks.jpg",
    accent: "#43207a",
    tint: "from-indigo-900/70",
  },
  {
    type: "theory",
    image: "/research_areas/theoretical_computer_science_wallpaper.png",
    accent: "#8f50cf",
    tint: "from-purple-900/70",
  },
];

const getArtType = (area, index) => {
  const sector = area.sector.toLowerCase();

  if (/machine learning|artificial intelligence|\bai\b/.test(sector))
    return "ml";
  if (/network/.test(sector)) return "net";
  if (/theory|theoretical|algorithm|complexity|cryptograph/.test(sector))
    return "theory";
  if (/system/.test(sector)) return "sys";

  const description = (area.description || "").toLowerCase();

  if (
    /machine learning|artificial intelligence|\bai\b|language processing|computer vision/.test(
      description
    )
  )
    return "ml";
  if (/network|wireless|internet of things|\biot\b/.test(description))
    return "net";
  if (/theory|algorithm|complexity|cryptograph/.test(description))
    return "theory";
  if (
    /computing|system|architecture|compiler|database|operating system/.test(
      description
    )
  )
    return "sys";

  return areaPalettes[index % areaPalettes.length].type;
};

const getAreaVisual = (type) =>
  areaPalettes.find((palette) => palette.type === type) || areaPalettes[0];

const getResearchTopics = (description) =>
  (description || "")
    .split(/[,;\n]+/)
    .map((topic) => topic.trim())
    .filter(Boolean);

const stripTitle = (name) => name.replace(/^(prof(?:essor)?|dr)\.?\s+/i, "");

const getFacultyProfileSlug = (name) =>
  stripTitle(name)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const getInitials = (name) => {
  const parts = stripTitle(name).split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
};

const pad = (n) => String(n + 1).padStart(2, "0");

function SectionHeading({ children, count }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-5 w-1 rounded-full bg-purple-600" aria-hidden="true" />
      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-600">
        {children}
      </h3>
      {count !== undefined && (
        <span className="ml-auto rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
          {count}
        </span>
      )}
    </div>
  );
}

function ResearchAreas() {
  const {
    data: areas = [],
    isLoading,
    isError,
    error,
  } = useResearchAreas();

  const [selectedSector, setSelectedSector] = useState(null);
  const sectionRef = useRef(null);

  const selectedIndex = areas.findIndex(
    (area) => area.sector === selectedSector
  );
  const selectedArea = selectedIndex >= 0 ? areas[selectedIndex] : null;
  const selectedTopics = selectedArea
    ? getResearchTopics(selectedArea.description)
    : [];

  // Escape returns to the overview
  useEffect(() => {
    if (!selectedSector) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedSector(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedSector]);

  // Keep the section in view when switching between overview and detail
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedSector]);

  if (isLoading) {
    return (
      <Loading className="py-8" role="status">
        Loading research areas…
      </Loading>
    );
  }

  if (isError) {
    return (
      <section
        id="research-areas"
        className="mb-12"
        aria-labelledby="research-areas-title"
      >
        <DepartmentHeading
          as="h2"
          id="research-areas-title"
          title="Research Areas"
          className="mb-5"
        />
        <div
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"
          role="alert"
        >
          <p className="font-semibold">Research areas could not be loaded.</p>
          <p className="mt-1">
            {error?.message ||
              "Check the research areas API endpoint and try again."}
          </p>
        </div>
      </section>
    );
  }

  if (!areas.length) {
    return (
      <section
        id="research-areas"
        className="mb-12"
        aria-labelledby="research-areas-title"
      >
        <DepartmentHeading
          as="h2"
          id="research-areas-title"
          title="Research Areas"
          className="mb-5"
        />
        <p className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
          No research areas are currently listed in the connected sheet.
        </p>
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  DETAIL VIEW                                                      */
  /* ---------------------------------------------------------------- */
  if (selectedArea) {
    const visual = getAreaVisual(getArtType(selectedArea, selectedIndex));
    const faculty = selectedArea.facultyMembers || [];

    return (
      <section
        ref={sectionRef}
        id="research-areas"
        className="mb-12 scroll-mt-24"
        aria-labelledby="research-areas-title"
      >
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-purple-900/5">
          {/* Hero */}
          <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden sm:min-h-[400px]">
            <img
              src={visual.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"
              aria-hidden="true"
            /> 
            <div
              className={`absolute inset-0 bg-gradient-to-br ${visual.tint} via-transparent to-transparent`}
              aria-hidden="true"
            />

            {/* Top bar: back + counter */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
              <button
                type="button"
                onClick={() => setSelectedSector(null)}
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-sm font-medium !text-white backdrop-blur-md transition hover:bg-white hover:!text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-x-0.5"
                >
                  ←
                </span>
                All areas
              </button>

              <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-xs font-semibold tracking-widest !text-white/90 backdrop-blur-md">
                {pad(selectedIndex)} / {pad(areas.length - 1)}
              </span>
            </div>

            {/* Title block */}
            <div className="relative z-10 px-6 pb-8 pt-16 sm:px-10 sm:pb-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] !text-purple-200 sm:text-sm">
                Research Area
              </p>
              <h2
                id="research-areas-title"
                className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight !text-white sm:text-5xl lg:text-6xl"
                style={{
                  color: "#ffffff",
                  textShadow: "0 3px 18px rgba(0,0,0,0.6)",
                }}
              >
                {selectedArea.sector}
              </h2>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold !text-white backdrop-blur-md">
                  {selectedTopics.length}{" "}
                  {selectedTopics.length === 1 ? "topic" : "topics"}
                </span>
                <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold !text-white backdrop-blur-md">
                  {faculty.length}{" "}
                  {faculty.length === 1 ? "faculty member" : "faculty members"}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-5 lg:gap-12 lg:p-10">
            {/* Topics */}
            <div className="lg:col-span-2">
              <SectionHeading count={selectedTopics.length}>
                Focus topics
              </SectionHeading>

              {selectedTopics.length ? (
                <ul className="flex flex-wrap gap-2.5">
                  {selectedTopics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-xl border border-purple-100 bg-purple-50/70 px-4 py-2 text-sm font-medium leading-snug text-purple-900 transition hover:border-purple-300 hover:bg-purple-100"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base leading-7 text-gray-600">
                  No description is available yet.
                </p>
              )}
            </div>

            {/* Faculty */}
            <div className="lg:col-span-3">
              <SectionHeading count={faculty.length}>
                Faculty members
              </SectionHeading>

              {faculty.length ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {faculty.map((name) => {
                    const profilePath = `/user-profile/${getFacultyProfileSlug(
                      name
                    )}`;

                    return (
                      <li key={name}>
                        <a
                          href={`https://www.iitdh.ac.in${profilePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3.5 transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        >
                          <span
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{
                              background: `linear-gradient(135deg, ${visual.accent}, #a66ee0)`,
                            }}
                            aria-hidden="true"
                          >
                            {getInitials(name)}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-gray-900 group-hover:text-purple-800">
                              {name}
                            </span>
                            <span className="block text-xs text-gray-500">
                              View profile
                            </span>
                          </span>

                          <span
                            aria-hidden="true"
                            className="text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-purple-700"
                          >
                            ↗
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="rounded-2xl border border-dashed border-gray-300 p-5 text-sm text-gray-600">
                  Faculty members have not been listed for this area yet.
                </p>
              )}
            </div>
          </div>

          {/* Other areas */}
          {areas.length > 1 && (
            <div className="border-t border-gray-100 bg-gray-50/70 px-6 py-5 sm:px-8 lg:px-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                Explore other areas
              </p>
              <div className="flex flex-wrap gap-2">
                {areas
                  .filter((a) => a.sector !== selectedArea.sector)
                  .map((a) => (
                    <button
                      key={a.sector}
                      type="button"
                      onClick={() => setSelectedSector(a.sector)}
                      className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:border-purple-400 hover:bg-purple-50 hover:text-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                      {a.sector}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  OVERVIEW                                                         */
  /* ---------------------------------------------------------------- */
  return (
    <section
      ref={sectionRef}
      id="research-areas"
      className="mb-12 scroll-mt-24"
      aria-labelledby="research-areas-title"
    >
      <header className="mb-8 max-w-3xl">
        <DepartmentHeading
          as="h2"
          id="research-areas-title"
          title="Research Areas"
          className="mb-0"
        />
        <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
          Explore the department’s research sectors and meet the faculty
          working in each area.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {areas.map((area, index) => {
          const visual = getAreaVisual(getArtType(area, index));
          const topics = getResearchTopics(area.description);
          const facultyCount = area.facultyMembers?.length || 0;

          return (
            <button
              key={area.sector}
              type="button"
              onClick={() => setSelectedSector(area.sector)}
              style={{ borderColor: `${visual.accent}33` }}
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border bg-gray-900 p-0 text-left shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-900/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <img
                src={visual.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
                aria-hidden="true"
              />
              <span
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${visual.tint} via-transparent to-transparent opacity-80`}
                aria-hidden="true"
              />

              {/* Top row: index + faculty count */}
              <span className="relative z-10 flex items-start justify-between p-5 sm:p-6">
                <span className="text-sm font-bold tracking-[0.2em] text-white/80">
                  {pad(index)}
                </span>
                <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {facultyCount} faculty
                </span>
              </span>

              {/* Bottom content */}
              <span className="relative z-10 mt-auto flex w-full flex-col items-start p-5 pt-0 sm:p-6 sm:pt-0">
                <span className="block text-2xl font-bold leading-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.6)] sm:text-3xl">
                  {area.sector}
                </span>

                {topics.length > 0 && (
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md"
                      >
                        {topic}
                      </span>
                    ))}                  
                  </span>
                )}

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Explore area
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ResearchAreas;