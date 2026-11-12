import useBTechProgrammeCatalogue from "../../hooks/useBTechProgrammeCatalogue";

function BTechProgrammeCatalogue() {
  const { data = [], isLoading, isError, error } = useBTechProgrammeCatalogue();

  const catalogueLink = (link, fallbackLabel) => {
    if (!link) return <span className="text-gray-400">—</span>;
    if (!link.href) return <span>{link.label}</span>;

    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-800 underline decoration-brand-300 underline-offset-2 hover:text-brand-950"
      >
        {link.label || fallbackLabel}
      </a>
    );
  };

  return (
    <section className="mb-8">
      <p className="mb-3 text-sm leading-6 text-gray-700">
        Browse the course catalogue PDFs organized by batch and semester.
      </p>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {isLoading ? (
          <p className="px-5 py-8 text-sm text-gray-600" role="status">
            Loading B.Tech batches and semester catalogues…
          </p>
        ) : isError ? (
          <div className="px-5 py-6 text-sm text-red-800" role="alert">
            <p className="font-semibold">B.Tech catalogue could not be loaded.</p>
            <p className="mt-1">
              {error?.message || "Check that the Google Sheet is publicly readable."}
            </p>
          </div>
        ) : data.length === 0 ? (
          <p className="px-5 py-8 text-sm text-gray-600">
            No B.Tech batch data is available in the connected sheet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full border-collapse text-center text-sm text-gray-900">
              <caption className="sr-only">
                B.Tech batch and semester course catalogue links
              </caption>
              <thead className="bg-[#19007B] text-white">
                <tr>
                  <th scope="col" className="border border-brand-900 px-4 py-3 font-semibold">Batch</th>
                  {Array.from({ length: 8 }, (_, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="whitespace-nowrap border border-brand-900 px-4 py-3 font-semibold"
                    >
                      Semester {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][index]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row) => (
                  <tr key={row.batch} className="odd:bg-white even:bg-gray-50 hover:bg-brand-50">
                    <th scope="row" className="border border-gray-200 px-4 py-4 font-medium">
                      {row.batch}
                    </th>
                    {Array.from({ length: 8 }, (_, index) => (
                      <td key={index} className="border border-gray-200 px-4 py-4">
                        {catalogueLink(row.semesters[index], "View PDF")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default BTechProgrammeCatalogue;
