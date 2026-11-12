export default function StaffCard({
  name,
  title,
  image,
  email,
  phone,
  office,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 flex items-start border-b border-gray-100">
        <div className="flex-shrink-0 mr-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {image ? (
              <img
                loading="lazy"
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite fallback loop
                  e.target.style.display = "none";
                  e.target.parentNode.classList.add(
                    "flex",
                    "items-center",
                    "justify-center"
                  );
                }}
              />
            ) : null}
            <div
              className={`text-4xl text-brand-200 ${image ? "hidden" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <title>Image</title>
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {name}
          </h3>
          <p className="text-brand-600 truncate">{title}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50 text-sm flex-grow">
        {email && (
          <div className="flex items-center mb-2">
            <svg
              className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <title>Email</title>
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            <a
              href={`mailto:${email}`}
              className="text-brand-600 hover:underline truncate"
            >
              {email}
            </a>
          </div>
        )}
        {phone && (
          <div className="flex items-center mb-2">
            <svg
              className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <title>Phone</title>
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            <span className="text-gray-600 truncate">{phone}</span>
          </div>
        )}
        {office && (
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <title>Office</title>
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-gray-600 truncate">{office}</span>
          </div>
        )}
      </div>
    </div>
  );
}
