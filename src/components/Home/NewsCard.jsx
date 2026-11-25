import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const NewsCard = ({ item }) => {
  const {
    title,
    dateDisplay,
    description,
    applicationOpens,
    applicationDeadline,
    category,
    status,
    featured,
    link,
  } = item;

  return (
    <article
      className={`rounded-2xl border bg-white p-5 text-slate-900 shadow-[0_4px_14px_rgba(25,0,123,0.08)] transition-shadow hover:shadow-[0_8px_24px_rgba(25,0,123,0.15)] sm:p-6 ${
        featured ? "border-brand-300 ring-1 ring-brand-100" : "border-brand-100"
      }`}
    >
      {/* Tag + status + date */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-600">
            {category || "News"}
          </span>
          {featured && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
              Featured
            </span>
          )}
          {status && (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                status.toLowerCase() === "open"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {status}
            </span>
          )}
        </div>
        {dateDisplay && (
          <p className="text-sm font-medium text-red-600">{dateDisplay}</p>
        )}
      </div>

      {/* Title + description */}
      <h3 className="mt-4 text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
        {title}
      </h3>

      {description && (
        <p className="mt-3 text-base leading-relaxed text-gray-600">
          {description}
        </p>
      )}

      {/* Application dates */}
      {(applicationOpens || applicationDeadline) && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {applicationOpens && (
            <div className="rounded-xl border border-emerald-300/70 bg-gradient-to-br from-emerald-100/90 to-green-50/70 px-4 py-3 shadow-sm shadow-emerald-900/10 backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                Application opens
              </p>
              <p className="mt-1 text-base font-bold text-emerald-950">
                {applicationOpens}
              </p>
            </div>
          )}
          {applicationDeadline && (
            <div className="rounded-xl border border-rose-300/70 bg-gradient-to-br from-rose-100/90 to-red-50/70 px-4 py-3 shadow-sm shadow-rose-900/10 backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-rose-800">
                Application deadline
              </p>
              <p className="mt-1 text-base font-bold text-rose-950">
                {applicationDeadline}
              </p>
            </div>
          )}
        </div>
      )}

      {/* View details */}
      {link && (
        <div className="mt-5 flex justify-end">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
          >
            View Details
            <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </article>
  );
};

export default NewsCard;