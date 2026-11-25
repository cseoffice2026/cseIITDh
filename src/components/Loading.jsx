import PropTypes from "prop-types";

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
      <div className="dot-spinner mb-3" role="status" aria-label="Loading">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="dot-spinner__dot" key={index} />
        ))}
      </div>
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
