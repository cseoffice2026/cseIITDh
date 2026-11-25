import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import DepartmentHeading from "../components/DepartmentHeading";

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

const fallback = <Loading className="py-8" />;

import {
  BookOpenIcon,
  ScaleIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
// Academics Page


const Academics = () => {
  return (
    <div className="py-6 px-4 md:px-8 bg-background">
      {/* Page Title */}
      <div
        id="academics-top"
        className="mb-10 pb-2"
      >
        <DepartmentHeading as="h1" title="Academics" className="mb-2" />
        <p className="text-muted">
          Learn about our academic programs, courses, and resources for computer
          science and engineering students.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="mb-12">
        <Suspense fallback={fallback}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-6">
            <NavCard
              title="Time Table"
              icon={<CalendarDaysIcon  className="h-6 w-6" />}
              targetId="timetable"
              viewText={"View Details"}
            />
            <NavCard
              title="Courses"
              icon={<BookOpenIcon className="h-6 w-6" />}
              targetId="courses"
              viewText={"View Details"}
            />
            <NavCard
              title="Curriculum"
              icon={<AcademicCapIcon className="h-6 w-6" />}
              targetId="curriculum"
              viewText={"View Details"}
            />
            <NavCard
              title="Rules"
              icon={<ScaleIcon className="h-6 w-6" />}
              targetId="rules"
              viewText={"View Details"}
            />

            <NavCard
              title="FAQs"
              icon={<QuestionMarkCircleIcon className="h-6 w-6" />}
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