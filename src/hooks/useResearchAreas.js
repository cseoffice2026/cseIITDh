import { useQuery } from "@tanstack/react-query";
import { getResearchAreas } from "../api/api";

export default function useResearchAreas() {
	return useQuery({
		queryKey: ["research-areas"],
		queryFn: getResearchAreas,
		staleTime: 5 * 60 * 1000,
		retry: 1,
	});
}
