import { useState } from "react";
import { useStudentsData } from "../../hooks/useStudentsData";
import DataTable from "../DataTable";
import DirectoryBreadcrumb from "./DirectoryBreadcrumb";
import ProgrammeSelector from "./ProgrammeSelector";
import Loading from "../Loading";

const studentColumns = [
	{ accessorKey: "rollNo", header: "Roll No" },
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "program", header: "Program" },
	{ accessorKey: "discipline", header: "Discipline" },
	{ accessorKey: "yoj", header: "YOJ" },
];

const getDegreeName = (program) => {
	const value = program.trim();
	const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, "");

	if (/^(mtechbyresearch|mtechresearch|mtr)$/.test(normalized)) {
		return "M.Tech by Research";
	}
	if (/^(btech|bacheloroftechnology)$/.test(normalized)) return "B.Tech";
	if (/^(mtech|masteroftechnology)$/.test(normalized)) return "M.Tech";

	return value;
};

export default function StudentsSection({ onTitleChange }) {
	const [activeDegree, setActiveDegree] = useState(null);
	const [activeBatch, setActiveBatch] = useState(null);
	const {
		data: students = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useStudentsData();

	const batchesById = new Map();
	for (const student of students) {
		const degree = getDegreeName(student.program);
		const id = JSON.stringify([degree, student.year]);
		const batch = batchesById.get(id) || {
			id,
			degree,
			year: student.year,
			students: [],
		};
		batch.students.push(student);
		batchesById.set(id, batch);
	}

	const batches = [...batchesById.values()];
	const degrees = [...new Set(batches.map((batch) => batch.degree))].sort(
		(first, second) => first.localeCompare(second),
	);
	const degreeBatches = batches
		.filter((batch) => batch.degree === activeDegree)
		.sort((first, second) => Number(second.year) - Number(first.year));
	const selectedBatch = degreeBatches.find(
		(batch) => batch.id === activeBatch,
	);
	const selectDegree = (degree) => {
		setActiveDegree(degree);
		setActiveBatch(null);
		onTitleChange(`Students ${degree}`);
	};
	const selectBatch = (batch) => {
		setActiveBatch(batch.id);
		onTitleChange(`Students ${activeDegree} ${batch.year}`);
	};
	const showProgrammes = () => {
		setActiveDegree(null);
		setActiveBatch(null);
		onTitleChange("Students");
	};
	const showYears = () => {
		setActiveBatch(null);
		onTitleChange(`Students ${activeDegree}`);
	};

	return (
		<section className="scroll-mt-[136px]">
			{isLoading ? (
				<Loading className="py-8" children="Loading recent student batches..." />
			) : isError ? (
				<div className="py-8 text-center text-red-600">
					<p>Unable to load the student list: {error.message}</p>
					<button
						type="button"
						onClick={() => refetch()}
						className="mt-2 font-medium text-brand-800 underline hover:text-brand-950"
					>
						Try again
					</button>
				</div>
			) : students.length === 0 ? (
				<p className="py-8 text-center text-gray-500">
					No student records found for the current year and previous three
					graduation batches.
				</p>
			) : (
				<>
					{!activeDegree ? (
					<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
							<p className="text-sm font-medium text-gray-500">
								Students in recent batches
							</p>
							<p className="mt-2 text-3xl font-bold text-brand-900">
								{students.length.toLocaleString()}
							</p>
						</div>
						<div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
							<p className="text-sm font-medium text-gray-500">
								Current batches
							</p>
							<p className="mt-2 text-3xl font-bold text-brand-900">
								{batches.length.toLocaleString()}
							</p>
						</div>
						<div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
							<p className="text-sm font-medium text-gray-500">Programmes</p>
							<p className="mt-2 text-3xl font-bold text-brand-900">
								{degrees.length.toLocaleString()}
							</p>
						</div>
					</div>
					) : null}

					{!activeDegree ? (
						<div key="student-programmes" className="directory-step">
							<DirectoryBreadcrumb title="Student Directory" />
							<ProgrammeSelector
								programmes={degrees.map((degree) => ({
									name: degree,
									count: batches
										.filter((batch) => batch.degree === degree)
										.reduce(
											(total, batch) => total + batch.students.length,
											0,
										),
								}))}
								onSelect={selectDegree}
							/>
						</div>
					) : selectedBatch ? (
						<div key={`student-records-${selectedBatch.id}`} className="directory-step">
							<DirectoryBreadcrumb
								title="Student Directory"
								degree={activeDegree}
								year={selectedBatch.year}
								onTitleClick={showProgrammes}
								onDegreeClick={showYears}
							/>
							<div className="mb-3">
								<p className="text-sm text-gray-500">
									{selectedBatch.students.length} students
								</p>
							</div>
							<DataTable
								columns={studentColumns}
								data={selectedBatch.students}
								emptyMessage="No students are listed for this batch."
								searchPlaceholder="Search students..."
								initialPageSize={100}
							/>
						</div>
					) : (
						<div key={`student-years-${activeDegree}`} className="directory-step">
							<DirectoryBreadcrumb
								title="Student Directory"
								degree={activeDegree}
								onTitleClick={showProgrammes}
							/>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{degreeBatches.map((batch) => (
									<button
										key={batch.id}
										type="button"
										onClick={() => selectBatch(batch)}
										className="flex items-center justify-between rounded-xl border border-brand-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
									>
										<span>
											<span className="block text-lg font-semibold text-gray-900">
												{batch.year}
											</span>
											<span className="mt-1 block text-sm font-medium text-brand-800">
												View batch →
											</span>
										</span>
										<span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-900">
											{batch.students.length}
										</span>
									</button>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</section>
	);
}
