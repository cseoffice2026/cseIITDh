import { Link } from "react-router-dom";
import useAcademicPrograms from "../../hooks/useAcademicPrograms";

const fallbackHrefForProgram = (name = "") => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]+/g, "");

  if (/phd|doctor/.test(normalized)) {
    return "/admissions#phd";
  }

  if (
    /mtechbyresearch|mtr|msresearch|research.*mtech|mtech.*research/.test(
      normalized
    )
  ) {
    return "/admissions#ms";
  }

  if (/mtech|master/.test(normalized)) {
    return "/admissions#mtech";
  }

  if (/btech|bachelor|undergraduate/.test(normalized)) {
    return "/admissions#btech";
  }

  return "/admissions";
};

const getSafeHref = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  const candidate =
    value.trim().match(/https?:\/\/[^\s)]+/i)?.[0] ||
    value.trim();

  if (/^https?:\/\//i.test(candidate)) {
    try {
      const parsed = new URL(candidate);

      return parsed.protocol === "http:" ||
        parsed.protocol === "https:"
        ? parsed.href
        : "";
    } catch {
      return "";
    }
  }

  if (candidate.startsWith("/") && !candidate.startsWith("//")) {
    return candidate;
  }

  return "";
};

const getProgramIcon = (name = "") => {
  const normalized = name.toLowerCase();

  if (/phd|doctor/.test(normalized)) return "fa-flask";
  if (/research/.test(normalized)) return "fa-microscope";

  if (/b\.?\s?tech|bachelor|undergraduate/.test(normalized)) {
    return "fa-graduation-cap";
  }

  if (/m\.?\s?tech|master/.test(normalized)) {
    return "fa-laptop-code";
  }

  return "fa-book-open";
};

const ProgrammeCard = ({ programme }) => {
  const href =
    getSafeHref(programme.link) ||
    fallbackHrefForProgram(programme.name);

  const isExternal = /^https?:\/\//i.test(href);

  const facts = [
    ...new Set(
      [programme.duration, programme.category].filter(Boolean)
    ),
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-1.5 bg-purple-700" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          {programme.imageUrl && getSafeHref(programme.imageUrl) ? (
            <img
              src={getSafeHref(programme.imageUrl)}
              alt=""
              loading="lazy"
              className="h-12 w-12 rounded-xl object-cover"
            />
          ) : (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-800">
              <i
                aria-hidden="true"
                className={`fas ${getProgramIcon(programme.name)} text-xl`}
              />
            </span>
          )}

          {programme.level && (
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800">
              {programme.level}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold leading-snug text-gray-900">
          {programme.name}
        </h3>

        {programme.description && (
          <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
            {programme.description}
          </p>
        )}

        {facts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {facts.map((fact) => (
              <span
                key={fact}
                className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
              >
                {fact}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6">
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-800 transition-colors hover:text-purple-950"
            >
              Explore programme
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link
              to={href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-800 transition-colors hover:text-purple-950"
            >
              Explore programme
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

const ProgrammeSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
    {["one", "two", "three", "four"].map((item) => (
      <div
        key={item}
        className="h-56 animate-pulse rounded-xl bg-gray-200"
      />
    ))}
  </div>
);

export default function ProgramsSection() {
  const {
    data: programmes = [],
    isLoading,
    isError,
    error,
  } = useAcademicPrograms();

  return (
    <section
      id="academic-programmes"
      className="py-8 scroll-mt-[136px]"
    >
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
            Academics
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Academic Programmes
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Explore the academic programmes offered by the Department of
            Computer Science and Engineering.
          </p>
        </div>

        <Link
          to="/admissions"
          className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-purple-800 transition-colors hover:text-purple-950 sm:self-auto"
        >
          All Programmes
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {isLoading ? (
        <ProgrammeSkeleton />
      ) : isError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">
            Academic programmes are temporarily unavailable.
          </p>

          <p className="mt-1">
            Check that the Google Sheet is shared as “Anyone with the link —
            Viewer” or published to the web.
          </p>

          {import.meta.env.DEV && error?.message && (
            <p className="mt-2 break-words text-xs text-amber-800">
              Details: {error.message}
            </p>
          )}
        </div>
      ) : programmes.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {programmes.map((programme, index) => (
            <ProgrammeCard
              key={`${programme.id || programme.name}-${index}`}
              programme={programme}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-gray-100 p-5 text-sm text-gray-600">
          No academic programmes are currently listed.
        </p>
      )}
    </section>
  );
}