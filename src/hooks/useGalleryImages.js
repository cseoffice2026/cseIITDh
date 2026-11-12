import { useQuery } from "@tanstack/react-query";
import { getGalleryImages } from "../api/api";

export default function useGalleryImages() {
  return useQuery({
    queryKey: ["GalleryImages"],
    queryFn: getGalleryImages,
    staleTime: 5 * 60 * 1000,
  });
}
