import useResearchProjectsData from "../../hooks/useResearchProjectsData";
import GlobalError from "../GlobalError";
import Loading from "../Loading";
import DataTable from "../DataTable";

const getProjectColumns = (titleHeader) => [
	{
		id: "serial",
		header: "S. No.",
		cell: ({ row }) => row.index + 1,
		enableSorting: false,
	},
	{ accessorKey: "Title", header: titleHeader },
	{ accessorKey: "Area", header: "Area" },
	{ accessorKey: "Duration", header: "Duration" },
	{
		accessorKey: "PI",
		header: "PI",
		cell: ({ getValue }) => getValue() || "-",
	},
	{
		accessorKey: "CoPI",
		header: "Co-PI",
		cell: ({ getValue }) => getValue() || "-",
	},
	{
		accessorKey: "CurrentStatus",
		header: "Status",
		cell: ({ getValue }) => getValue() || "-",
	},
];

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
            Sponsored Projects in the Past Five Years
          </h2>
        </div>
      </div>
      <DataTable
        columns={getProjectColumns("Project Title")}
        data={sponsoredProjects}
        emptyMessage="No sponsored projects are available."
        searchPlaceholder="Search sponsored projects..."
      />

      <div className="mb-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mt-14 text-2xl font-bold text-gray-800">
            Consultancy Projects in the past five years
          </h2>
        </div>
      </div>

      <DataTable
        columns={getProjectColumns("Title")}
        data={consultancyProjects}
        emptyMessage="No consultancy or testing projects are available."
        searchPlaceholder="Search consultancy projects..."
      />
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
