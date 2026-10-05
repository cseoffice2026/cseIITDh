import { v4 } from "uuid";
import { useTalksAndEvents } from "../hooks/useTalksAndEvents";

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
  <div className="
    bg-white rounded-2xl p-6 transition-all duration-300
    transform hover:-translate-y-1 shadow-md hover:shadow-xl
    text-left flex flex-col h-full
  ">
    <h3 className="text-xl font-semibold text-gray-900 mb-2 italic">{title}</h3>
    {speaker && (
      <div className="mb-2">
        <strong className="font-semibold text-gray-800">Speaker:</strong> {speaker}
        {designation && <div className="text-sm text-gray-600">{designation}</div>}
      </div>
    )}
    {dateDisplay && <div className="mt-1"><strong>📅 Date:</strong> {dateDisplay}</div>}
    {time && <div className="mt-1"><strong>⏰ Time:</strong> {time}</div>}
    {venue && <div className="mt-2"><strong>📍 Venue:</strong> {venue}</div>}
    {description && <p className="mt-4 font-medium text-gray-700">{description}</p>}
    {links && (
  <div className="mt-2">
    <a
      href={links}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline break-words"
    >
      🔗 View Event Details
    </a>
  </div>
    )}
  </div>
);

const TalksLoading = () => (
  <div className="space-y-6 animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-gray-200 rounded-2xl h-48 w-full"></div>
    ))}
  </div>
);

export default function AllTalksEventsPage() {
  const { data: talks, isLoading, error } = useTalksAndEvents();
  const sortedTalks = [...(talks || [])].sort((a, b) => {
    const dateA = a.endDate || a.startDate;
    const dateB = b.endDate || b.startDate;

    if (!dateA) return dateB ? 1 : 0;
    if (!dateB) return -1;
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          All Talks and Events
        </h1>

        {isLoading ? (
          <TalksLoading />
        ) : error ? (
          <div className="text-red-600 bg-red-50 p-6 rounded-xl text-center border border-red-200">
            <p className="font-semibold text-lg">
              Oops, something went wrong!
            </p>
            <p className="text-sm mt-2">
              There was an error loading the events. Please try refreshing the page.
            </p>
          </div>
        ) : sortedTalks.length > 0 ? (
          <div className="space-y-8">
            {sortedTalks.map((item) => (
              <TalkCard key={`talk-${item.id || v4()}`} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-20">
            <p className="text-lg">No talks or events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}