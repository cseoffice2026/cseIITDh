import { useState } from "react";
import AlumniSection from "../components/People/AlumniSection";
import PeopleDirectoryLayout from "../components/People/PeopleDirectoryLayout";

export default function Alumni() {
	const [pageTitle, setPageTitle] = useState("Alumni");

	return (
		<PeopleDirectoryLayout
			title={pageTitle}
			showDirectoryNavigation={false}
		>
			<AlumniSection onTitleChange={setPageTitle} />
		</PeopleDirectoryLayout>
	);
}
