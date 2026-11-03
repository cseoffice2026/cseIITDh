import useResearchProjectsData from "../../hooks/useResearchProjectsData";
import GlobalError from "../GlobalError";
import Loading from "../Loading";

function ResearchProjectsData() {
  const {
    data: researchProjectData,
    isLoading: isLoadingResearchProject,
    isError: isErrorResearchProject,
    error: errorResearchProject,
  } = useResearchProjectsData();

  if (isLoadingResearchProject) return <Loading />;
  if (isErrorResearchProject)
    return <GlobalError error={errorResearchProject} />;

  const filterType = (type, rawData) =>
    rawData?.filter(
      (item) => item?.Type?.toLowerCase() === type?.toLowerCase()
    );

  const sponsoredProjects = filterType("RnD", researchProjectData);
  const consultancyProjects = filterType(
    "Consultancy/Testing",
    researchProjectData
  );

  return (
    <>
      <div className="mb-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            R&D Sponsored Projects in the Past Five Years
          </h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border border-gray-400 px-4 py-2">S. No.</th>
              <th className="border border-gray-400 px-4 py-2">Project Title</th>
              <th className="border border-gray-400 px-4 py-2">Project Area</th>
              <th className="border border-gray-400 px-4 py-2">Duration</th>
              <th className="border border-gray-400 px-4 py-2">PI</th>
              <th className="border border-gray-400 px-4 py-2">Co-PI</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sponsoredProjects.map((project, idx) => (
              <tr key={project.id}>
                <td className="border border-gray-400 px-4 py-2">{idx + 1}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.Title}
                </td>
                <td className="border border-gray-400 px-4 py-2">{project.Area}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.Duration}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.PI || "-"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.CoPI || "-"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.CurrentStatus || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mt-14 text-2xl font-bold text-gray-800">
            Consultancy/Testing Projects in the past five years
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="border border-gray-400 px-4 py-2">S. No.</th>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Area</th>
              <th className="border border-gray-400 px-4 py-2">Duration</th>
              <th className="border border-gray-400 px-4 py-2">PI</th>
              <th className="border border-gray-400 px-4 py-2">Co-PI</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {consultancyProjects.map((project, idx) => (
              <tr key={project.id}>
                <td className="border border-gray-400 px-4 py-2">{idx + 1}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.Title}
                </td>
                <td className="border border-gray-400 px-4 py-2">{project.Area}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.Duration}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.PI || "-"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.CoPI || "-"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {project.CurrentStatus || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function ResearchProjects() {
  return (
    <section id="research-projects" title="Research-Projects">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Research-Projects
        </h3>

        <ResearchProjectsData />
      </div>
    </section>
  );
}
