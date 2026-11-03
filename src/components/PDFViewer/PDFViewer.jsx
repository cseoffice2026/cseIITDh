import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// import "./PDFViewer.css";
import { Document, Page, pdfjs } from "react-pdf";

import PDFErrorFallback from "./PDFErrorFallback";

// Set up the worker source for PDF.js (only once)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  // Get the absolute URL for the PDF file
  const absolutePdfUrl = pdfFile.startsWith("http")
    ? pdfFile
    : `${window.location.origin}${pdfFile}`;

  // Responsive width calculation
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // PDF load success
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  // PDF load error
  const onDocumentLoadError = useCallback((err) => {
    setLoading(false);
    setError(true);
    setUseFallback(true);
    if (import.meta.env.DEV) {
      console.error("Error loading PDF:", err);
    }
  }, []);

  // Navigation handlers
  const goToPreviousPage = useCallback(() => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);
  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => (prev < numPages ? prev + 1 : prev));
  }, [numPages]);
  const switchToFallback = useCallback(() => setUseFallback(true), []);

  // Fallback: object tag for best compatibility and minimal bundle
  if (useFallback) {
    return (
      <div className="pdf-viewer" ref={containerRef}>
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">
            Using simplified PDF viewer. For best experience, make sure you have
            a PDF viewer installed.
          </div>
        </div>
        <div
          className="object-container"
          style={{ width: "100%", height: "600px" }}
        >
          <object
            data={absolutePdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p>
              Your browser does not support embedded PDFs.
              <a
                href={absolutePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 ml-1"
              >
                Click here to download the PDF file.
              </a>
            </p>
          </object>
        </div>
        <div className="mt-4 text-center">
          <a
            href={absolutePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="Open PDF in New Tab"
            >
              <title>Open PDF in New Tab</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Open PDF in New Tab
          </a>
        </div>
      </div>
    );
  }

  // Error fallback
  if (error) {
    return <PDFErrorFallback pdfFile={absolutePdfUrl} />;
  }

  // Main PDF viewer with lazy loading for best performance
  return (
    <div className="pdf-viewer" ref={containerRef}>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      <div className="pdf-container">
        <Document
          file={absolutePdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="flex flex-col items-center"
          error={<PDFErrorFallback pdfFile={absolutePdfUrl} />}
          noData={<PDFErrorFallback pdfFile={absolutePdfUrl} />}
          loading={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          }
        >
          {numPages !== null && (
            <Page
              pageNumber={pageNumber}
              width={width ? Math.min(width, 800) : 600}
              className="shadow-md"
              renderTextLayer={false}
              renderAnnotationLayer={false}
              error={<PDFErrorFallback pdfFile={absolutePdfUrl} />}
            />
          )}
        </Document>
      </div>
      {!loading && !error && (
        <div className="flex flex-col items-center mt-4">
          <div className="text-sm text-gray-600 mb-2">
            Page {pageNumber} of {numPages}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={pageNumber <= 1}
              className="px-3 py-1 bg-indigo-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="px-3 py-1 bg-indigo-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="mt-4 flex space-x-4">
            <a
              href={absolutePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Open PDF"
              >
                <title>Open PDF</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Open PDF
            </a>
            <button
              type="button"
              onClick={switchToFallback}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="Switch to Simple Viewer"
              >
                <title>Switch to Simple Viewer</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8v4m0 4h.01M8.438 4.952l-.707.707M15.569 4.952l.707.707M9 12a3 3 0 11 6 0 3 3 0 01-6 0z"
                />
              </svg>
              Switch to Simple Viewer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
