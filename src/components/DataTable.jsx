import { useId, useState } from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

export default function DataTable({
	columns,
	data,
	emptyMessage = "No data available.",
	searchPlaceholder = "Search this table...",
	enableSorting = true,
	initialPageSize = 10,
}) {
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const searchId = useId();
	const table = useReactTable({
		data,
		columns,
		state: { globalFilter, sorting },
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
		enableSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: { pagination: { pageSize: initialPageSize } },
	});

	const filteredCount = table.getFilteredRowModel().rows.length;
	const pageCount = table.getPageCount();
	const pageIndex = table.getState().pagination.pageIndex;
	const pageSize = table.getState().pagination.pageSize;
	const firstVisibleRow = filteredCount === 0 ? 0 : pageIndex * pageSize + 1;
	const lastVisibleRow = Math.min((pageIndex + 1) * pageSize, filteredCount);

	return (
		<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
			<div className="flex flex-col gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
				<label className="sr-only" htmlFor={searchId}>
					Search table
				</label>
				<input
					id={searchId}
					type="search"
					value={globalFilter}
					onChange={(event) => {
						setGlobalFilter(event.target.value);
						table.setPageIndex(0);
					}}
					placeholder={searchPlaceholder}
					className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#19007B] focus:ring-2 focus:ring-brand-100 sm:max-w-xs"
				/>
				<p className="text-sm text-gray-600" aria-live="polite">
					{filteredCount.toLocaleString()}{" "}
					{filteredCount === 1 ? "row" : "rows"}
				</p>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full text-left text-sm text-gray-900">
					<thead className="bg-[#19007B] text-xs uppercase tracking-wide text-white">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										scope="col"
										className="whitespace-nowrap px-4 py-3 font-semibold"
									>
										{header.isPlaceholder ? null : header.column.getCanSort() ? (
											<button
												type="button"
												onClick={header.column.getToggleSortingHandler()}
												className="inline-flex items-center gap-2 text-left hover:text-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												<span aria-hidden="true">
													{header.column.getIsSorted() === "asc"
														? "↑"
														: header.column.getIsSorted() === "desc"
															? "↓"
															: "↕"}
												</span>
											</button>
										) : (
											flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-gray-200">
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<tr
									key={row.id}
									className="odd:bg-white even:bg-gray-50 hover:bg-brand-50"
								>
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="px-4 py-3 align-top">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={columns.length}
									className="px-4 py-8 text-center text-gray-600"
								>
									{globalFilter ? "No matching rows." : emptyMessage}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
					<label className="flex items-center gap-2 text-sm text-gray-700">
						Show
						<span className="relative inline-flex">
							<select
								value={pageSize}
								onChange={(event) =>
									table.setPageSize(Number(event.target.value))
								}
								className="w-[4.5rem] appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-7 text-sm text-gray-900 focus:border-[#19007B] focus:outline-none focus:ring-2 focus:ring-brand-100"
							>
								{[10, 25, 50, 100].map((size) => (
									<option key={size} value={size}>
										{size}
									</option>
								))}
							</select>
							<svg
								aria-hidden="true"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
							>
								<path
									fillRule="evenodd"
									d="M5.22 7.47a.75.75 0 0 1 1.06 0L10 11.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.53a.75.75 0 0 1 0-1.06Z"
									clipRule="evenodd"
								/>
							</svg>
						</span>
						entries per page
					</label>
					<p className="text-sm text-gray-600" aria-live="polite">
						Showing {firstVisibleRow}-{lastVisibleRow} of{" "}
						{filteredCount.toLocaleString()}
					</p>
				</div>
				{pageCount > 1 ? (
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
						>
							Previous
						</button>
						<button
							type="button"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
						>
							Next
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
}
