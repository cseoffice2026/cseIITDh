import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import DepartmentHeading from "../components/DepartmentHeading";

const BackToTopButton = lazy(() => import("../components/BackToTopButton"));

const NavCard = lazy(() => import("../components/Academics/NavCard"));
const DepartmentFacilities = lazy(() =>
  import("../components/Research/DepartmentFacilities")
);
const ResearchProjects = lazy(() =>
  import("../components/Research/ResearchProjects")
);

import {
  AcademicCapIcon,
  ArchiveBoxIcon,
  BeakerIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  CpuChipIcon,
  FolderOpenIcon,
  IdentificationIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function QuickNavigation() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
      <NavCard
        title="Research Areas"
         icon={<CpuChipIcon className="w-6 h-6" />}
        to="/research/research-areas"
        viewText={"View Details"}
      />
      <NavCard
        title="Research Labs"
        icon={<BeakerIcon className="w-6 h-6" />}
        targetId="labs"
        viewText={"View Details"}
      />
      <NavCard
        title="Research-Projects"
        icon={<FolderOpenIcon className="w-6 h-6" />}
        targetId="research-projects"
        viewText={"View Details"}
      />
    </div>
  );
}

const fallback = <Loading className="py-8" />;

// Research Page Component
const Research = () => {
  return (
    <div className="py-6 px-4 md:px-8">
      {/* Page Title */}
      <div id="research-top" className="mb-10">
        <DepartmentHeading as="h1" title="Research" className="mb-2" />
        <p className="text-gray-600">
          Explore research activities, publications, patents, and laboratories
          of the Department of Computer Science and Engineering.
        </p>
      </div>

      {/* Navigation Cards */}
      <QuickNavigation />

      {/* Labs Section */}
      <Suspense fallback={fallback}>
        <DepartmentFacilities />
      </Suspense>

      {/* Research Projects Section */}
      <Suspense fallback={fallback}>
        <ResearchProjects />
      </Suspense>

      {/* Research Project Information Link */}
      <div className="text-center mt-8 mb-4">
        <p className="text-gray-600">
          For more information regarding the research projects,{" "}
          <a
            href="https://rnd.iitdh.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline font-medium"
          >
            click here
          </a>.
        </p>
      </div>

      {/* Back to Top Button */}
      <Suspense fallback={null}>
        <BackToTopButton to={"research-top"} />
      </Suspense>
    </div>
  );
};

export default Research;
