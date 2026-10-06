import React from 'react';
import { lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCseConclaveSchedule } from "../api/api";
import poster from "../content/conclave2_0.png";
const fallback = (
  <div className="text-center py-8 text-gray-400">Loading...</div>
);

const CseConclave = () => {
  const {
    data: schedule = [],
    error: scheduleError,
    isError: scheduleHasError,
    isLoading: scheduleIsLoading,
    refetch: refetchSchedule,
  } = useQuery({
    queryKey: ["cse-conclave-schedule"],
    queryFn: getCseConclaveSchedule,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-purple-100 p-6 sm:p-8 md:p-12 space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            CSE Conclave <span className="text-purple-600">2026</span>
          </h1>

          <p className="uppercase tracking-wider text-purple-600 text-xs sm:text-sm font-medium">
            Exploring Frontiers in Computer Science
          </p>

          <p className="text-sm sm:text-base font-semibold text-gray-600">
            Department of Computer Science and Engineering <br />
            Indian Institute of Technology Dharwad
          </p>
        </div>
        {/* Poster */}
        <div className="flex justify-center">
          <img
            src={poster}
            alt="CSE Conclave 2026 Poster"
            className="w-full max-w-3xl rounded-xl shadow-lg border border-gray-200"
          />
        </div>
        {/* Important Information */}
        <div className="border-t border-b border-gray-200 py-8">

          <div className="max-w-5xl mx-auto px-4">

            {/* Heading LEFT aligned */}
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Important Information
            </h3>

            <div className="space-y-6 text-sm text-gray-700">

              <div className="flex justify-between items-start">
                <span className="uppercase tracking-wider text-xs text-gray-500">
                  Dates
                </span>
                <span className="font-medium text-gray-900 text-right">
                  10-11 October 2026
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="uppercase tracking-wider text-xs text-gray-500">
                  Venue
                </span>
                <span className="font-medium text-gray-900 text-right max-w-md">
                  107, 1st Floor, Central Learning Theatre, IIT Dharwad
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="uppercase tracking-wider text-xs text-gray-500">
                  Registration
                </span>
                <span className="font-semibold text-gray-900 text-right">
                  Free
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="uppercase tracking-wider text-xs text-gray-500">
                  Last Date For  Registration
                </span>
                <span className="font-semibold text-gray-900 text-right">
                  8 October 2026
                </span>
              </div>

            </div>

          </div>
        </div>
        {/* About */}
        <div className="bg-purple-50 rounded-lg p-5 sm:p-6 text-gray-700 text-sm sm:text-base leading-relaxed">
          CSE Conclave 2026 is a two-day technical gathering bringing together
          eminent academicians, industry leaders, and researchers from premier
          institutions and global organizations. The conclave fosters dialogue,
          collaboration, and knowledge exchange across cutting-edge domains of
          Computer Science and Engineering.
        </div>

        {/* Speakers + Domains */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* LEFT */}
          <div className="md:pr-8 md:border-r md:border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Distinguished Speakers
            </h2>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">

              <li>
                        
                 <a
                  href="https://people.iith.ac.in/aravind/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                 Prof. Hemangee Kapoor





                </a>{" "}
              – IIT Guwahati
              </li>

              <li>
                <a
                  href="https://www.cse.iitm.ac.in/~hema/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Prof. Dipti Prasad Mukherjee
                </a>{" "}
                – ISI-Kolkata
              </li>

              <li>
                <a
                  href="https://in.linkedin.com/in/naveen-sivadasan-b71027b2?trk=people-guest_people_search-card"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Dr. Karthik Ramachandra
                </a>{" "}
                – Microsoft Research 
              </li>

              <li>
                 <a
                  href="https://www.iitg.ac.in/awekar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Dr. Padmanabha Sheshadri
                </a>{" "}
                 – IBM
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/ashish-mishra-bb378050/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Dr. Kumar Madhukar
                </a>{" "}
                – IIT Delhi
              </li>

              <li>
                <a
                  href="https://in.linkedin.com/in/chitradeep-majumdar-27689113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                Dr. Prabhuchandran K </a>{" "} – Adobe
              </li>

             
            </ul>
          </div>

          {/* RIGHT */}
          <div className="md:pl-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Focus Areas
            </h2>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li>Computer Architecture</li>
              <li>Artificial Intelligence & Machine Learning</li>
              <li>DBMS</li>
              <li>Machine Learning, Cloud Computing</li>
              <li>Formal verification (AI, ML, Logic)</li>
              <li>Reinforcement Learning</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-8 mb-4">
              Who Can Attend
            </h2>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li>UG / PG Students</li>
              <li>Research Scholars</li>
              <li>Faculty Members</li>
              <li>Industry Professionals</li>
            </ul>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-amber-50 rounded-lg p-5 sm:p-6 text-sm sm:text-base text-gray-700">
          <h3 className="font-semibold mb-3">
            What You Will Gain
          </h3>
          <ul className="space-y-1">
            <li>• Insightful talks from leading experts</li>
            <li>• Exposure to real-world industry challenges</li>
            <li>• Networking opportunities</li>
          </ul>
        </div>
        {/* Schedule */}
        <div className="border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Event Schedule
          </h2>

          {scheduleIsLoading ? (
            <p className="py-8 text-center text-gray-500" role="status">
              Loading event schedule...
            </p>
          ) : scheduleHasError ? (
            <div className="py-6 text-center text-red-700" role="alert">
              <p>
                Unable to load the event schedule
                {scheduleError instanceof Error ? `: ${scheduleError.message}` : "."}
              </p>
              <button
                type="button"
                onClick={() => refetchSchedule()}
                className="mt-3 rounded-md bg-purple-700 px-4 py-2 text-white hover:bg-purple-800"
              >
                Try again
              </button>
            </div>
          ) : schedule.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No schedule details are available yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-purple-50 text-gray-700 uppercase text-xs tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3">Date</th>
                    <th scope="col" className="px-4 py-3">Time</th>
                    <th scope="col" className="px-4 py-3">Duration (Min)</th>
                    <th scope="col" className="px-4 py-3">Particulars</th>                  
                    <th scope="col" className="px-4 py-3">Title &amp; Abstract</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schedule.map((item, index) => (
                    <tr
                      key={`${item.date}-${item.startTime}-${index}`}
                      className="odd:bg-gray-50"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">{item.date || "—"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.startTime || item.endTime
                          ? `${item.startTime || "—"} – ${item.endTime || "—"}`
                          : "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.duration || "—"}</td>
                      <td className="px-4 py-3">{item.particulars || "—"}</td>
                     
                      <td className="px-4 py-3">{item.titleAndAbstract || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* CTA */}
        <div className="text-center pt-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeOFteVo1GLJ8zG0yIN-83w3pY-FxsZ4Cam8kRyWSrfhRtfAQ/viewform?usp=publish-editor"
            className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 bg-purple-700 text-white rounded-lg font-medium shadow-md hover:bg-purple-800 transition"
          >
            Register
        </a>

          <p className="text-xs text-gray-500 mt-3">
            Limited seats • Early registration recommended. <b> Last Date for Registration: <span className="font-bold" style={{ color: 'red' }}>8 October 2026</span></b>
          </p>
        </div>

      </div>
    </div>
  );
};

export default CseConclave;