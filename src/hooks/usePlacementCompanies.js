import { useQuery } from "@tanstack/react-query";
import { getPlacementCompanies } from "../api/api";

export default function usePlacementCompanies() {
	return useQuery({
		queryKey: ["placement-companies"],
		queryFn: getPlacementCompanies,
		staleTime: 5 * 60 * 1000,
	});
}
