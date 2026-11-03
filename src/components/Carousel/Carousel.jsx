import { useEffect, useState } from "react";
import useCarouselImages from "../../hooks/useCarouselImages";
import GlobalError from "../GlobalError";

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const { data: images, isLoading, isError, error } = useCarouselImages();

  // Auto slide
  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, images]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="relative w-full rounded-lg shadow-md max-w-full aspect-[3/1] bg-gray-200 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading Images...</p>
      </div>
    );
  }

  if (isError) return <GlobalError error={error} />;

  const length = images.length;

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  // Swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) goToNext();
    if (touchStart - touchEnd < -50) goToPrev();
  };

  if (length === 0) return null;

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-md max-w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel wrapper */}
      <div className="relative w-full aspect-[3/1] overflow-hidden">
        {images.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.image}
                  alt={`Slide ${index + 1}`}
                  className="absolute w-full h-full object-cover cursor-pointer"
                  style={{
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                  }}
                />
              </a>
            ) : (
              <img
                src={item.image}
                alt={`Slide ${index + 1}`}
                className="absolute w-full h-full object-cover"
                style={{
                  transform: "translate(-50%, -50%)",
                  top: "50%",
                  left: "50%",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-2 sm:space-x-3 bottom-4 left-1/2">
        {images.map((item, index) => (
          <button
            key={`slide-${item.image}`}
            type="button"
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-300"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Previous */}
      <button
        type="button"
        className="hidden sm:flex absolute top-0 left-0 z-30 items-center justify-center h-full px-4 cursor-pointer group"
        onClick={goToPrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              d="M5 1L1 5l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Next */}
      <button
        type="button"
        className="hidden sm:flex absolute top-0 right-0 z-30 items-center justify-center h-full px-4 cursor-pointer group"
        onClick={goToNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              d="M1 9l4-4-4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default CustomCarousel;