import { useQuery } from "@tanstack/react-query";
import { getAcademicCourses } from "../api/api";

/**
 * Course catalogue from the same Google Sheet used by the Programmes section.
 * Pass { enabled: false } to skip the request on pages that are on hold (PhD).
 */
export default function useCourses({ enabled = true } = {}) {
  return useQuery({
    queryKey: ["academic-sheet-courses"],
    queryFn: getAcademicCourses,
    enabled,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
