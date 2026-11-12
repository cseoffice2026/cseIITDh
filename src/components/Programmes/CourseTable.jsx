import DataTable from "../DataTable";

const courseColumns = [
	{
		id: "serial",
		header: "Sl. No",
		cell: ({ row }) => row.index + 1,
		enableSorting: false,
	},
	{
		accessorKey: "newCode",
		header: "Course Code",
		cell: ({ getValue }) => getValue() || "—",
	},
	{
		accessorKey: "name",
		header: "Course Name",
		cell: ({ row }) => (
			<>
				{row.original.name || "—"}
				{row.original.remarks ? (
					<div className="mt-0.5 text-xs text-gray-500">
						{row.original.remarks}
					</div>
				) : null}
			</>
		),
	},
	{
		accessorKey: "ltpc",
		header: "L-T-P-C",
		cell: ({ getValue }) => getValue() || "—",
	},
];

/**
 * Responsive course table.
 * Columns: Sl. No | Course Code | Course Name | L-T-P-C
 */
export default function CourseTable({ courses = [] }) {
  return (
    <DataTable
      columns={courseColumns}
      data={courses}
      emptyMessage="No course data is available for this programme yet."
      searchPlaceholder="Search by code or course name..."
    />
  );
}