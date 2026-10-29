import { lazy, Suspense, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import CourseTable from "../components/Programmes/CourseTable";
import Loading from "../components/Loading";
import useAcademicPrograms from "../hooks/useAcademicPrograms";
import useCourses from "../hooks/useCourses";
import {
  getProgrammeKey,
  getPhDProgrammePageData,
} from "../api/api";

const BackToTopButton = lazy(() =>
  import("../components/BackToTopButton")
);

const serif = {
  fontFamily: "Georgia, 'Times New Roman', serif",
};

// Route labels are fallbacks only. Programme details come
// from the original Google Sheet.
const routeLabels = {
  btech: {
    title: "BTech",
    level: "UG",
    eyebrow: "Undergraduate Programme",
  },
  mtech: {
    title: "MTech",
    level: "PG",
    eyebrow: "Postgraduate Programme",
  },
  "mtech-research": {
    title: "MTech with Research",
    level: "PG",
    eyebrow: "Postgraduate Research Programme",
  },
};

const prettifyRoute = (value) =>
  String(value ?? "")
    .split("-")
    .filter(Boolean)
    .map(
      (part) =>
        part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ");

const safeLink = (value) => {
  const candidate = String(value ?? "").trim();

  if (!candidate) return null;

  if (
    candidate.startsWith("/") &&
    !candidate.startsWith("//")
  ) {
    return {
      href: candidate,
      external: false,
    };
  }

  try {
    const parsed = new URL(candidate);

    if (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:"
    ) {
      return {
        href: parsed.href,
        external: true,
      };
    }
  } catch {
    // Ignore invalid URLs supplied by the sheet.
  }

  return null;
};

const isLab = (course) =>
  /\blab(?:oratory)?\b/i.test(course.name || "");

function EmptyState({
  title = "Information not available",
  children,
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-600">
      <p className="font-semibold text-gray-800">
        {title}
      </p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function ProgrammeHero({
  programme,
  stats = [],
  isLoading = false,
}) {
  return (
    <section
      id="programmes-top"
      className="relative mb-8 w-full overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-8 shadow-sm md:px-10 md:py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-purple-200/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-purple-100 blur-3xl"
      />

      <div className="relative w-full">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-700">
          <span className="h-px w-8 bg-purple-700" />
          {programme.eyebrow || "Academic Programme"}
        </div>

        <h1
          style={serif}
          className="mt-4 text-3xl font-bold leading-tight text-purple-950 md:text-5xl"
        >
          {programme.title}

          {programme.subtitle ? (
            <span className="ml-2 italic text-purple-600">
              {programme.subtitle}
            </span>
          ) : null}
        </h1>

        <p className="mt-4 w-full max-w-4xl whitespace-pre-line text-sm leading-7 text-gray-600 md:text-base">
          {programme.description ||
            (isLoading
              ? "Loading programme information from the Google Sheet…"
              : "Programme description is not available in the Google Sheet yet.")}
        </p>

        {stats.length > 0 ? (
          <>
            <div className="mt-7 h-px w-full max-w-2xl bg-purple-200" />

            <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`}>
                  <dd
                    style={serif}
                    className="text-3xl font-bold text-purple-700 md:text-4xl"
                  >
                    {stat.value || "—"}
                  </dd>

                  <dt className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </>
        ) : isLoading ? null : (
          <p className="mt-5 text-sm text-gray-500">
            Programme statistics are not available yet.
          </p>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   PHD PAGE — USES THE DEDICATED PHD GOOGLE SHEET
   ========================================================= */

function PhDOnHoldPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["phd-programme-page"],
    queryFn: getPhDProgrammePageData,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const emptyState = (title, message) => (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-gray-600">
        {message}
      </p>
    </div>
  );

  const renderCards = (items, emptyMessage) => {
    if (!items?.length) {
      return emptyState(
        "Information not available yet",
        emptyMessage
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={
              item.id ||
              `${item.title || item.label || "item"}-${index}`
            }
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-purple-200 hover:shadow-md"
          >
            <h3 className="text-base font-semibold text-gray-900">
              {item.title ||
                item.label ||
                `Item ${index + 1}`}
            </h3>

            {item.value ? (
              <p className="mt-2 text-sm font-semibold text-purple-800">
                {item.value}
              </p>
            ) : null}

            {item.description ? (
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            ) : null}

            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-purple-800 hover:text-purple-950"
              >
                Read more <span className="ml-1">↗</span>
              </a>
            ) : null}
          </article>
        ))}
      </div>
    );
  };

  const resourceLinks = [
    {
      title: "CSE Department — PhD Information",
      description:
        "Departmental PhD programme information, research areas, eligibility and selection procedures.",
      url: "https://cse.iitdh.ac.in/admissions",
      label: "Visit CSE Department",
    },
    {
      title: "IIT Dharwad — PhD Admissions",
      description:
        "PhD admission notices, application information and admission brochures.",
      url: "https://www.iitdh.ac.in/phd",
      label: "View PhD Admissions",
    },
    {
      title: "PhD Rules and Regulations",
      description:
        "Institute doctoral rulebook covering coursework, credit requirements and research regulations.",
      url: "https://www.iitdh.ac.in/sites/default/files/2026-02/PhD%20Rulebook%20_Rulebook_27Jul25%20%281%29_0.pdf",
      label: "Read PhD Rulebook",
    },
    {
      title: "Doctoral Programme — IIT Dharwad",
      description:
        "Institute doctoral programme information and regulations.",
      url: "https://www.iitdh.ac.in/doctoral-0",
      label: "Visit Doctoral Page",
    },
  ];

  return (
    <div className="px-4 py-6 md:px-8">
      <ProgrammeHero
        programme={{
          title: data?.title || "PhD",
          subtitle:
            data?.subtitle ||
            "Computer Science and Engineering",
          eyebrow:
            data?.eyebrow || "Doctoral Programme",
          description:
            data?.overview ||
            (isLoading
              ? "Loading PhD programme information from the Google Sheet…"
              : "The programme overview has not been added to the connected PhD Google Sheet yet."),
        }}
        stats={data?.stats || []}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="mb-8">
          <Loading />
        </div>
      ) : null}

      {isError ? (
        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
          <h2 className="text-sm font-semibold text-red-900">
            PhD information could not be loaded
          </h2>

          <p className="mt-1 text-sm leading-6 text-red-800">
            Check that the PhD Google Sheet is publicly readable
            and that its CSV export URL points to the correct tab.
          </p>

          {import.meta.env.DEV && error?.message ? (
            <p className="mt-2 break-words text-xs text-red-800">
              Details: {error.message}
            </p>
          ) : null}
        </div>
      ) : null}

      {!isLoading &&
      !isError &&
      data?.rowCount === 0 ? (
        <div className="mb-8">
          {emptyState(
            "No PhD information found",
            "The connected PhD Google Sheet contains no data rows yet."
          )}
        </div>
      ) : null}

      {/* Research areas */}
      <section className="mb-10">
        <div className="mb-5 border-b border-gray-200 pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
            Areas of Research
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900 md:text-2xl">
            Research Focus Areas
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Research topics and descriptions are loaded from
            the dedicated PhD Google Sheet.
          </p>
        </div>

        {renderCards(
          data?.researchAreas,
          "No research areas have been added to the PhD Google Sheet yet."
        )}
      </section>

      {/* Coursework and credits */}
      <section className="mb-10">
        <div className="mb-5 border-b border-gray-200 pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
            Academic Requirements
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900 md:text-2xl">
            Coursework and Credits
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Coursework requirements are shown only when they
            are present in the PhD sheet.
          </p>
        </div>

        {data?.courseworkCredits?.length ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[500px] border-collapse text-left text-sm">
              <thead className="bg-purple-800 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">
                    Requirement
                  </th>

                  <th className="px-4 py-3 font-semibold">
                    Credits / Value
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.courseworkCredits.map(
                  (item, index) => (
                    <tr
                      key={`${item.title || "requirement"}-${index}`}
                      className={`border-t border-gray-200 ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-purple-50/50"
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-800">
                        {item.title || "—"}

                        {item.description ? (
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            {item.description}
                          </p>
                        ) : null}
                      </td>

                      <td className="px-4 py-3 font-semibold text-purple-800">
                        {item.value || "—"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          emptyState(
            "Coursework information not available yet",
            "No coursework or credit requirements have been added to the connected sheet."
          )
        )}
      </section>

      {/* Research progress */}
      <section className="mb-10">
        <div className="mb-5 border-b border-gray-200 pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
            Doctoral Journey
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900 md:text-2xl">
            Research Progress and Completion
          </h2>
        </div>

        {renderCards(
          data?.researchStages,
          "No research milestones, thesis stages or defence information have been added yet."
        )}
      </section>

      {/* Admissions */}
      <section className="mb-10">
        <div className="mb-5 border-b border-gray-200 pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
            Prospective Candidates
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900 md:text-2xl">
            Admission and Selection
          </h2>
        </div>

        {renderCards(
          data?.admissions,
          "No eligibility, admission or selection information has been added to the connected sheet yet."
        )}
      </section>

      {/* Additional sections from the PhD sheet */}
      {data?.otherSections?.map((section) => (
        <section
          key={section.title}
          className="mb-10"
        >
          <div className="mb-5 border-b border-gray-200 pb-3">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
              {section.title}
            </h2>
          </div>

          {renderCards(
            section.items,
            "No entries are available in this section yet."
          )}
        </section>
      ))}

      {/* Rules and Further Information */}
      <section className="mb-8">
        <div className="mb-5 border-b border-gray-200 pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
            Official Resources
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900 md:text-2xl">
            Rules and Further Information
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Refer to the official institute and department websites
            for regulations, admission requirements and updates.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {resourceLinks.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-purple-800">
                {resource.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                {resource.description}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-800">
                {resource.label}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="flex justify-center py-4">
        <a
          href="#programmes-top"
          className="inline-flex items-center rounded-md bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-800"
        >
          Back to Top
        </a>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PROGRAMMES ROUTER
   ========================================================= */

export default function Programmes() {
  const params = useParams();

  const programmeId = String(params["*"] ?? "")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();

  const canonicalRouteKey =
    getProgrammeKey(programmeId) || programmeId;

  const isPhD = canonicalRouteKey === "phd";

  const {
    data: sheetProgrammes = [],
    isLoading: programmesLoading,
    isError: programmesError,
    error: programmesErrorDetails,
  } = useAcademicPrograms();

  const {
    data: courses = [],
    isLoading: coursesLoading,
    isError: coursesError,
    error: courseError,
  } = useCourses({
    enabled: !isPhD,
  });

  const sheetProgramme = useMemo(() => {
    if (isPhD) return null;

    return (
      sheetProgrammes.find((item) => {
        const keys = [
          item.routeKey,
          item.key,
          item.categoryKey,
          getProgrammeKey(item.name),
        ]
          .filter(Boolean)
          .map((value) => String(value).toLowerCase());

        return (
          keys.includes(canonicalRouteKey) ||
          keys.includes(programmeId)
        );
      }) || null
    );
  }, [
    sheetProgrammes,
    canonicalRouteKey,
    programmeId,
    isPhD,
  ]);

  const routeFallback = useMemo(
    () =>
      routeLabels[canonicalRouteKey] || {
        title: prettifyRoute(programmeId) || "Programme",
        level: "",
        eyebrow: "Academic Programme",
      },
    [canonicalRouteKey, programmeId]
  );

  const programme = useMemo(() => {
    if (isPhD) return null;

    const row = sheetProgramme;

    const rawLevel = String(
      row?.level ?? ""
    ).toUpperCase();

    const inferredLevel =
      /\bUG\b|UNDERGRADUATE/.test(rawLevel)
        ? "UG"
        : /\bPG\b|POSTGRADUATE/.test(rawLevel)
          ? "PG"
          : routeFallback.level;

    const key =
      row?.categoryKey ||
      getProgrammeKey(row?.name) ||
      canonicalRouteKey;

    const inferredEyebrow =
      key === "mtech-research"
        ? "Postgraduate Research Programme"
        : inferredLevel === "UG"
          ? "Undergraduate Programme"
          : inferredLevel === "PG"
            ? "Postgraduate Programme"
            : "Academic Programme";

    const semesterCount = Number(row?.semesters);

    const semesters =
      Number.isFinite(semesterCount) &&
      semesterCount > 0
        ? semesterCount
        : null;

    return {
      title: row?.name || routeFallback.title,
      subtitle: row?.subtitle || "",
      eyebrow:
        row?.eyebrow ||
        routeFallback.eyebrow ||
        inferredEyebrow,
      description: row?.description || "",
      duration: row?.duration || "",
      semesters,
      level: inferredLevel,
      eligibility: row?.eligibility || "",
      officialLink: safeLink(row?.link),
      category: row?.category || "",
      hasSheetRecord: Boolean(row),
    };
  }, [
    isPhD,
    sheetProgramme,
    routeFallback,
    canonicalRouteKey,
  ]);

  const programmeKey =
    sheetProgramme?.categoryKey ||
    getProgrammeKey(sheetProgramme?.name) ||
    canonicalRouteKey;

  const programmeCourses = useMemo(() => {
    if (isPhD || !courses.length) return [];

    const hasProgrammeAssignments = courses.some(
      (course) => course.programmeName
    );

    const exactMatch = courses.filter((course) => {
      const key =
        course.programmeKey ||
        course.programmeRouteKey;

      return (
        key &&
        String(key).toLowerCase() ===
          String(programmeKey).toLowerCase()
      );
    });

    if (exactMatch.length > 0) return exactMatch;

    // Use UG/PG only if the sheet has no programme assignments.
    if (!hasProgrammeAssignments && programme?.level) {
      return courses.filter(
        (course) => course.level === programme.level
      );
    }

    return [];
  }, [
    isPhD,
    courses,
    programmeKey,
    programme?.level,
  ]);

  const stats = useMemo(() => {
    if (!programme) return [];

    const result = [];

    if (programme.duration) {
      result.push({
        label: "Duration",
        value: programme.duration,
      });
    } else if (programme.semesters) {
      result.push({
        label: "Semesters",
        value: programme.semesters,
      });
    }

    if (
      !coursesLoading &&
      !coursesError &&
      programmeCourses.length > 0
    ) {
      result.push({
        label: "Catalogue Courses",
        value: programmeCourses.length,
      });

      result.push({
        label: "Lab Courses",
        value: programmeCourses.filter(isLab).length,
      });
    }

    return result;
  }, [
    programme,
    programmeCourses,
    coursesLoading,
    coursesError,
  ]);

  // PhD uses its dedicated Google Sheet.
  // All other programme pages use the original programme sheet.
  if (isPhD) {
    return <PhDOnHoldPage />;
  }

  const programmeNotFound =
    !programmesLoading &&
    !programmesError &&
    !sheetProgramme;

  const courseHeading =
    sheetProgramme?.shortName ||
    sheetProgramme?.name ||
    routeFallback.title;

  return (
    <div className="px-4 py-6 md:px-8">
      <ProgrammeHero
        programme={programme}
        stats={stats}
        isLoading={programmesLoading}
      />

      {programmesError ? (
        <section className="mb-6">
          <EmptyState title="Programme information could not be loaded">
            Check that the original Google Sheet is publicly readable
            and that its CSV export URL is correct.

            {import.meta.env.DEV &&
            programmesErrorDetails?.message
              ? ` Details: ${programmesErrorDetails.message}`
              : ""}
          </EmptyState>
        </section>
      ) : programmeNotFound ? (
        <section className="mb-6">
          <EmptyState title="No programme record was found">
            There is no matching programme row for “
            {routeFallback.title}” in the connected Google Sheet.
            Check the Programme/Program column in the sheet.
          </EmptyState>
        </section>
      ) : null}

      <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Eligibility
        </h2>

        {programme?.eligibility ? (
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
            {programme.eligibility}
          </p>
        ) : (
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Eligibility information is not available yet.
          </p>
        )}
      </section>

      <section className="mb-8">
        {programme?.officialLink ? (
          programme.officialLink.external ? (
            <a
              href={programme.officialLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-800 hover:text-purple-950"
            >
              Official programme information
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link
              to={programme.officialLink.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-800 hover:text-purple-950"
            >
              Programme information
              <span aria-hidden="true">→</span>
            </Link>
          )
        ) : (
          <p className="text-sm text-gray-500">
            An official programme information link is not available yet.
          </p>
        )}
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2 border-b border-gray-200 pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
              {courseHeading} Course Catalogue
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Course names, codes, credits and proposed UG/PG levels
              are fetched from the Google Sheet.
            </p>
          </div>

          <span className="text-xs text-gray-500">
            Data source: Google Sheet
          </span>
        </div>

        {coursesLoading ? (
          <Loading />
        ) : coursesError ? (
          <EmptyState title="Course information could not be loaded">
            {courseError?.message ||
              "Check that the Google Sheet is publicly readable and contains course rows."}
          </EmptyState>
        ) : programmeCourses.length > 0 ? (
          <CourseTable courses={programmeCourses} />
        ) : (
          <EmptyState title="No course data is available for this programme">
            The Google Sheet does not currently contain course rows
            mapped to “{courseHeading}”. Add a Programme value to
            the relevant course rows, or check the Proposed Level
            (UG/PG) values if using a general UG/PG catalogue.
          </EmptyState>
        )}
      </section>

      <Suspense fallback={null}>
        <BackToTopButton to="programmes-top" />
      </Suspense>
    </div>
  );
}