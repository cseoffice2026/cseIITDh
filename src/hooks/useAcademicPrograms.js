import { useQuery } from "@tanstack/react-query";
import { getAcademicPrograms } from "../api/api";

export default function useAcademicPrograms() {
  return useQuery({
    queryKey: ["academic-programmes"],
    queryFn: getAcademicPrograms,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}