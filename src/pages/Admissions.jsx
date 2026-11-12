import { lazy, Suspense } from "react";
import GlobalError from "../components/GlobalError";
import Loading from "../components/Loading";
import useAdmissionsInfo from "../hooks/useAdmissionsInfo";

// Lazy load components
const BTechSection = lazy(() =>
  import("../components/Admissions/BTechSection")
);
const MSResearchSection = lazy(() =>
  import("../components/Admissions/MSResearchSection")
);
const MTechSection = lazy(() =>
  import("../components/Admissions/MTechSection")
);
const PhDSection = lazy(() => import("../components/Admissions/PhDSection"));
const BackToTopButton = lazy(() => import("../components/BackToTopButton"));

function AdmissionDetails() {
  const {
    data: admissionsData,
    isLoading,
    isError,
    error,
  } = useAdmissionsInfo();

  if (isLoading) return <Loading />;
  if (isError) return <GlobalError error={error} />;

  const { btech_admission, mtech_admission, ms_admission, phd_admission } =
    admissionsData;

  const fallback = <Loading className="py-8" />;

  return (
    <>
      {/* B.Tech Section */}
      <Suspense fallback={fallback}>
        <BTechSection btech_admission={btech_admission} />
      </Suspense>

      {/* M.Tech Section */}
      <Suspense fallback={fallback}>
        <MTechSection mtech_admission={mtech_admission} />
      </Suspense>

      {/* MS Research Section */}
      <Suspense fallback={fallback}>
        <MSResearchSection ms_admission={ms_admission} />
      </Suspense>

      {/* PhD Section */}
      <Suspense fallback={fallback}>
        <PhDSection phd_admission={phd_admission} />
      </Suspense>
      {/* Back to Top Button */}
      <Suspense fallback={null}>
        <BackToTopButton to={"admissions-top"} />
      </Suspense>
    </>
  );
}

// Admissions Page
const Admissions = () => {
  return (
    <div className="py-6 px-4 md:px-8">
      {/* Page Title */}
      <div id="admissions-top" className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admissions</h1>
        <p className="text-gray-600">
          Learn about admission requirements, application procedures, and
          opportunities for prospective students.
          <br />
          Redirect to IIT DHARWAD webpage Admission section,by clicking on the
          button below.
        </p>
      </div>
      <div className="text-center mt-10">
        <a
          href="https://www.iitdh.ac.in/admissions"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#19007B] text-white px-4 py-2 rounded-md hover:bg-[#140063] transition duration-300"
        >
          Redirect to main website
        </a>
      </div>
      <AdmissionDetails />
    </div>
  );
};

export default Admissions;
