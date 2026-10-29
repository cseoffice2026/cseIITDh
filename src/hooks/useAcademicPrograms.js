import { useQuery } from "@tanstack/react-query";
import { getAcademicPrograms } from "../api/api";

/**
 * Shared cache for the Programmes dropdown and programme pages.
 * Sheet edits are picked up while the site is open without a redeployment.
 */
export default function useAcademicPrograms() {
  return useQuery({
    queryKey: ["academic-programmes"],
    queryFn: getAcademicPrograms,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
