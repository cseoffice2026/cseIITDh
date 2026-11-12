
export default function TalkEventCard({
  title,
  eventType,
  speaker,
  designation,
  venue,
  time,
  startDate,
  endDate,
  dateDisplay,
  description,
  links,
}) {
  const formatDate = (value) =>
    value instanceof Date && !Number.isNaN(value.getTime())
      ? value.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : null;

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const formattedDate =
    formattedStartDate &&
    formattedEndDate &&
    formattedStartDate !== formattedEndDate
      ? `${formattedStartDate} – ${formattedEndDate}`
      : formattedStartDate || formattedEndDate || dateDisplay;

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-md sm:p-6">

      {/* Category and date */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
          {eventType || "Talk / Event"}
        </span>

        {formattedDate && (
          <span className="text-sm text-brand-600">
            {formattedDate}
          </span>
        )}
      </div>

      {/* Event title */}
      <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
        {title}
      </h3>

      {/* Speaker details */}
      {speaker && (
        <div className="mt-3">
          <p className="text-base font-medium text-slate-800">
            {speaker}
          </p>

          {designation && (
            <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
              {designation}
            </p>
          )}
        </div>
      )}

      {/* Event information */}
      {(time || venue) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {time && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 text-sm font-medium text-sky-800">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4 shrink-0 text-sky-600"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {time}
            </span>
          )}

          {venue && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4 shrink-0 text-emerald-600"
              >
                <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
                <circle cx="12" cy="10" r="2.2" />
              </svg>
              {venue}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="mt-4 border-t border-slate-100 pt-3">
          <p className="text-base leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
      )}

      {/* Footer */}
      {links && (
        <div className="mt-auto flex justify-end pt-4">
          <a
            href={links}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition hover:text-brand-900"
          >
            View Details
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </article>
  );
}
