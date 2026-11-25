import DepartmentHeading from "./DepartmentHeading";

export default function Section({ id, title, children }) {
	return (
		<div id={id} className="py-10 scroll-mt-[136px]">
			<DepartmentHeading title={title} />
			{children}
		</div>
	);
}
