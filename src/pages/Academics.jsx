import { lazy, Suspense } from "react";

const AcademicRules = lazy(() =>
  import("../components/Academics/AcademicRules")
);
const CoursesSection = lazy(() =>
  import("../components/Academics/CoursesSection")
);
const CurriculumSection = lazy(() =>
  import("../components/Academics/CurriculumSection")
);
const FAQs = lazy(() => import("../components/Academics/FAQs"));
const NavCard = lazy(() => import("../components/Academics/NavCard"));
const TimeTableSection = lazy(() =>
  import("../components/Academics/TimeTableSection")
);
const PlacementSection = lazy(() =>
  import("../components/Academics/PlacementSection")
);
const BackToTopButton = lazy(() => import("../components/BackToTopButton"));

const fallback = (
  <div className="text-center py-8 text-gray-400">Loading...</div>
);

// Academics Page
const Academics = () => {
  return (
    <div className="py-6 px-4 md:px-8">
      {/* Page Title */}
      <div id="academics-top" className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Academics</h1>
        <p className="text-gray-600">
          Learn about our academic programs, courses, and resources for computer
          science and engineering students.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="mb-12">
        <Suspense fallback={fallback}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
            <NavCard
              title="Time Table"
              icon={<i className="far fa-clock"></i>}
              targetId="timetable"
              viewText={"View Details"}
            />
            <NavCard
              title="Courses"
              icon={<i className="fas fa-book"></i>}
              targetId="courses"
              viewText={"View Details"}
            />
            <NavCard
              title="Curriculum"
              icon={<i className="fas fa-graduation-cap"></i>}
              targetId="curriculum"
              viewText={"View Details"}
            />
            <NavCard
              title="Rules"
              icon={<i className="fas fa-gavel"></i>}
              targetId="rules"
              viewText={"View Details"}
            />
            
            <NavCard
              title="FAQs"
              icon={<i className="fas fa-question-circle"></i>}
              targetId="faq"
              viewText={"View Details"}
            />
          </div>
        </Suspense>
      </div>

      {/* Time Table Section */}
      <Suspense fallback={fallback}>
        <TimeTableSection />
      </Suspense>

      {/* Courses Section */}
      <Suspense fallback={fallback}>
        <CoursesSection />
      </Suspense>

      {/* Curriculum Section */}
      <Suspense fallback={fallback}>
        <CurriculumSection />
      </Suspense>

      {/* Rules Section */}
      <Suspense fallback={fallback}>
        <AcademicRules />
      </Suspense>

      
      {/* FAQs Section */}
      <Suspense fallback={fallback}>
        <FAQs />
      </Suspense>

      {/* Back to Top Button */}
      <Suspense fallback={null}>
        <BackToTopButton to={"academics-top"} />
      </Suspense>
    </div>
  );
};

export default Academics;
