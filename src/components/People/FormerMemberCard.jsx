import { useState } from "react";

const FormerMemberCard = ({
  name,
  title,
  image,
  period,
  currentAffiliation,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <div className="w-48 h-48 mx-auto mt-4 mb-2 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
        {image && !imageFailed ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="text-8xl text-brand-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-24 h-24"
            >
              <title>Image</title>
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-brand-600 text-sm">{title}</p>
        {period && (
          <p className="text-sm text-gray-600 mt-1">Period: {period}</p>
        )}
        {currentAffiliation && (
          <div className="mt-2 text-sm">
            <p className="text-gray-700 font-medium">Current Affiliation</p>
            <p className="text-gray-600">{currentAffiliation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormerMemberCard;
