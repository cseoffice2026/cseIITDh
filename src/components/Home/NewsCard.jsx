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
      className={`rounded-2xl border bg-white p-5 text-slate-900 shadow-sm transition-shadow hover:shadow-lg sm:p-6 ${
        featured ? "border-brand-300 ring-1 ring-brand-100" : "border-slate-200"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            {category || "News"}
          </span>
          {featured && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
              Featured
            </span>
          )}
          {status && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
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
          <p className="text-sm text-brand-600">{dateDisplay}</p>
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
        {title}
      </h3>

      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {description}
        </p>
      )}

      {(applicationOpens || applicationDeadline) && (
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {applicationOpens && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Application opens
              </p>
              <p className="mt-1 font-bold text-emerald-800">
                {applicationOpens}
              </p>
            </div>
          )}
          {applicationDeadline && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
                Application deadline
              </p>
              <p className="mt-1 font-bold text-red-800">
                {applicationDeadline}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
        <span className="text-sm text-slate-500">IIT Dharwad</span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-semibold text-brand-600 transition hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
          >
            View Details <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
};

export default NewsCard;
