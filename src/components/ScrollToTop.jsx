import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    let attempts = 0;
    let frameId;

    const scrollToHash = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      // Section content is lazy-loaded, so keep retrying briefly until it mounts.
      if (attempts < 120) {
        frameId = requestAnimationFrame(scrollToHash);
      }
    };

    scrollToHash();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [pathname, hash]);

  return null;
}
