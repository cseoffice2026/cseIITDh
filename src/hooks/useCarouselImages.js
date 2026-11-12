
import { useQuery } from "@tanstack/react-query";
import { getCarouselImages } from "../api/api";

export default function useCarouselImages() {
  return useQuery({
    queryKey: ["carouselImages"],
    queryFn: getCarouselImages,
    staleTime: 5 * 60 * 1000,
  });
}