import { lazy, Suspense, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import CourseTable from "../components/Programmes/CourseTable";
import BTechProgrammeCatalogue from "../components/Programmes/BTechProgrammeCatalogue";
import MTechCurriculum from "../components/Programmes/MTechCurriculum";
import DataTable from "../components/DataTable";
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

const courseworkColumns = [
	{
		id: "requirement",
		header: "Requirement",
		accessorFn: (item) =>
			`${item.title || ""} ${item.description || ""}`,
		cell: ({ row }) => (
			<>
				{row.original.title || "—"}
				{row.original.description ? (
					<p className="mt-1 text-xs leading-5 text-gray-500">
						{row.original.description}
					</p>
				) : null}
			</>
		),
	},
	{
		accessorKey: "value",
		header: "Credits / Value",
		cell: ({ getValue }) => (
			<span className="font-semibold text-brand-800">
				{getValue() || "—"}
			</span>
		),
	},
];

// Route labels are fallbacks only. Programme details come
// from the original Google Sheet.
const routeLabels = {
  btech: {
    title: "B.Tech. Programme Structure",
    level: "UG",
    eyebrow: "Undergraduate Programme",
    description:
      "The B.Tech. programme builds a strong foundation in computer science, combining core theory with hands-on learning across software, algorithms, and computer systems. Students develop the skills to understand, design, and build technology while exploring a broad range of areas in the field.",
  },
  mtech: {
    title: "M.Tech. Programme Structure",
    level: "PG",
    eyebrow: "Postgraduate Programme",
    description:
      "The M.Tech. programme deepens students’ expertise in computer science through advanced coursework and project-based learning. It offers opportunities to explore areas such as algorithms, artificial intelligence, data science, networks, and systems while developing the ability to tackle challenging technical problems.",
  },
  "mtech-research": {
    title: "M.Tech. with Research Programme Structure",
    level: "PG",
    eyebrow: "Postgraduate Research Programme",
    description:
      "The M.Tech. with Research programme combines advanced study in computer science with sustained, supervised research. Students develop research methods, investigate a focused problem, and contribute original work under the guidance of a faculty advisor.",
  },
};

const programmeTitles = {
  btech: "B.Tech. Programme Structure",
  mtech: "M.Tech. Programme Structure",
  "mtech-research": "M.Tech. with Research Programme Structure",
  phd: "Ph.D. Programme Structure",
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

/* =========================================================
   PROGRAMME ADMISSION BROCHURES
   ========================================================= */

const PROGRAMME_BROCHURES = {
  "mtech-research": {
    title: "M.Tech. by Research Admission Brochure",
    session: "Spring 2026–27",
    fileName:
      "MTech-by-Research-Admission-Brochure-Spring-2026-27.pdf",
    fileUrl: `${
      import.meta.env.BASE_URL
    }MTech-by-Research-Admission-Brochure-Spring-2026-27.pdf`,
    description:
      "Official IIT Dharwad information brochure for M.Tech. by Research admissions, Spring 2026–27.",
  },

  phd: {
    title: "Ph.D. Admission Brochure",
    session: "Spring 2026–27",
    fileName:
      "PhD-Admission-Brochure-Spring-2026-27.pdf",
    fileUrl: `${
      import.meta.env.BASE_URL
    }PhD-Admission-Brochure-Spring-2026-27.pdf`,
    description:
      "Official IIT Dharwad information brochure for Ph.D. admissions, Spring 2026–27.",
  },
};

/* =========================================================
   COMMON EMPTY STATE
   ========================================================= */

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

/* =========================================================
   BROCHURE COMPONENT
   ========================================================= */

function ProgrammeBrochureSection({ programmeKey }) {
  const brochure = PROGRAMME_BROCHURES[programmeKey];

  if (!brochure) return null;

  return (
    <section className="mb-8 rounded-xl border border-brand-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
            <i
              className="fas fa-file-pdf text-xl"
              aria-hidden="true"
            />
          </span>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
              Official Admission Document · {brochure.session}
            </p>

            <h2 className="mt-1 text-lg font-bold text-gray-900">
              {brochure.title}
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              {brochure.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
          <a
            href={brochure.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            <i className="fas fa-eye" aria-hidden="true" />
            View brochure
          </a>

          <a
            href={brochure.fileUrl}
            download={brochure.fileName}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#19007B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#140063]"
          >
            <i
              className="fas fa-download"
              aria-hidden="true"
            />
            Download PDF
          </a>
        </div>
      </div>

      <details className="mt-5 border-t border-gray-100 pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-brand-800 marker:text-brand-700 hover:text-brand-950">
          Preview brochure on this page
        </summary>

        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <iframe
            title={brochure.title}
            src={`${brochure.fileUrl}#view=FitH&toolbar=1`}
            className="h-[65vh] min-h-[420px] w-full"
            loading="lazy"
          />
        </div>

        <p className="mt-2 text-xs text-gray-500">
          If the preview is not supported by your browser, use
          View brochure to open the PDF in a new tab or Download
          PDF to save it.
        </p>
      </details>
    </section>
  );
}

/* =========================================================
   PROGRAMME HERO
   ========================================================= */

function ProgrammeHero({
  programme,
  stats = [],
  isLoading = false,
}) {
  return (
    <section
      id="programmes-top"
      className="mb-8 w-full rounded-lg border border-gray-200 border-l-4 border-l-brand-800 bg-white px-6 py-7 md:px-8"
    >
      <p className="text-sm font-medium text-brand-800">
        {programme.eyebrow || "Academic Programme"}
      </p>

      <h1 className="mt-1 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
        {programme.title}

        {programme.subtitle ? (
          <span className="mt-1 block text-lg font-medium text-brand-800 md:text-xl">
            {programme.subtitle}
          </span>
        ) : null}
      </h1>

      {programme.description ? (
        <p className="mt-4 w-full max-w-4xl whitespace-pre-line text-base leading-7 text-gray-700">
          {programme.description}
        </p>
      ) : isLoading ? (
        <p className="mt-4 text-sm text-gray-500" role="status">
          Loading programme overview…
        </p>
      ) : null}

      {stats.length > 0 ? (
        <dl className="mt-5 flex flex-wrap gap-2 border-t border-gray-200 pt-4">
          {stats.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className="min-w-[7.5rem] rounded-lg border border-brand-100 bg-brand-50/80 px-3 py-2"
            >
              <dd className="text-2xl font-bold leading-tight text-brand-900">
                {stat.value || "—"}
              </dd>

              <dt className="mt-0.5 text-sm font-medium text-brand-700">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      ) : isLoading ? null : (
        <p className="mt-5 border-t border-gray-200 pt-4 text-sm text-gray-500">
          Programme statistics are not available yet.
        </p>
      )}
    </section>
  );
}

/* =========================================================
   PHD PAGE
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

  const resourceLinks = [
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
          title: programmeTitles.phd,
          eyebrow: data?.eyebrow || "Doctoral Programme",
          description:
            data?.overview ||
            (isLoading
              ? "Loading PhD programme information from the Google Sheet…"
              : "The Ph.D. programme prepares students for independent research and advanced careers in computer science. Through doctoral coursework and sustained research under faculty guidance, scholars investigate important problems and contribute original knowledge to the field."),
        }}
        stats={data?.stats || []}
        isLoading={isLoading}
      />

      {/* PhD admission brochure */}
      <ProgrammeBrochureSection programmeKey="phd" />

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

      {!isLoading && !isError && data?.rowCount === 0 ? (
        <div className="mb-8">
          {emptyState(
            "No PhD information found",
            "The connected PhD Google Sheet contains no data rows yet."
          )}
        </div>
      ) : null}

      {/* Coursework and Credits */}
      {data?.courseworkCredits?.length ? (
        <section className="mb-10">
          <DataTable
            columns={courseworkColumns}
            data={data.courseworkCredits}
            emptyMessage="No coursework credit details are available."
          />
        </section>
      ) : null}

      {/* Rules and Further Information */}
      <section className="mb-8">
        <div className="mb-5 border-b border-gray-200 pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
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
              className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-brand-800">
                {resource.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                {resource.description}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-800">
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
          className="inline-flex items-center rounded-md bg-[#19007B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#140063]"
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
      title: programmeTitles[key] || routeFallback.title,
      eyebrow:
        row?.eyebrow ||
        routeFallback.eyebrow ||
        inferredEyebrow,

      description:
        row?.description ||
        routeFallback.description ||
        "",

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

    // Use UG/PG only if the sheet has no Programme assignments.
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
        label: "Total Courses",
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

      {/* M.Tech with Research admission brochure */}
      {canonicalRouteKey === "mtech-research" && (
        <ProgrammeBrochureSection
          programmeKey="mtech-research"
        />
      )}

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

      {/* Eligibility */}
      {programme?.eligibility ? (
        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Eligibility
          </h2>

          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
            {programme.eligibility}
          </p>
        </section>
      ) : null}

      {/* Official programme link */}
      {programme?.officialLink ? (
        <section className="mb-8">
          {programme.officialLink.external ? (
            <a
              href={programme.officialLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-950"
            >
              Official programme information
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link
              to={programme.officialLink.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-950"
            >
              Programme information
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </section>
      ) : null}

      {/* Course catalogue */}
      {canonicalRouteKey === "btech" ? (
        <BTechProgrammeCatalogue />
      ) : null}
      {canonicalRouteKey === "mtech" ? <MTechCurriculum /> : null}

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
          Courses List
        </h2>
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