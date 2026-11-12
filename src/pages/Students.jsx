import { useState } from "react";
import StudentsSection from "../components/People/StudentsSection";
import PeopleDirectoryLayout from "../components/People/PeopleDirectoryLayout";

export default function Students() {
	const [pageTitle, setPageTitle] = useState("Students");

	return (
		<PeopleDirectoryLayout
			title={pageTitle}
			showDirectoryNavigation={false}
		>
			<StudentsSection onTitleChange={setPageTitle} />
		</PeopleDirectoryLayout>
	);
}
