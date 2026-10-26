import { useTalksAndEvents } from "../../hooks/useTalksAndEvents";
import { Link } from "react-router-dom";

/**
 * Parse an event date safely.
 * Supports ISO dates, DD/MM/YYYY, dates such as "Oct 11",
 * and date ranges such as "Oct 10 - Oct 11".
 *
 * Date-only events remain active until the end of their final day.
 */
const parseEventDate = (rawDate, position = "start") => {
  if (!rawDate) return null;

  if (rawDate instanceof Date) {
    if (Number.isNaN(rawDate.getTime())) return null;

    const result = new Date(rawDate);
    result.setHours(
      position === "end" ? 23 : 0,
      position === "end" ? 59 : 0,
      position === "end" ? 59 : 0,
      position === "end" ? 999 : 0,
    );

    return result;
  }

  const value = String(rawDate).trim();
  if (!value) return null;

  // If a single cell contains a date range, select the start or end.
  const rangeParts = value.split(/\s+(?:to|[-–—])\s+/i);
  const selectedValue =
    rangeParts.length > 1
      ? position === "end"
        ? rangeParts[rangeParts.length - 1].trim()
        : rangeParts[0].trim()
      : value;

  let result = null;

  // ISO date: YYYY-MM-DD
  const isoMatch = selectedValue.match(
    /^(\d{4})-(\d{1,2})-(\d{1,2})/,
  );

  if (isoMatch) {
    result = new Date(
      Number(isoMatch[1]),
      Number(isoMatch[2]) - 1,
      Number(isoMatch[3]),
    );
  }

  // Indian date format: DD/MM/YYYY or DD-MM-YYYY
  if (!result) {
    const numericMatch = selectedValue.match(
      /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/,
    );

    if (numericMatch) {
      const day = Number(numericMatch[1]);
      const month = Number(numericMatch[2]);
      const year = Number(numericMatch[3]);

      result = new Date(year, month - 1, day);

      // Reject impossible dates such as 31/02/2026.
      if (
        result.getFullYear() !== year ||
        result.getMonth() !== month - 1 ||
        result.getDate() !== day
      ) {
        return null;
      }
    }
  }

  // Textual dates, e.g. "Oct 11" or "11 Oct 2026".
  if (!result) {
    const currentYear = new Date().getFullYear();

    const hasYear = /\b\d{4}\b/.test(selectedValue);
    const normalizedValue = hasYear
      ? selectedValue
      : `${selectedValue} ${currentYear}`;

    const parsed = new Date(normalizedValue);

    if (!Number.isNaN(parsed.getTime())) {
      result = new Date(
        parsed.getFullYear(),
        parsed.getMonth(),
        parsed.getDate(),
      );
    }
  }

  if (!result || Number.isNaN(result.getTime())) {
    return null;
  }

  // Treat a date-only event as active until the end of its end date.
  if (position === "end") {
    result.setHours(23, 59, 59, 999);
  } else {
    result.setHours(0, 0, 0, 0);
  }

  return result;
};

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
  <div className="flex h-full flex-col rounded-lg bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
    <h3 className="mb-2 text-lg font-semibold text-gray-800">
      <span className="italic">{title}</span>
    </h3>

    {speaker && (
      <div className="mb-2">
        <span className="font-semibold">Speaker:</span> {speaker}
        <br />
        {designation && (
          <span className="text-sm text-gray-600">
            {designation}
          </span>
        )}
      </div>
    )}

    {(dateDisplay || date) && (
      <div className="mb-1">
        <span className="font-semibold text-gray-600">
          📅 Date:
        </span>{" "}
        {dateDisplay || date}
      </div>
    )}

    {time && (
      <div className="mb-1">
        <span className="font-semibold text-blue-600">
          ⏰ Time:
        </span>{" "}
        {time}
      </div>
    )}

    {venue && (
      <div className="mb-1">
        <span className="font-semibold text-red-600">
          📍 Venue:
        </span>{" "}
        {venue}
      </div>
    )}

    {links && (
      <div className="mt-1">
        <a
          href={links}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words text-sm text-blue-600 hover:underline"
        >
          🔗 View Event Details
        </a>
      </div>
    )}

    {description && (
      <div className="mt-2 font-semibold">{description}</div>
    )}
  </div>
);

export const TalkLoading = () => (
  <div className="space-y-4 animate-pulse">
    {["skeleton-1", "skeleton-2", "skeleton-3"].map((label) => (
      <div
        key={label}
        className="h-32 rounded-lg bg-gray-200 p-4"
      />
    ))}
  </div>
);

export default function TalksAndEventsSection() {
  const {
    data: talksAndEvents = [],
    isLoading: talksLoading,
    error: talksError,
  } = useTalksAndEvents();

  /**
   * Return up to three upcoming or ongoing events within the
   * current month. Ended events are excluded based on endDate.
   */
  const getRecentTalks = () => {
    if (!Array.isArray(talksAndEvents) || talksAndEvents.length === 0) {
      return [];
    }

    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    return talksAndEvents
      .map((item, index) => {
        const startDate = parseEventDate(
          item.startDate || item.date || item.sortingDate,
          "start",
        );

        const endDate = parseEventDate(
          item.endDate ||
            item.sortingDate ||
            item.date ||
            item.startDate,
          "end",
        );

        return {
          item,
          index,
          startDate,
          endDate,
        };
      })
      .filter(({ startDate, endDate }) => {
        // If the date cannot be interpreted, don't display it as
        // an upcoming event until its sheet data is corrected.
        if (!endDate) return false;

        // Hide events whose final day has passed.
        if (endDate < today) return false;

        // Keep the existing homepage behavior of showing events
        // that start within, or continue into, the current month.
        if (startDate && startDate > endOfMonth) return false;

        return true;
      })
      .sort((a, b) => {
        const dateA = a.startDate || a.endDate;
        const dateB = b.startDate || b.endDate;

        return dateA - dateB || a.index - b.index;
      })
      .slice(0, 3);
  };

  const recentTalks = getRecentTalks();

  return (
    <div>
      {/* Header and button */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Talks and Events
        </h2>

        <Link
          to="/allTalksEvents"
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          View All Talks and Events
        </Link>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {talksLoading ? (
          <TalkLoading />
        ) : talksError ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-500">
            <p>
              Error loading talks and events:{" "}
              {talksError?.message}
            </p>
            <p className="mt-2 text-sm">
              Please try refreshing the page.
            </p>
          </div>
        ) : recentTalks.length > 0 ? (
          recentTalks.map(({ item, index }) => (
            <TalkCard
              key={`${item.Title || item.title || "event"}-${
                item.startDate || item.date || ""
              }-${index}`}
              {...item}
            />
          ))
        ) : (
          <div className="rounded-lg bg-gray-50 py-8 text-center">
            <p className="mb-4 text-gray-600">
              No upcoming talks or events this month.
            </p>

            <Link
              to="/allTalksEvents"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              View past events and more →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}