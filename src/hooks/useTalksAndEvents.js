import { useQuery } from "@tanstack/react-query";
import { getTalksAndEvents } from "../api/api";

const transformTalksAndEvents = (talks) => {
  /**
   * Parse event dates.
   *
   * Supported formats:
   *   07 Mar 2026
   *   21 Jan
   *   2026-10-11
   *   11/10/2026
   *
   * Dates without a year use the CURRENT year.
   * They are not automatically moved to the next year.
   * For next-year events, specify the year in Google Sheets.
   */
  const parseDate = (dateString, isEndDate = false) => {
    if (!dateString) return null;

    if (dateString instanceof Date) {
      if (Number.isNaN(dateString.getTime())) return null;

      const result = new Date(dateString);

      result.setHours(
        isEndDate ? 23 : 0,
        isEndDate ? 59 : 0,
        isEndDate ? 59 : 0,
        isEndDate ? 999 : 0,
      );

      return result;
    }

    const cleanDate = String(dateString)
      .replace(/\s*\(year not specified\)\s*/i, "")
      .trim();

    if (!cleanDate) return null;

    const currentYear = new Date().getFullYear();
    let result = null;

    // ISO date: YYYY-MM-DD
    const isoMatch = cleanDate.match(
      /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    );

    if (isoMatch) {
      result = new Date(
        Number(isoMatch[1]),
        Number(isoMatch[2]) - 1,
        Number(isoMatch[3]),
      );
    }

    // Numeric date: DD/MM/YYYY or DD-MM-YYYY
    if (!result) {
      const numericMatch = cleanDate.match(
        /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/,
      );

      if (numericMatch) {
        const day = Number(numericMatch[1]);
        const month = Number(numericMatch[2]);
        const year = Number(numericMatch[3]);

        result = new Date(year, month - 1, day);

        // Reject invalid dates.
        if (
          result.getFullYear() !== year ||
          result.getMonth() !== month - 1 ||
          result.getDate() !== day
        ) {
          return null;
        }
      }
    }

    // Text dates: "Oct 11" or "11 Oct 2026"
    if (!result) {
      const hasYear = /\b\d{4}\b/.test(cleanDate);

      const normalizedDate = hasYear
        ? cleanDate
        : `${cleanDate} ${currentYear}`;

      const parsedDate = new Date(normalizedDate);

      if (!Number.isNaN(parsedDate.getTime())) {
        result = new Date(
          parsedDate.getFullYear(),
          parsedDate.getMonth(),
          parsedDate.getDate(),
        );
      }
    }

    if (!result || Number.isNaN(result.getTime())) {
      return null;
    }

    // Keep an event active throughout its final day.
    result.setHours(
      isEndDate ? 23 : 0,
      isEndDate ? 59 : 0,
      isEndDate ? 59 : 0,
      isEndDate ? 999 : 0,
    );

    return result;
  };

  return (
    talks?.map((item) => {
      const startDate = parseDate(
        item.startDate || item.date,
        false,
      );

      const endDate = parseDate(
        item.endDate ||
          item.sortingDate ||
          item.date ||
          item.startDate,
        true,
      );

      return {
        ...item,

        title: item.Title || item.title || "",
        speaker: item.Speaker || item.speaker || null,
        designation: item.designation || null,
        venue: item.venue || null,
        time: item.time || null,

        startDate,
        endDate,

        // Preserve compatibility with existing components.
        date: endDate || startDate,

        dateDisplay:
          startDate && endDate
            ? startDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }) +
              (startDate.toDateString() !== endDate.toDateString()
                ? ` - ${endDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}`
                : "")
            : startDate
              ? startDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : null,

        description: item.description || null,
        links: item.links || null,
      };
    }) || []
  );
};

export function useTalksAndEvents() {
  return useQuery({
    queryKey: ["talks-and-events"],
    queryFn: getTalksAndEvents,
    select: transformTalksAndEvents,
    staleTime: 5 * 60 * 1000,
  });
}