export default function DepartmentHeading({
	as = "h2",
	title,
	eyebrow = "",
	size = "default",
	id,
	className = "mb-6",
}) {
	const headingSize =
		size === "compact"
			? "text-xl sm:text-2xl"
			: "text-3xl sm:text-4xl";
	const headingClassName = `${headingSize} font-extrabold tracking-tight text-gray-900`;
	const heading =
		as === "h1" ? (
			<h1 id={id} className={headingClassName}>
				{title}
			</h1>
		) : (
			<h2 id={id} className={headingClassName}>
				{title}
			</h2>
		);

	return (
		<div className={className}>
			{eyebrow ? (
				<p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-700">
					{eyebrow}
				</p>
			) : null}
			{heading}
			<div
				className="mt-4 h-1 w-16 rounded-full bg-brand-600"
				aria-hidden="true"
			/>
		</div>
	);
}
