import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../api/api";

export function useStudentsData() {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    staleTime: 5 * 60 * 1000,
  });
}
