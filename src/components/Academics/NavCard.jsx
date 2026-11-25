import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

// Navigation Card Component
export default function NavCard({
  title,
  icon,
  targetId,
  to,
  viewText,
  className = "w-full cursor-pointer",
}) {
  const Wrapper = to ? RouterLink : ScrollLink;
  const linkProps = to
    ? { to }
    : {
        to: targetId,
        spy: targetId.toString(),
        smooth: targetId.toString(),
        offset: -100,
        duration: 500,
      };

  return (
    <Wrapper {...linkProps} className={className}>
      <div className="bg-white rounded-lg shadow-md p-3 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50 h-full flex flex-col items-center justify-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700 shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{viewText}</p>
      </div>
    </Wrapper>
  );
}
