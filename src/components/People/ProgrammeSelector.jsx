export default function ProgrammeSelector({
	programmes,
	onSelect,
	selectionLabel = "Select programme",
}) {
	return (
		<div className="directory-step">
			<h3 className="mb-4 text-lg font-semibold text-gray-900">
				{selectionLabel}
			</h3>
			<div className="space-y-4">
				{programmes.map(({ name, count }) => (
					<button
						key={name}
						type="button"
						onClick={() => onSelect(name)}
						className="flex w-full items-center justify-between gap-4 border border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-4 text-left text-gray-900 shadow-sm transition hover:border-brand-200 hover:from-brand-50 hover:to-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700 sm:px-6"
					>
						<span className="text-xl font-medium">{name}</span>
						<span className="rounded-full bg-[#19007B] px-3 py-1 text-sm font-semibold text-white">
							{count.toLocaleString()}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
