import { lazy, Suspense } from "react";

const Carousel = lazy(() => import("../components/Carousel/Carousel"));
const Gallery = lazy(() => import("../components/Gallery/Gallery"));
const NewsSection = lazy(() => import("../components/Home/NewsSection"));
const TalksAndEventsSection = lazy(() =>
  import("../components/Home/TalksAndEventsSection")
);
const PlacementSection = lazy(() =>
  import("../components/Academics/PlacementSection")
);

const fallback = (
  <div className="text-center py-8 text-gray-400">Loading...</div>
);

const Home = () => {
  return (
    <div className="py-6 px-4 md:px-8">
      {/* Carousel Section */}
      <div className="mb-10">
        <Suspense fallback={fallback}>
          <Carousel />
        </Suspense>
      </div>
      {/* News & Talks_events Section */}
      <div className="border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense fallback={fallback}>
            <NewsSection />
          </Suspense>
          <Suspense fallback={fallback}>
            <TalksAndEventsSection />
          </Suspense>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8">
        <Suspense fallback={fallback}>
          <PlacementSection />
        </Suspense>
      </div>
      <div className="border-t border-gray-200 mt-8">
        <Suspense fallback={fallback}>
          <Gallery />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
