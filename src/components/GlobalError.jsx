import PropTypes from "prop-types";

export default function GlobalError({ error, resetErrorBoundary }) {
  if (!error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              strokeWidth="4"
              className="opacity-30"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M16 16l16 16M32 16L16 32"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        {resetErrorBoundary && (
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-[#19007B] text-white rounded-md hover:bg-[#140063] transition duration-300"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

GlobalError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  resetErrorBoundary: PropTypes.func,
};
