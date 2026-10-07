import { lazy, Suspense } from "react";

const BackToTopButton = lazy(() => import("../components/BackToTopButton"));

const NavCard = lazy(() => import("../components/Academics/NavCard"));
const DepartmentFacilities = lazy(() =>
  import("../components/Research/DepartmentFacilities")
);
const ResearchProjects = lazy(() =>
  import("../components/Research/ResearchProjects")
);

function QuickNavigation() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
      <NavCard
        title="Research Labs"
        icon={<i className="fas fa-flask"></i>}
        targetId="labs"
        viewText={"View Details"}
      />
      <NavCard
        title="Research-Projects"
        icon={<i className="fas fa-flask"></i>}
        targetId="research-projects"
        viewText={"View Details"}
      />
    </div>
  );
}

const fallback = (
  <div className="text-center py-8 text-gray-400">Loading...</div>
);

// Research Page Component
const Research = () => {
  return (
    <div className="py-6 px-4 md:px-8">
      {/* Page Title */}
      <div id="research-top" className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Research</h1>
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
            className="text-indigo-600 hover:underline font-medium"
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
