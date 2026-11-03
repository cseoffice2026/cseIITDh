import Section from "../Section";

export default function BTechSection({ btech_admission }) {
  return (
    <Section id="btech" title="B.Tech Admission">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {btech_admission.program_overview && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {btech_admission.program_overview.heading}
              </h3>
              <p className="text-gray-700 mb-3">
                {btech_admission.program_overview.description}
              </p>
            </div>
          )}

          {btech_admission.admission_process && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {btech_admission.admission_process.heading}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {btech_admission.admission_process.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {btech_admission.eligibility && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {btech_admission.eligibility.heading}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {btech_admission.eligibility.criteria.map(
                  (criterion, index) => (
                    <li key={index}>{criterion}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {/*btech_admission.important_dates && (
              <div className="bg-indigo-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">{btech_admission.important_dates.heading}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {btech_admission.important_dates.dates.map((item, index) => (
                    <div key={index}>
                      <p className="text-sm font-medium">{item.event}</p>
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )*/}

          {btech_admission.links && (
            <div className="text-center">
              <a
                href={
                  btech_admission.links.jee_advanced_website.match(
                    /\((.*?)\)/
                  )[1]
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 mr-4"
              >
                {
                  btech_admission.links.jee_advanced_website.match(
                    /\[(.*?)\]/
                  )[1]
                }
              </a>
              <a
                href={btech_admission.links.josaa_portal.match(/\((.*?)\)/)[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                {btech_admission.links.josaa_portal.match(/\[(.*?)\]/)[1]}
              </a>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
