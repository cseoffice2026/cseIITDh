import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useGalleryImages from "../../hooks/useGalleryImages";
import GlobalError from "../GlobalError";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Import icons

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const { data: galleryImages, isLoading, isError, error } = useGalleryImages();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedImageIndex !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImageIndex]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      (prevIndex - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      (prevIndex + 1) % galleryImages.length
    );
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Gallery</h2>
        <div className="flex justify-center items-center h-44">
          <p className="text-gray-500">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Gallery</h2>
        <GlobalError error={error} />
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Gallery</h2>

      {galleryImages && galleryImages.length > 0 ? (
        <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-200">
          {galleryImages.map((imageObj, index) => (
            <button
              type="button"
              key={imageObj.url}
              className="flex-shrink-0 w-64 h-44 sm:w-80 sm:h-56 cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={imageObj.url}
                alt={imageObj.description || `Gallery image ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No images in the gallery yet.</p>
      )}

      {/* Modal with navigation */}
      {selectedImageIndex !== null &&
        createPortal(
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            className="relative max-w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="cursor-pointer absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white bg-gray-800/50 hover:bg-gray-700/70 p-2 sm:p-3 rounded-full transition duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <button
              onClick={handleNext}
              className="cursor-pointer absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white bg-gray-800/50 hover:bg-gray-700/70 p-2 sm:p-3 rounded-full transition duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>

            {/* Image */}
            <img
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].description || "Enlarged gallery view"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
              loading="lazy"
            />

            {/* Description */}
            {galleryImages[selectedImageIndex].description && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 rounded-b-lg">
                <p className="text-white text-center text-sm sm:text-base">
                  {galleryImages[selectedImageIndex].description}
                </p>
              </div>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white bg-gray-800/50 hover:bg-gray-700/70 rounded-full h-8 w-8 flex items-center justify-center transition duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close image view"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;