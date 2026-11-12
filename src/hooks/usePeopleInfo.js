import { useQuery } from "@tanstack/react-query";
import { getPeopleInfo } from "../api/api";

export default function usePeopleInfo() {
	return useQuery({
		queryKey: ["people-info"],
		queryFn: getPeopleInfo,
		staleTime: 0,
		gcTime: 0,
		refetchOnMount: "always",
	});
}
