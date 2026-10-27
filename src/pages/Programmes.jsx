import { lazy, Suspense, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import GlobalError from "../components/GlobalError";
import Loading from "../components/Loading";
import useCourses from "../hooks/useCourses";

const BackToTopButton = lazy(() => import("../components/BackToTopButton"));

// Serif font for the banner title and numbers.
// (Set inline because index.css forces Roboto on every element.)
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

// All programme pages are defined here. The key is the URL: /programmes/<key>
// level:    "UG" | "PG" -> shows the matching courses from the Excel sheet
//           null        -> no course data yet, shows a placeholder
// eyebrow:  small label above the title
// title / accent: banner heading (accent is shown in italics, in a lighter purple)
// intro:    2-3 line introduction
// semesters (optional): shown as a stat in the banner. Please verify these.
const programmes = {
  btech: {
    level: "UG",
    eyebrow: "Undergraduate Programme",
    title: "B.Tech",
    accent: "Computer Science",
    semesters: 8,
    intro:
      "The B.Tech programme in Computer Science and Engineering builds a strong foundation in programming, algorithms, computer systems and the theory of computing. Students can then specialise through electives, laboratories and projects.",
  },
  mtech: {
    level: "PG",
    eyebrow: "Postgraduate Programme",
    title: "M.Tech",
    accent: "Computer Science",
    semesters: 4,
    intro:
      "The M.Tech programme offers advanced coursework in areas such as algorithms, machine learning, computer networks and software systems, along with a technical project.",
  },
  "mtech-research": {
    level: null,
    eyebrow: "Postgraduate Programme",
    title: "M.Tech with",
    accent: "Research",
    intro:
      "The M.Tech with Research programme combines advanced coursework with research work carried out under the guidance of the department's faculty members. Detailed information about this programme will be added soon.",
  },
  phd: {
    level: null,
    eyebrow: "Doctoral Programme",
    title: "PhD",
    accent: "Research",
    intro:
      "The PhD programme is for students who wish to pursue in-depth research in computer science and engineering under the guidance of the department's faculty members. Detailed information about this programme will be added soon.",
  },
};

const isLab = (course) => /\blab/i.test(course.name);

/* ---------- Banner at the top of every programme page ---------- */
function ProgrammeHero({ programme, stats }) {
  return (
    <section
      id="programmes-top"
      className="relative mb-10 w-full overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 shadow-sm md:px-12 md:py-14"
    >
      {/* soft decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-purple-200/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-purple-100 blur-3xl"
      />

      <div className="relative w-full">
        {/* eyebrow */}
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-700">
          <span className="h-px w-8 bg-purple-700" />
          {programme.eyebrow}
        </div>

        {/* title */}
        <h1
          style={serif}
          className="mt-5 text-4xl font-bold leading-tight text-purple-950 md:text-6xl"
        >
          {programme.title}{" "}
          <span className="italic text-purple-600">{programme.accent}</span>
        </h1>

        {/* intro: width is set inline so it uses the full banner (up to 56rem) */}
        <p
          style={{ maxWidth: "56rem" }}
          className="mt-5 w-full text-base leading-8 text-gray-600 md:text-lg"
        >
          {programme.intro}
        </p>

        {/* stats */}
        {stats.length > 0 && (
          <>
            <div
              style={{ maxWidth: "28rem" }}
              className="mt-8 h-px w-full bg-purple-200"
            />
            <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd
                    style={serif}
                    className="text-3xl font-bold text-purple-700 md:text-4xl"
                  >
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- Course table (kept in this file) ---------- */
function CourseTable({ courses }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) =>
      `${c.newCode} ${c.oldCode} ${c.name}`.toLowerCase().includes(q)
    );
  }, [courses, query]);

  return (
    <div>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code or course name"
          aria-label="Search courses"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 sm:max-w-xs"
        />
        <span className="text-sm text-gray-500">
          {filtered.length} of {courses.length} courses
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="w-14 px-4 py-3 font-semibold">Sl. No</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">Course Code</th>
              <th className="px-4 py-3 font-semibold">Course Name</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">L-T-P-C</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">Previous Code</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No courses match your search.
                </td>
              </tr>
            ) : (
              filtered.map((c, i) => (
                <tr
                  key={`${c.newCode}-${c.oldCode}-${c.name}-${i}`}
                  className="border-t border-gray-200 odd:bg-white even:bg-purple-50/60 hover:bg-purple-100/60"
                >
                  <td className="px-4 py-2.5 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap text-gray-900">
                    {c.newCode || "—"}
                  </td>
                  <td className="px-4 py-2.5 text-gray-800">
                    {c.name}
                    {c.remarks && (
                      <div className="mt-0.5 text-xs text-gray-500">{c.remarks}</div>
                    )}
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-gray-800">
                    {c.ltpc || "—"}
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-gray-600">
                    {c.oldCode || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Programmes page (one component, four pages) ---------- */
export default function Programmes() {
  // The route is "/programmes/*", so the id is in the "*" param
  const params = useParams();
  const programmeId = (params["*"] ?? "").replace(/\/+$/, "");

  const { data: courses, isLoading, isError, error } = useCourses();

  const programme = programmes[programmeId];

  const programmeCourses = useMemo(
    () =>
      programme?.level
        ? (courses ?? []).filter((c) => c.level === programme.level)
        : [],
    [courses, programme]
  );

  // Banner numbers: semesters comes from the config above,
  // the course counts come from the Excel sheet.
  const stats = useMemo(() => {
    if (!programme) return [];
    const list = [];
    if (programme.semesters) {
      list.push({ label: "Semesters", value: programme.semesters });
    }
    if (programme.level) {
      list.push({ label: "Courses", value: programmeCourses.length });
      list.push({
        label: "Lab Courses",
        value: programmeCourses.filter(isLab).length,
      });
    }
    return list;
  }, [programme, programmeCourses]);

  // "/programmes" or an unknown URL such as "/programmes/abc" -> go to B.Tech
  if (!programme) return <Navigate to="/programmes/btech" replace />;

  if (isLoading) return <Loading />;
  if (isError) return <GlobalError error={error} />;

  return (
    <div className="px-4 py-6 md:px-8">
      <ProgrammeHero programme={programme} stats={stats} />

      {programme.level ? (
        <>
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-800">
            Courses
          </h2>
          <CourseTable courses={programmeCourses} />
        </>
      ) : (
        // Placeholder: replace this block when the data is ready
        <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-8 text-center text-gray-500">
          Details for this programme will be added soon.
        </div>
      )}

      <Suspense fallback={null}>
        <BackToTopButton to="programmes-top" />
      </Suspense>
    </div>
  );
}