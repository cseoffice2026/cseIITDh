// Faculty Card Component
export default function FacultyCard({
  name,
  title,
  image,
  expertise,
  email,
  phone,
  website,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <div className="w-48 h-48 mx-auto mt-4 mb-2 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
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
        <div className={`text-8xl text-brand-200 ${image ? "hidden" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-24 h-24"
          >
            <title>image</title>
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-brand-600 font-medium">{title}</p>
        {expertise && (
          <div className="mt-2">
            <p className="text-sm text-gray-700 font-medium">Research Areas</p>
            <p className="text-sm text-gray-600">{expertise}</p>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        {email && (
          <div className="flex items-center text-sm mb-1">
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
          <div className="flex items-center text-sm mb-1">
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
        {website && (
          <div className="flex items-center text-sm">
            <svg
              className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <title>Website</title>
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline truncate"
            >
              Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
