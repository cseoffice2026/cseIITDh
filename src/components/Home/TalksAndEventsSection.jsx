import { v4 } from "uuid";
import { useTalksAndEvents } from "../../hooks/useTalksAndEvents";
import { Link } from "react-router-dom"; // ✅ Required for routing

const TalkCard = ({
  title,
  speaker,
  designation,
  venue,
  time,
  date,
  dateDisplay,
  description,
  links,
}) => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      <span className="italic">{title}</span>
    </h3>
    {speaker && (
      <div className="mb-2">
        <span className="font-semibold">Speaker:</span> {speaker}
        <br />
        {designation && (
          <span className="text-sm text-gray-600">{designation}</span>
        )}
      </div>
    )}
    {dateDisplay && (
      <div className="mb-1">
        <span className="text-gray-600 font-semibold">📅 Date:</span> {dateDisplay}
      </div>
    )}
    {time && (
      <div className="mb-1">
        <span className="text-blue-600 font-semibold">⏰ Time:</span>{" "}
        {time}
      </div>
    )}
    {venue && (
      <div className="mb-1">
        <span className="text-red-600 font-semibold">📍 Venue:</span>{" "}
        {venue}
      </div>
    )}
    {links && (
  <div className="mt-1">
    <a
      href={links}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline break-words text-sm"
    >
      🔗 View Event Details
    </a>
  </div>
    )}
    {description && <div className="mt-2 font-semibold">{description}</div>}
  </div>
);

export const TalkLoading = () => {
  return (
    <div className="animate-pulse space-y-4">
      {["skeleton-1", "skeleton-2", "skeleton-3"].map((label) => (
        <div key={label} className="bg-gray-200 rounded-lg p-4 h-32"></div>
      ))}
    </div>
  );
};

export default function TalksAndEventsSection() {
  const {
    data: talksAndEvents,
    isLoading: talksLoading,
    error: talksError,
  } = useTalksAndEvents();

  // Show upcoming or ongoing events that fall within the current month.
  const getRecentTalks = () => {
    if (!talksAndEvents || talksAndEvents.length === 0) return [];

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return talksAndEvents
      .filter((item) => {
        const startDate = item.startDate;
        const endDate = item.endDate;

        if (startDate && endDate) {
          return startDate <= endOfMonth && endDate >= today;
        }

        const eventDate = startDate || endDate;
        return eventDate && eventDate >= today && eventDate <= endOfMonth;
      })
      .sort((a, b) => (a.startDate || a.endDate) - (b.startDate || b.endDate))
      .slice(0, 3);
  };

  const recentTalks = getRecentTalks();
  const hasRecentEvents = recentTalks.length > 0;

  return (
    <div>
      {/* Header and button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Talks and Events
        </h2>
        <Link
          to="/allTalksEvents"
          className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition font-medium"
        >
          View All Talks and Events
        </Link>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {talksLoading ? (
          hasRecentEvents ? <TalkLoading /> : null
        ) : talksError ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">
            <p>Error loading talks and events: {talksError?.message}</p>
            <p className="text-sm mt-2">Please try refreshing the page.</p>
          </div>
        ) : hasRecentEvents ? (
          recentTalks.map((item) => (
            <TalkCard key={`talks-${item?.id || v4()}`} {...item} />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">
              No upcoming talks or events this month.
            </p>
            <Link
              to="/allTalksEvents"
              className="inline-block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View past events and more →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
