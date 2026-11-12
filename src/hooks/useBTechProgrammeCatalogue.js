import { useQuery } from "@tanstack/react-query";
import { getBTechProgrammeCatalogue } from "../api/api";

export default function useBTechProgrammeCatalogue() {
	return useQuery({
		queryKey: ["btech-programme-catalogue"],
		queryFn: getBTechProgrammeCatalogue,
		staleTime: 5 * 60 * 1000,
		retry: 1,
	});
}
