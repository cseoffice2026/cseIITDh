import { useState } from "react";
import { useAlumniData } from "../../hooks/useAlumniData";
import DataTable from "../DataTable";
import DirectoryBreadcrumb from "./DirectoryBreadcrumb";
import ProgrammeSelector from "./ProgrammeSelector";
import Loading from "../Loading";

const alumniColumns = [
	{ accessorKey: "rollNo", header: "Roll No" },
	{ accessorKey: "name", header: "Alumni Name" },
	{ accessorKey: "program", header: "Program" },
	{ accessorKey: "discipline", header: "Discipline" },
	{ accessorKey: "yog", header: "YOG" },
	{ accessorKey: "gender", header: "Gender" },
	{
		accessorKey: "email",
		header: "Alumni Email",
		cell: ({ getValue }) => {
			const email = getValue();
			return email ? (
				<a
					href={`mailto:${email}`}
					className="text-brand-800 hover:underline"
				>
					{email}
				</a>
			) : (
				"-"
			);
		},
	},
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

const formatYear = (year) => year.match(/\d{4}/)?.[0] || year;

export default function AlumniSection({ onTitleChange }) {
	const [activeDegree, setActiveDegree] = useState(null);
	const [activeBatch, setActiveBatch] = useState(null);
	const {
		data: alumni = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useAlumniData();

	const batchesById = new Map();
	for (const alumnus of alumni) {
		const degree = getDegreeName(alumnus.program);
		const id = JSON.stringify([degree, alumnus.yog]);
		const batch = batchesById.get(id) || {
			id,
			degree,
			year: alumnus.yog,
			alumni: [],
		};
		batch.alumni.push(alumnus);
		batchesById.set(id, batch);
	}

	const batches = [...batchesById.values()];
	const degrees = [...new Set(batches.map((batch) => batch.degree))].sort(
		(first, second) => first.localeCompare(second),
	);
	const degreeBatches = batches
		.filter((batch) => batch.degree === activeDegree)
		.sort(
			(first, second) =>
				Number(formatYear(first.year)) - Number(formatYear(second.year)) ||
				first.year.localeCompare(second.year),
		);
	const selectedBatch = degreeBatches.find(
		(batch) => batch.id === activeBatch,
	);
	const selectDegree = (degree) => {
		setActiveDegree(degree);
		setActiveBatch(null);
		onTitleChange(`Alumni ${degree}`);
	};
	const selectBatch = (batch) => {
		setActiveBatch(batch.id);
		onTitleChange(`Alumni ${activeDegree} ${formatYear(batch.year)}`);
	};
	const showProgrammes = () => {
		setActiveDegree(null);
		setActiveBatch(null);
		onTitleChange("Alumni");
	};
	const showYears = () => {
		setActiveBatch(null);
		onTitleChange(`Alumni ${activeDegree}`);
	};

	return (
		<section id="alumni" className="scroll-mt-[136px]">
			{isLoading ? (
				<Loading className="py-8" children="Loading alumni directory..." />
			) : isError ? (
				<div className="py-8 text-center text-red-600">
					<p>Unable to load the alumni list: {error.message}</p>
					<button
						type="button"
						onClick={() => refetch()}
						className="mt-2 font-medium text-brand-800 underline hover:text-brand-950"
					>
						Try again
					</button>
				</div>
			) : alumni.length === 0 ? (
				<p className="py-8 text-center text-gray-500">
					No alumni records are currently available.
				</p>
			) : (
				<>
					{!activeDegree ? (
					<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
							<p className="text-sm font-medium text-gray-500">Total alumni</p>
							<p className="mt-2 text-3xl font-bold text-brand-900">
								{alumni.length.toLocaleString()}
							</p>
						</div>
						<div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
							<p className="text-sm font-medium text-gray-500">Graduation batches</p>
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
						<div key="alumni-programmes" className="directory-step">
							<DirectoryBreadcrumb title="Alumni Directory" />
							<ProgrammeSelector
								programmes={degrees.map((degree) => ({
									name: degree,
									count: batches
										.filter((batch) => batch.degree === degree)
										.reduce(
											(total, batch) => total + batch.alumni.length,
											0,
										),
								}))}
								onSelect={selectDegree}
							/>
						</div>
					) : selectedBatch ? (
						<div key={`alumni-records-${selectedBatch.id}`} className="directory-step">
							<DirectoryBreadcrumb
								title="Alumni Directory"
								degree={activeDegree}
								year={formatYear(selectedBatch.year)}
								onTitleClick={showProgrammes}
								onDegreeClick={showYears}
							/>
							<div className="mb-3">
								<p className="text-sm text-gray-500">
									{selectedBatch.alumni.length} alumni
								</p>
							</div>
							<DataTable
								columns={alumniColumns}
								data={selectedBatch.alumni}
								emptyMessage="No alumni are listed for this batch."
								searchPlaceholder="Search alumni..."
								initialPageSize={100}
							/>
						</div>
					) : (
						<div key={`alumni-years-${activeDegree}`} className="directory-step">
							<DirectoryBreadcrumb
								title="Alumni Directory"
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
												{formatYear(batch.year)}
											</span>
											<span className="mt-1 block text-sm font-medium text-brand-800">
												View batch →
											</span>
										</span>
										<span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-900">
											{batch.alumni.length}
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
