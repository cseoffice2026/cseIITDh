// App.jsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import LazyRoute from "./components/LazyRoute";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home"; // Import Home eagerly


// Lazy load all other page components
const Academics = lazy(() => import("./pages/Academics"));
const Admissions = lazy(() => import("./pages/Admissions"));
const JoinAsFaculty = lazy(() => import("./pages/JoinAsFaculty"));
const Contact = lazy(() => import("./pages/Contact"));
const People = lazy(() => import("./pages/People"));
const Research = lazy(() => import("./pages/Research"));
const About = lazy(() => import("./pages/About"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Allnews = lazy(() => import("./pages/Allnews"));
const AllTalksEvents = lazy(() => import("./pages/AllTalksEventsPage"));
const CseConclave = lazy(() => import("./pages/CseConclave"));
const CseConclave2 = lazy(() => import("./pages/CseConclave2"));


const queryClient = new QueryClient();

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 overflow-x-hidden flex flex-col">
        {/* Fixed top bar */}
        <Topbar
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Mobile menu overlay */}
        <div
          className={`sm:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          tabIndex={0}
          role="button"
          aria-label="Close mobile menu"
          onClick={() => setIsMobileMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsMobileMenuOpen(false);
            }
          }}
        />

        <div className="flex flex-grow relative" style={{ paddingTop: "124px" }}>
          <Navbar
            closeMenu={() => setIsMobileMenuOpen(false)}
            isMobileMenuOpen={isMobileMenuOpen}
          />

          <div className="w-full flex flex-col min-h-full">
            <div className="max-w-full overflow-x-hidden flex-grow">
              <Routes>
                {/* Home page loaded eagerly */}
                <Route path="/" element={<LazyRoute element={Home} />} />

                {/* Each lazy-loaded page wrapped in its own Suspense */}
                <Route
                  path="/academics"
                  element={<LazyRoute element={Academics} />}
                />
                <Route
                  path="/admissions"
                  element={<LazyRoute element={Admissions} />}
                />
                <Route
                  path="/people"
                  element={<LazyRoute element={People} />}
                />
                <Route
                  path="/join-as-faculty"
                  element={<LazyRoute element={JoinAsFaculty} />}
                />
                <Route
                  path="/contact"
                  element={<LazyRoute element={Contact} />}
                />
                <Route
                  path="/research"
                  element={<LazyRoute element={Research} />}
                />
                <Route path="/about" element={<LazyRoute element={About} />} />
                <Route
                  path="/search"
                  element={<LazyRoute element={SearchResults} />}
                />
                <Route
                  path="/allnews"
                  element={<LazyRoute element={Allnews} />}
                />
                <Route
                  path="/allTalksEvents"
                  element={<LazyRoute element={AllTalksEvents} />}
                />
                <Route
                  path="/cse-conclave-2026"
                  element={<LazyRoute element={CseConclave} />}
                />
                <Route
                  path="/cse-conclave-2026-2.0"
                  element={<LazyRoute element={CseConclave2} />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
