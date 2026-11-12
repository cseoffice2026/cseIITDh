import React from 'react';
import DataTable from "../components/DataTable";
import poster from "../content/cse-conclave.jpeg";

const eventSchedule = [
	{ date: "7 March 2026", time: "9:30 – 10:00 AM", speaker: "Registration and Opening Remarks", title: "—" },
	{ date: "7 March 2026", time: "10:00 – 11:00 AM", speaker: "Dr. Naveen Sivadasan", title: "Biological Data Analysis with Applications in Medicine" },
	{ date: "7 March 2026", time: "11:00 – 11:15 AM", speaker: "Switching / Buffer Time", title: "—" },
	{ date: "7 March 2026", time: "11:15 – 12:15 PM", speaker: "Prof. N. R. Aravind", title: "Algorithms Using Predictions" },
	{ date: "7 March 2026", time: "12:15 – 2:00 PM", speaker: "Lunch Break", title: "—" },
	{ date: "7 March 2026", time: "2:00 – 3:00 PM", speaker: "Mr. Mehul Jain", title: "Building Smart Agents with MCP and SSH" },
	{ date: "7 March 2026", time: "3:00 – 3:15 PM", speaker: "Switching / Buffer Time", title: "—" },
	{ date: "7 March 2026", time: "3:15 – 4:15 PM", speaker: "Dr. Ashish Mishra", title: "Revolution of Limited Supervision in Computer Vision" },
	{ date: "7 March 2026", time: "4:15 – 5:15 PM", speaker: "Tea Break-cum-Poster Session", title: "—" },
	{ date: "7 March 2026", time: "5:15 – 6:15 PM", speaker: "Sushim Shrivastava", title: "Constrained Compute: Challenges and Opportunities" },
	{ date: "8 March 2026", time: "9:00 – 10:00 AM", speaker: "Prof. Hema Murthy", title: "Beyond Backpropagation: Exact and Random Feedback Alignment" },
	{ date: "8 March 2026", time: "10:00 – 10:15 AM", speaker: "Switching / Buffer Time", title: "—" },
	{ date: "8 March 2026", time: "10:15 – 11:15 AM", speaker: "Dr. Chitradeep M", title: "Building the AI-Native 6G Era" },
	{ date: "8 March 2026", time: "11:15 – 11:45 AM", speaker: "Tea Break", title: "—" },
	{ date: "8 March 2026", time: "11:45 – 12:45 PM", speaker: "Prof. Amit Awekar", title: "Model Compression" },
	{ date: "8 March 2026", time: "12:45 – 2:00 PM", speaker: "Lunch Break", title: "—" },
	{ date: "8 March 2026", time: "2:00 – 3:00 PM", speaker: "Mr. Himanshu Gautam", title: "Blockchain Security: From Foundations to Post-Quantum Resilience" },
	{ date: "8 March 2026", time: "3:00 – 3:30 PM", speaker: "Tea Break", title: "—" },
];

const eventScheduleColumns = [
	{ accessorKey: "date", header: "Date" },
	{ accessorKey: "time", header: "Time" },
	{ accessorKey: "speaker", header: "Speaker / Session" },
	{ accessorKey: "title", header: "Title" },
];

const CseConclave = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-amber-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-brand-100 p-6 sm:p-8 md:p-12 space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            CSE Conclave <span className="text-brand-600">2026</span>
          </h1>

          <p className="uppercase tracking-wider text-brand-600 text-xs sm:text-sm font-medium">
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
                  7–8 March 2026
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="uppercase tracking-wider text-xs text-gray-500">
                  Venue
                </span>
                <span className="font-medium text-gray-900 text-right max-w-md">
                  106, 1st Floor, Central Learning Theatre, IIT Dharwad
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
                  Last Date
                </span>
                <span className="font-semibold text-gray-900 text-right">
                  4 March 2026
                </span>
              </div>

            </div>

          </div>
        </div>
        {/* About */}
        <div className="bg-brand-50 rounded-lg p-5 sm:p-6 text-gray-700 text-sm sm:text-base leading-relaxed">
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
                  className="font-medium text-brand-600 hover:underline"
                >
                 Prof. N. R. Aravind
                </a>{" "}
              – IIT Hyderabad
              </li>

              <li>
                <a
                  href="https://www.cse.iitm.ac.in/~hema/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                  Prof. Hema Murthy
                </a>{" "}
                – IIT Madras
              </li>

              <li>
                <a
                  href="https://in.linkedin.com/in/naveen-sivadasan-b71027b2?trk=people-guest_people_search-card"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                  Dr. Naveen Sivadasan
                </a>{" "}
                – TCS Research Labs
              </li>

              <li>
                 <a
                  href="https://www.iitg.ac.in/awekar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                  Prof. Amit Awekar
                </a>{" "}
                 – IIT Guwahati
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/ashish-mishra-bb378050/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                  Dr. Ashish Mishra
                </a>{" "}
                – HP R&D
              </li>

              <li>
                <a
                  href="https://in.linkedin.com/in/chitradeep-majumdar-27689113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                Dr. Chitradeep M </a>{" "} – Nokia
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/j13mehul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                  Mr. Mehul Jain
                </a>{" "}
                – Microsoft
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/sushim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                  Sushim Shrivastava
                </a>{" "}
                – Qualcomm
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/himanshu-gautam-69647289/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-600 hover:underline"
                >
                  Mr. Himanshu Gautam
                </a>{" "}
                – SecureDApp
              </li>

            </ul>
          </div>

          {/* RIGHT */}
          <div className="md:pl-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Focus Areas
            </h2>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li>Theoretical Computer Science</li>
              <li>Artificial Intelligence & Machine Learning</li>
              <li>Networks & Systems</li>
              <li>Industry Research & Innovation</li>
              <li>Emerging Technologies</li>
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

  <DataTable
    columns={eventScheduleColumns}
    data={eventSchedule}
    enableSorting={false}
    emptyMessage="No event schedule is available."
    searchPlaceholder="Search the event schedule..."
  />
</div>
        {/* CTA */}
        <div className="text-center pt-4">
          <a
            href=""
            className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#19007B] text-white rounded-lg font-medium shadow-md hover:bg-[#140063] transition"
          >
            Registration Closed
        </a>

          <p className="text-xs text-gray-500 mt-3">
            Limited seats • Early registration recommended
          </p>
        </div>

      </div>
    </div>
  );
};

export default CseConclave;