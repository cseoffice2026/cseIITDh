import Section from "../Section";

export default function MTechSection({ mtech_admission }) {
  return (
    <Section id="mtech" title="M.Tech Admission">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {mtech_admission.mtech_cse && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {mtech_admission.mtech_cse.heading}
              </h3>
              <p className="text-gray-700 mb-3">
                {mtech_admission.mtech_cse.description}
              </p>
            </div>
          )}

          {mtech_admission.eligibility_admission && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {mtech_admission.eligibility_admission.heading}
              </h3>
              {mtech_admission.eligibility_admission.qualifying_degree && (
                <h4 className="font-medium mb-2">
                  {
                    mtech_admission.eligibility_admission.qualifying_degree
                      .heading
                  }
                </h4>
              )}
              <ul className="list-disc list-inside space-y-2 text-gray-700 pl-3">
                {mtech_admission.eligibility_admission.qualifying_degree.degrees.map(
                  (degree, index) => (
                    <li key={index}>{degree}</li>
                  )
                )}
              </ul>
              <p className="mt-2 text-gray-700">
                {
                  mtech_admission.eligibility_admission.qualifying_degree
                    .gate_requirement
                }
              </p>
            </div>
          )}

          {mtech_admission.eligibility_admission
            .minimum_eligibility_criteria && (
            <div>
              <h4 className="font-medium mb-2">
                {
                  mtech_admission.eligibility_admission
                    .minimum_eligibility_criteria.heading
                }
              </h4>
              <p className="text-gray-700 mb-2">
                {
                  mtech_admission.eligibility_admission
                    .minimum_eligibility_criteria.general.description
                }
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 pl-3">
                {mtech_admission.eligibility_admission.minimum_eligibility_criteria.general.criteria.map(
                  (criterion, index) => (
                    <li key={index}>{criterion}</li>
                  )
                )}
              </ul>
              <p className="mt-2 text-gray-700">
                {
                  mtech_admission.eligibility_admission
                    .minimum_eligibility_criteria.sc_st_pwd
                }
              </p>
              <p className="mt-2 text-sm italic text-gray-600">
                {
                  mtech_admission.eligibility_admission
                    .minimum_eligibility_criteria.note
                }
              </p>
            </div>
          )}

          {mtech_admission.selection_process && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {mtech_admission.selection_process.heading}
              </h3>
              <p className="text-gray-700 mb-2">
                {mtech_admission.selection_process.gate_score_requirement}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 pl-3">
                {mtech_admission.selection_process.gate_scores.map(
                  (score, index) => (
                    <li key={index}>{score}</li>
                  )
                )}
              </ul>
              <p className="mt-2 text-gray-700">
                {mtech_admission.selection_process.admission_process}
              </p>
            </div>
          )}

          {mtech_admission.available_seats && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {mtech_admission.available_seats.heading}
              </h3>
              <p className="text-gray-700">
                <strong>{mtech_admission.available_seats.total_seats}</strong>
              </p>
            </div>
          )}

          {mtech_admission.program_structure && (
            <div className="bg-brand-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">
                {mtech_admission.program_structure.heading}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {mtech_admission.program_structure.coursework && (
                  <div className="bg-white p-3 rounded-md">
                    <p className="font-medium">
                      {mtech_admission.program_structure.coursework.heading}
                    </p>
                    <ul className="list-disc list-inside text-sm pl-3">
                      {mtech_admission.program_structure.coursework.details.map(
                        (detail, index) => (
                          <li key={index}>{detail}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {mtech_admission.program_structure.mtech_project && (
                  <div className="bg-white p-3 rounded-md">
                    <p className="font-medium">
                      {mtech_admission.program_structure.mtech_project.heading}
                    </p>
                    <ul className="list-disc list-inside text-sm pl-3">
                      {mtech_admission.program_structure.mtech_project.details.map(
                        (detail, index) => (
                          <li key={index}>{detail}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {mtech_admission.program_structure.additional && (
                  <div className="bg-white p-3 rounded-md">
                    <p className="font-medium">
                      {mtech_admission.program_structure.additional.heading}
                    </p>
                    <ul className="list-disc list-inside text-sm pl-3">
                      {mtech_admission.program_structure.additional.details.map(
                        (detail, index) => (
                          <li key={index}>{detail}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {mtech_admission.core_courses && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {mtech_admission.core_courses.heading}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 pl-3">
                {mtech_admission.core_courses.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          )}

          {mtech_admission.contact && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 mb-3">
                {mtech_admission.contact.heading}
              </p>
              <a
                href={mtech_admission.contact.email.match(/\((.*?)\)/)[1]}
                className="inline-block bg-[#19007B] text-white px-4 py-2 rounded-md hover:bg-[#140063] transition duration-300"
              >
                {mtech_admission.contact.email.match(/\[(.*?)\]/)[1]}
              </a>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
