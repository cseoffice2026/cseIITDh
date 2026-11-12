const curriculumPdfUrl =
  "https://www.iitdh.ac.in/sites/default/files/2025-12/CSE.pdf";

const batches = [2024, 2025, 2026];

function MTechCurriculum() {
  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
     <p className="text-base leading-7 text-gray-800">
  The M.Tech. curriculum is available for the respective incoming batches.
</p>

<ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-7">
  {batches.map((batch) => (
    <li key={batch}>
      <a
        href={curriculumPdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-600 hover:text-brand-800"
      >
        Here
      </a>{" "}
      is the curriculum for the M.Tech. <span className="font-bold text-gray-800">{batch}</span> incoming batch.
    </li>
  ))}
</ul>
    </section>
  );
}

export default MTechCurriculum;
