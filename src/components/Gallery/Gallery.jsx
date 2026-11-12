import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useGalleryImages from "../../hooks/useGalleryImages";
import GlobalError from "../GlobalError";
import Loading from "../Loading";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const swiperRef = useRef(null);

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
          <Loading className="m-0" children="Loading gallery..." />
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
    <section className="py-8 sm:py-12">
      <div className="mb-6 text-center sm:mb-8">
        <h1 className="mb-2 font-semibold text-xl uppercase tracking-[0.15em] text-brand-700">
          Moments from our community
        </h1>
        {/* <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Gallery</h2> */}
      </div>

      {galleryImages && galleryImages.length > 0 ? (
        <div className="relative rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-50 p-3 shadow-sm sm:p-5">
          <Swiper
            className="gallery-swiper"
            modules={[A11y, Autoplay, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView="auto"
            spaceBetween={16}
            pagination={{ clickable: true }}
            rewind
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { spaceBetween: 20 },
              1024: { spaceBetween: 24 },
            }}
            a11y={{ enabled: true }}
          >
            {galleryImages.map((imageObj, index) => {
              const description =
                imageObj.description || `Gallery image ${index + 1}`;

              return (
                <SwiperSlide
                  key={imageObj.url}
                  className="!h-auto !w-[86%] sm:!w-[48%]"
                >
                  <button
                    type="button"
                    className="group relative block h-80 w-full overflow-hidden rounded-2xl bg-brand-100 text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:h-80 lg:h-88"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Open ${description} in full size`}
                  >
                    <img
                      src={imageObj.url}
                      alt={description}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {imageObj.description ? (
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pb-4 pt-12 text-sm font-medium text-white sm:px-5 sm:pb-5">
                        {imageObj.description}
                      </span>
                    ) : null}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {galleryImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-5 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-900 shadow-lg transition hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 sm:left-7 sm:h-12 sm:w-12"
                aria-label="Previous gallery images"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-5 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-900 shadow-lg transition hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 sm:right-7 sm:h-12 sm:w-12"
                aria-label="Next gallery images"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          ) : null}
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
    </section>
  );
};

export default Gallery;