import { Suspense, lazy } from "react";
import Loading from "../components/Loading";

const ResearchAreas = lazy(() =>
	import("../components/Research/ResearchAreas")
);

export default function ResearchAreasPage() {
	return (
		<div className="px-4 py-6 md:px-8">
			<Suspense fallback={<Loading className="py-8" />}>
				<ResearchAreas />
			</Suspense>
		</div>
	);
}
