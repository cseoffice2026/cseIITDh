import { useState } from "react";
import Section from "../Section";
import { DIVISIONS } from "../../data/studentsData";
import { useStudentsData } from "../../hooks/useStudentsData";

export default function StudentsSection() {
  const [activeDivision, setActiveDivision] = useState(null);
  const {
    data: studentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useStudentsData();
  const students = activeDivision ? studentsData?.[activeDivision] || [] : [];

  return (
    <Section id="students" title="Students">
      <div className="flex flex-wrap gap-2 mb-6">
        {DIVISIONS.map((division) => (
          <button
            key={division.key}
            type="button"
            aria-pressed={activeDivision === division.key}
            onClick={() => setActiveDivision(division.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeDivision === division.key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {division.label}
          </button>
        ))}
      </div>

      {activeDivision ? (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-purple-800 text-xs uppercase text-white">
              <tr>
                <th className="px-4 py-3 w-16">S.No</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Roll Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                    Loading student list...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-red-600">
                    <p>Unable to load the student list: {error.message}</p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="mt-2 font-medium text-blue-700 underline hover:text-blue-900"
                    >
                      Try again
                    </button>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-400">
                    Student list coming soon.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr
                    key={student.rollNo}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.rollNo}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="py-6 text-center text-gray-500">
          Select a program to view its students.
        </p>
      )}
    </Section>
  );
}
