import { lazy, Suspense } from "react";
import Section from "../Section";
import Loading from "../Loading";

const PDFViewer = lazy(() => import("../PDFViewer/PDFViewer"));

export default function TimeTableSection() {
  return (
    <Section id="timetable" title="Time Table">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">
          Current Semester Schedule
        </h3>
        <div className="mb-4">
          <p className="text-gray-600">
            Below is the timetable for the current semester. You can navigate
            through the pages, view details, and download the complete schedule.
          </p>
        </div>

        {/* PDF Viewer Component */}
        <div className="mt-6">
          <Suspense
            fallback={<Loading className="m-0 py-8" children="Loading timetable..." />}
          >
            <PDFViewer pdfFile="/timetable.pdf" />
          </Suspense>
        </div>

        {/* Fallback direct link */}
      <div className="mt-4 text-center">
  <p className="text-sm text-gray-500 mb-3">
    You can access the timetable here:
  </p>
  <a
    href="https://www.iitdh.ac.in/timetable-autumn-2026-27"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-4 py-2 bg-[#19007B] text-white text-sm font-medium rounded-lg shadow hover:bg-[#140063] transition"
  >
    Open Timetable
  </a>
</div>
      </div>
    </Section>
  );
}
