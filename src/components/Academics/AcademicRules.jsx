import useAcademicRules from "../../hooks/useAcademicRules";
import Section from "../Section";

const AcademicLoading = () => (
  <div className="flex justify-center items-center py-8">
    <div className="flex items-center space-x-3">
      <svg
        className="animate-spin h-5 w-5 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
      >
        <title>Loading</title>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-gray-700 text-base font-medium">
        Loading academic rules, please wait...
      </span>
    </div>
  </div>
);

const AcademicError = ({ error }) => (
  <div className="flex justify-center items-center py-8">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-3">
      <svg
        className="h-6 w-6 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Error"
      >
        <title>Error</title>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9l6 6m0-6l-6 6"
        />
      </svg>
      <div>
        <p className="text-red-700 font-semibold text-base mb-1">
          Unable to load academic rules
        </p>
        <p className="text-gray-700 text-sm">
          {error?.message
            ? `Details: ${error.message}`
            : "An unexpected error occurred. Please try again later or contact the Academic Office if the problem persists."}
        </p>
      </div>
    </div>
  </div>
);

export default function AcademicRules() {
  const { data: academicRules, isLoading, isError, error } = useAcademicRules();

  return (
    <Section id="rules" title="Academic Rules">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {isLoading && <AcademicLoading />}
        {isError && <AcademicError error={error} />}

        {academicRules && (
          <div className="space-y-6">
            {/* Attendance Requirements */}
            {academicRules.attendance_requirements && (
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {academicRules.attendance_requirements.heading}
                </h3>
                <p className="text-gray-700 mb-2">
                  {academicRules.attendance_requirements.description}
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <title>Medical Absence info</title>
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        {
                          academicRules.attendance_requirements
                            .medical_absences_note
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grading Policy */}
            {academicRules.grading_policy && (
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {academicRules.grading_policy.heading}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">
                          Grade
                        </th>
                        <th className="border border-gray-200 px-4 py-2">
                          Percentage Range
                        </th>
                        <th className="border border-gray-200 px-4 py-2">
                          Grade Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicRules.grading_policy.grades.map((gradeItem, index) => (
                        <tr key={index}>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            {gradeItem.grade}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {gradeItem.percentage_range}
                          </td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            {gradeItem.grade_points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Academic Integrity */}
            {academicRules.academic_integrity && (
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {academicRules.academic_integrity.heading}
                </h3>
                <p className="text-gray-700">
                  {academicRules.academic_integrity.description}
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  {academicRules.academic_integrity.consequences.map(
                    (consequence, index) => (
                      <li key={index}>{consequence}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="mt-4 text-center">

  <p className="text-sm text-gray-500 mb-3">
    NOTE - You can access the rulebook here. Rules in the rulebook are final in case of any discrepancy.
  </p>
  <a
    href="https://res.cloudinary.com/dncpxsaxa/image/upload/v1779210363/UG_Rulebook_v5_31Mar26_jkjtd0.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition"
  >
    Open Rulebook
  </a>
</div>
      </div>
    </Section>
  );
}
