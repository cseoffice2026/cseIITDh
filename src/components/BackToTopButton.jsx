import { useCallback } from "react";

export default function BackToTopButton({ to }) {
  // Scroll to the top or to a specific element by id
  const handleBackToTop = useCallback(() => {
    if (to) {
      const el = document.getElementById(to);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [to]);

  return (
    <div className="text-center mt-10">
      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Back to top"
        className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#19007B] text-2xl text-white shadow-md transition duration-300 hover:bg-[#140063]"
      >
        <span aria-hidden="true">↑</span>
      </button>
    </div>
  );
}
