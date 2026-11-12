import { useState } from "react";
import useResearchAreas from "../../hooks/useResearchAreas";
import Loading from "../Loading";

const areaPalettes = [
  { type: "ml", image: "/research_areas/artificial-intelligence.jpg", accent: "#0F766E" },
  { type: "sys", image: "/research_areas/systems.jpg", accent: "#456D9D" },
  { type: "net", image: "/research_areas/networks.jpg", accent: "#A65F76" },
  { type: "theory", image: "/research_areas/theoretical_computer_science_wallpaper.png", accent: "#92783A" },
];

const getArtType = (area, index) => {
  const sector = area.sector.toLowerCase();
  if (/machine learning|artificial intelligence|\bai\b/.test(sector)) return "ml";
  if (/network/.test(sector)) return "net";
  if (/theory|theoretical|algorithm|complexity|cryptograph/.test(sector)) return "theory";
  if (/system/.test(sector)) return "sys";

  const text = area.description.toLowerCase();
  if (/machine learning|artificial intelligence|\bai\b|language processing|computer vision/.test(text)) return "ml";
  if (/network|wireless|internet of things|\biot\b/.test(text)) return "net";
  if (/theory|algorithm|complexity|cryptograph/.test(text)) return "theory";
  if (/computing|system|architecture|compiler|database|operating system/.test(text)) return "sys";
  return areaPalettes[index % areaPalettes.length].type;
};

const getAreaVisual = (type) =>
  areaPalettes.find((palette) => palette.type === type) || areaPalettes[0];

const getResearchTopics = (description) =>
  description
    .split(/[,;\n]+/)
    .map((topic) => topic.trim())
    .filter(Boolean);

const getFacultyProfileSlug = (name) =>
  name
    .replace(/^(prof(?:essor)?|dr)\.?\s+/i, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

function ResearchAreas() {
  const { data: areas = [], isLoading, isError, error } = useResearchAreas();
  const [selectedSector, setSelectedSector] = useState(null);
  const selectedArea = areas.find((area) => area.sector === selectedSector);
  const selectedIndex = areas.findIndex((area) => area.sector === selectedSector);
  const selectedTopics = selectedArea ? getResearchTopics(selectedArea.description) : [];

  if (isLoading) {
    return (
      <Loading className="py-8" role="status">
        Loading research areas…
      </Loading>
    );
  }

  if (isError) {
    return (
      <section id="research-areas" className="mb-12" aria-labelledby="research-areas-title">
        <h2 id="research-areas-title" className="mb-5 text-2xl font-bold text-gray-900">
          Research Areas
        </h2>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800" role="alert">
          <p className="font-semibold">Research areas could not be loaded.</p>
          <p className="mt-1">
            {error?.message || "Check the research areas API endpoint and try again."}
          </p>
        </div>
      </section>
    );
  }

  if (!areas.length) {
    return (
      <section id="research-areas" className="mb-12" aria-labelledby="research-areas-title">
        <h2 id="research-areas-title" className="mb-5 text-2xl font-bold text-gray-900">
          Research Areas
        </h2>
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
          No research areas are currently listed in the connected sheet.
        </p>
      </section>
    );
  }

  return (
    <section id="research-areas" className="mb-12" aria-labelledby="research-areas-title">
      {selectedArea ? (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative flex min-h-80 flex-col justify-end overflow-hidden sm:min-h-96">
            <img
              src={getAreaVisual(getArtType(selectedArea, selectedIndex)).image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" aria-hidden="true" />
            <div className="relative z-10 px-6 py-6 sm:px-8 sm:py-8">
              <button
                type="button"
                onClick={() => setSelectedSector(null)}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/40 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span aria-hidden="true">←</span>
                Back
              </button>
              <p className="text-sm font-semibold text-white/90">Research areas</p>
              <h2 id="research-areas-title" className="mt-1 text-3xl font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.65)] sm:text-4xl">
                {selectedArea.sector}
              </h2>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                About this area
              </h3>
              {selectedTopics.length ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-gray-700">
                  {selectedTopics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              ) : (
                <p className="mt-3 text-base leading-7 text-gray-700">
                  No description is available yet.
                </p>
              )}
            </div>

            <div>
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Faculty members
                </h3>
                <span className="text-xs text-gray-500">
                  {selectedArea.facultyMembers.length}{" "}
                  {selectedArea.facultyMembers.length === 1 ? "member" : "members"}
                </span>
              </div>
              {selectedArea.facultyMembers.length ? (
                <ul className="list-disc space-y-2 pl-5 text-gray-800">
                  {selectedArea.facultyMembers.map((name) => {
                    const profilePath = `/user-profile/${getFacultyProfileSlug(name)}`;
                    return (
                      <li key={name}>
                        <a
                          href={`https://www.iitdh.ac.in${profilePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-brand-800 underline decoration-brand-300 underline-offset-2 hover:text-brand-950"
                        >
                          {name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">
                  Faculty members have not been listed for this area yet.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="mb-6 flex flex-col items-start gap-3">
            <div>              
              <h2 id="research-areas-title" className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Research Areas
              </h2>
            </div>
            <p className=" text-sm leading-6 text-gray-600 sm:text-base">
              Explore the department’s research sectors and meet the faculty working in each area.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2">
            {areas.map((area, index) => {
              const visual = getAreaVisual(getArtType(area, index));

              return (
                <button
                  key={area.sector}
                  type="button"
                  onClick={() => setSelectedSector(area.sector)}
                  style={{
                    borderColor: `${visual.accent}33`,
                  }}
                  className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border bg-white p-0 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  <img
                    src={visual.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                    aria-hidden="true"
                  />
                
                
                  <span className="relative z-10 mt-auto flex w-full flex-col items-start p-5 sm:p-6">
                    <span className="block text-2xl font-bold leading-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.65)] sm:text-3xl">
                      {area.sector}
                    </span>                    
                    <span className="mt-3 line-clamp-3 text-sm leading-6 text-white [text-shadow:0_1px_5px_rgba(0,0,0,0.75)]">
                      {(area.description || "Explore this research area and its faculty.").length > 150 ? `${(area.description || "Explore this research area and its faculty.").substring(0, 100)}...` : area.description || "Explore this research area and its faculty."}
                    </span>
                    
                     
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default ResearchAreas;
