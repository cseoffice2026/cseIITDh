import { useMemo, useState } from "react";

/**
 * Responsive course table.
 * Columns: Sl. No | Course Code | Course Name | L-T-P-C
 */
export default function CourseTable({ courses = [] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return courses;

    return courses.filter((course) =>
      `${course.newCode || ""} ${course.name || ""}`
        .toLowerCase()
        .includes(q)
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
              <th className="w-14 px-4 py-3 font-semibold">
                Sl. No
              </th>

              <th className="whitespace-nowrap px-4 py-3 font-semibold">
                Course Code
              </th>

              <th className="px-4 py-3 font-semibold">
                Course Name
              </th>

              <th className="whitespace-nowrap px-4 py-3 font-semibold">
                L-T-P-C
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  {query.trim()
                    ? "No courses match your search."
                    : "No course data is available for this programme yet."}
                </td>
              </tr>
            ) : (
              filtered.map((course, index) => (
                <tr
                  key={`${course.newCode || ""}-${course.name || ""}-${index}`}
                  className="border-t border-gray-200 odd:bg-white even:bg-purple-50/60 hover:bg-purple-100/60"
                >
                  <td className="px-4 py-2.5 text-gray-500">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2.5 font-medium text-gray-900">
                    {course.newCode || "—"}
                  </td>

                  <td className="px-4 py-2.5 text-gray-800">
                    {course.name || "—"}

                    {course.remarks && (
                      <div className="mt-0.5 text-xs text-gray-500">
                        {course.remarks}
                      </div>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2.5 text-gray-800">
                    {course.ltpc || "—"}
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