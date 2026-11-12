import { useQuery } from "@tanstack/react-query";
import { getAlumni } from "../api/api";

export function useAlumniData() {
	return useQuery({
		queryKey: ["alumni"],
		queryFn: getAlumni,
		staleTime: 5 * 60 * 1000,
	});
}
