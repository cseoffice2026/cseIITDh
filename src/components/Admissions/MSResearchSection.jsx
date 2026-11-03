import Section from "../Section";
import MarkDownLink from "./MarkdownLink";

export default function MSResearchSection({ ms_admission }) {
  return (
    <Section id="ms" title="Mtech by Research Admission">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {ms_admission.department && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {ms_admission.department.heading}
              </h3>
            </div>
          )}

          {ms_admission.eligibility_admission && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {ms_admission.eligibility_admission.heading}
              </h3>

              <div className="ml-4 mb-4">
                <h4 className="font-semibold mb-2">
                  {ms_admission.eligibility_admission.qualifying_degree.heading}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {ms_admission.eligibility_admission.qualifying_degree.degrees.map(
                    (degree, index) => (
                      <li key={index}>{degree}</li>
                    )
                  )}
                </ul>

                <p className="mt-2 text-gray-700">
                  {
                    ms_admission.eligibility_admission.qualifying_degree
                      .gate_requirement
                  }
                </p>

                <p className="mt-1 text-sm text-gray-600 italic">
                  {
                    ms_admission.eligibility_admission.qualifying_degree
                      .gate_note
                  }
                </p>
              </div>

              {ms_admission.eligibility_admission
                .minimum_eligibility_criteria && (
                <div className="ml-4 mb-4">
                  <h4 className="font-semibold mb-2">
                    {
                      ms_admission.eligibility_admission
                        .minimum_eligibility_criteria.heading
                    }
                  </h4>

                  {ms_admission.eligibility_admission
                    .minimum_eligibility_criteria
                    .minimum_score_qualifying_degree && (
                    <div className="ml-4 mb-3">
                      <h5 className="font-medium mb-1">
                        {
                          ms_admission.eligibility_admission
                            .minimum_eligibility_criteria
                            .minimum_score_qualifying_degree.heading
                        }
                      </h5>
                      <p className="text-gray-700 mb-1">
                        {
                          ms_admission.eligibility_admission
                            .minimum_eligibility_criteria
                            .minimum_score_qualifying_degree.description
                        }
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-2">
                        {ms_admission.eligibility_admission.minimum_eligibility_criteria.minimum_score_qualifying_degree.criteria.map(
                          (criterion, index) => (
                            <li key={index}>{criterion}</li>
                          )
                        )}
                      </ol>
                      <p className="text-gray-700">
                        {
                          ms_admission.eligibility_admission
                            .minimum_eligibility_criteria
                            .minimum_score_qualifying_degree.sc_st_pwd
                        }
                      </p>
                    </div>
                  )}

                  {ms_admission.eligibility_admission
                    .minimum_eligibility_criteria.minimum_score_gate && (
                    <div className="ml-4">
                      <h5 className="font-medium mb-1">
                        {
                          ms_admission.eligibility_admission
                            .minimum_eligibility_criteria.minimum_score_gate
                            .heading
                        }
                      </h5>
                      <p className="text-gray-700">
                        {
                          ms_admission.eligibility_admission
                            .minimum_eligibility_criteria.minimum_score_gate
                            .description
                        }
                      </p>
                      <p className="text-gray-700 mt-1 italic">
                        {
                          ms_admission.eligibility_admission
                            .minimum_eligibility_criteria.minimum_score_gate
                            .note
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}

              {ms_admission.eligibility_admission.applicants_final_phase && (
                <div className="ml-4">
                  <h4 className="font-semibold mb-2">
                    {
                      ms_admission.eligibility_admission.applicants_final_phase
                        .heading
                    }
                  </h4>
                  <p className="text-gray-700">
                    {
                      ms_admission.eligibility_admission.applicants_final_phase
                        .description
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {ms_admission.financial_support_category && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {ms_admission.financial_support_category.heading}
              </h3>
              <p className="text-gray-700 mb-2">
                {ms_admission.financial_support_category.description}
              </p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
                {ms_admission.financial_support_category.categories.map(
                  (category, index) => (
                    <li key={index}>{category}</li>
                  )
                )}
              </ol>
            </div>
          )}

          {ms_admission.selection_process && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {ms_admission.selection_process.heading}
              </h3>
              <p className="text-gray-700 mb-2">
                {ms_admission.selection_process.description}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                {ms_admission.selection_process.rounds.map((round, index) => (
                  <li key={index}>{round}</li>
                ))}
              </ul>
              <p className="text-gray-700 mt-2">
                The candidates are encouraged to check the Institute website{" "}
                <MarkDownLink text={ms_admission.selection_process.note} /> from
                time to time. Selection committee decisions are final in all
                matters.
              </p>
            </div>
          )}

          {ms_admission.focus_areas_research && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {ms_admission.focus_areas_research.heading}
              </h3>
              <p className="text-gray-700 mb-3">
                The applicant may be asked to indicate the choice of research
                topics in order of preference.
              </p>

              <div className="space-y-2 text-gray-700 ml-4">
                {ms_admission.focus_areas_research.areas.map((area, index) => (
                  <div key={index}>
                    <p className="font-medium">{area.area}</p>
                    <p className="ml-4">{area.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ms_admission.important_dates && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {ms_admission.important_dates.heading}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <tbody>
                    {ms_admission.important_dates.dates.map(
                      (dateItem, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-50" : ""}
                        >
                          <td className="px-4 py-2 border">{dateItem.event}</td>
                          <td className="px-4 py-2 border">{dateItem.date}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {ms_admission.contact_information && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <title>Contact Info</title>
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    {ms_admission.contact_information.heading}{" "}
                    <span className="font-semibold">
                      <MarkDownLink
                        text={ms_admission.contact_information.email_general}
                      />
                    </span>
                    .
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    {
                      ms_admission.contact_information.email_cse.split(
                        "email "
                      )[0]
                    }
                    email{" "}
                    <span className="font-semibold">
                      <MarkDownLink
                        text={
                          ms_admission.contact_information.email_cse
                            .split("email ")[1]
                            .split(" with the Subject")[0]
                        }
                      />
                    </span>{" "}
                    with the Subject "Query related to M.Tech. by Research
                    Admissions for CSE".
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
