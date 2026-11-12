import PropTypes from "prop-types";
import { DotsRing } from "./loading-ui/dots-ring";

export default function Loading({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center m-10 ${className}`}
      aria-live="polite"
      {...props}
    >
      <DotsRing className="mb-3 size-10 [--duration:900ms]" />
      <span className="text-gray-700 text-base font-medium">
        {children || "Loading..."}
      </span>
    </div>
  );
}

Loading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
