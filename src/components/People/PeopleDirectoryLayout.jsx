import { Link, useLocation } from "react-router-dom";

const directoryLinks = [
	{ to: "/people/students", label: "Students" },
	{ to: "/people/alumni", label: "Alumni" },
];

export default function PeopleDirectoryLayout({
	title,
	description,
	showDirectoryNavigation = true,
	children,
}) {
	const { pathname } = useLocation();

	return (
		<main className="mx-auto w-full max-w-7xl px-4 py-8">
			<div className="mb-8">
				<Link
					to="/people"
					className="text-sm font-medium text-brand-800 hover:text-brand-950"
				>
					People
				</Link>
				<h1 className="mt-2 text-3xl font-bold text-gray-900">{title}</h1>
				{description ? (
					<p className="mt-2 text-gray-600">{description}</p>
				) : null}
			</div>

			{showDirectoryNavigation ? (
				<nav
					aria-label="People directories"
					className="mb-6 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-gray-100 p-1"
				>
					{directoryLinks.map((link) => {
						const isActive = pathname === link.to;

						return (
							<Link
								key={link.to}
								to={link.to}
								aria-current={isActive ? "page" : undefined}
								className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
									isActive
										? "bg-[#19007B] text-white shadow-sm"
										: "text-gray-600 hover:bg-white hover:text-brand-900"
								}`}
							>
								{link.label}
							</Link>
						);
					})}
				</nav>
			) : null}

			{children}
		</main>
	);
}
