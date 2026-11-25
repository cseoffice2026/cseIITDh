import {
	AcademicCapIcon,
	BeakerIcon,
	BuildingLibraryIcon,
	TrophyIcon,
} from "@heroicons/react/24/outline";

const getProgrammeIcon = (name) => {
	const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

	if (/^(mtechbyresearch|mtechresearch|mtr)$/.test(normalized)) {
		return BeakerIcon;
	}
	if (/^(phd|doctorofphilosophy)$/.test(normalized)) return TrophyIcon;
	if (/^(mtech|masteroftechnology)$/.test(normalized)) {
		return BuildingLibraryIcon;
	}

	return AcademicCapIcon;
};

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
				{programmes.map(({ name, count }) => {
					const Icon = getProgrammeIcon(name);

					return (
						<button
							key={name}
							type="button"
							onClick={() => onSelect(name)}
							className="group flex w-full items-center gap-4 border border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-4 text-left text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:from-brand-50 hover:to-brand-100 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700 sm:px-6"
						>
							<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-white text-brand-700 shadow-sm transition group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
								<Icon className="h-6 w-6" aria-hidden="true" />
							</span>
							<span className="flex-1 text-xl font-medium">{name}</span>
							<span className="rounded-full bg-brand-600 px-3 py-1 text-sm font-semibold text-white">
								{count.toLocaleString()}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
