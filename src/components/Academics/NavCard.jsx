import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

// Navigation Card Component
export default function NavCard({ title, icon, targetId, to, viewText }) {
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
    <Wrapper {...linkProps} className="cursor-pointer">
      <div className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition-shadow duration-300 hover:bg-brand-50 h-full flex flex-col items-center justify-center">
        <div className="text-brand-600 mb-3 text-3xl">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{viewText}</p>
      </div>
    </Wrapper>
  );
}
