export default function DirectoryBreadcrumb({
	title,
	degree,
	year,
	onTitleClick,
	onDegreeClick,
}) {
	return (
		<div className="mb-5 flex justify-start">
			<nav
				aria-label="Directory breadcrumb"
				className="flex flex-wrap items-center gap-2 text-sm"
			>
				{onTitleClick ? (
					<button
						type="button"
						onClick={onTitleClick}
						className="font-medium text-brand-800 hover:text-brand-950 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
					>
						{title}
					</button>
				) : (
					<span className="font-medium text-brand-800">{title}</span>
				)}
				{degree ? (
					<>
						<span aria-hidden="true" className="text-gray-400">
							/
						</span>
						{year && onDegreeClick ? (
							<button
								type="button"
								onClick={onDegreeClick}
								className="text-gray-600 hover:text-brand-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
							>
								{degree}
							</button>
						) : (
							<span
								className={
									year
										? "text-gray-600"
										: "font-semibold text-gray-900"
								}
							>
								{degree}
							</span>
						)}
					</>
				) : null}
				{year ? (
					<>
						<span aria-hidden="true" className="text-gray-400">
							/
						</span>
						<span className="font-semibold text-gray-900">{year}</span>
					</>
				) : null}
			</nav>
		</div>
	);
}
