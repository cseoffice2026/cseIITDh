import { Fragment } from "react";
import Section from "../Section";
import MarkDownLink from "./MarkdownLink";

export default function PhDSection({ phd_admission }) {
  return (
    <Section id="phd" title="PhD Admission - Computer Science and Engineering">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-8">
          {phd_admission.program_overview && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {phd_admission.program_overview.heading}
              </h3>
              <p className="text-gray-700 mb-3">
                {phd_admission.program_overview.description}
              </p>
            </div>
          )}

          {phd_admission.important_dates && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {phd_admission.important_dates.heading}
              </h3>
              <ul className="list-none space-y-1 text-gray-700">
                {phd_admission.important_dates.dates.map((dateItem, index) => (
                  <li key={index}>
                    <span className="font-medium">{dateItem.event}</span>{" "}
                    {dateItem.date}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {phd_admission.qualifying_degree && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {phd_admission.qualifying_degree.heading}
              </h3>
              <p className="text-gray-700">
                {phd_admission.qualifying_degree.degree}
              </p>

              {phd_admission.qualifying_degree.minimum_score && (
                <h4 className="font-medium mt-4 mb-2">
                  {phd_admission.qualifying_degree.minimum_score.heading}
                </h4>
              )}
              <p className="text-gray-700 mb-2">
                {
                  phd_admission.qualifying_degree.minimum_score.general
                    .description
                }
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                {phd_admission.qualifying_degree.minimum_score.general.criteria.map(
                  (criterion, index) => (
                    <li key={index}>{criterion}</li>
                  )
                )}
              </ul>
              <p className="text-gray-700">
                {phd_admission.qualifying_degree.minimum_score.sc_st_pwd}
              </p>

              {phd_admission.qualifying_degree
                .eligibility_applicants_final_phase && (
                <h4 className="font-medium mt-4 mb-2">
                  {
                    phd_admission.qualifying_degree
                      .eligibility_applicants_final_phase.heading
                  }
                </h4>
              )}
              <p className="text-gray-700">
                {
                  phd_admission.qualifying_degree
                    .eligibility_applicants_final_phase.description
                }
              </p>
              <p className="text-gray-700 mt-2">
                {
                  phd_admission.qualifying_degree
                    .eligibility_applicants_final_phase.note
                }
              </p>
            </div>
          )}

          {phd_admission.selection_process && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {phd_admission.selection_process.heading}
              </h3>
              <p className="text-gray-700 mb-3">
                {phd_admission.selection_process.description}
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {phd_admission.selection_process.rounds.map((round, index) => (
                  <li key={index}>
                    <span className="font-medium">{round.round}</span>{" "}
                    {round.details}
                  </li>
                ))}
              </ol>
              <p className="text-gray-700 mt-3">
                The candidates are encouraged to check the Institute website{" "}
                <MarkDownLink text={phd_admission.selection_process.note} />{" "}
                from time to time. Selection committee decisions are final in
                all matters including any disciplinary matters/malpractice.
              </p>
            </div>
          )}

          {/*phd_admission.research_areas && (
              <div>
                <h3 className="text-xl font-semibold mb-3">{phd_admission.research_areas.heading}</h3>
                <p className="text-gray-700 mb-3">{phd_admission.research_areas.description}</p>

                <div className="space-y-4">
                  {phd_admission.research_areas.areas.map((area, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">{area.area}</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {area.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )*/}

          {phd_admission.financial_assistance && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {phd_admission.financial_assistance.heading}
              </h3>
              <div className="space-y-3">
                {phd_admission.financial_assistance.assistance.map(
                  (item, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">{item.type}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {phd_admission.syllabus_selection_process && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {phd_admission.syllabus_selection_process.heading}
              </h3>
              <div className="space-y-3">
                {phd_admission.syllabus_selection_process.topics.map(
                  (topic, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-1">{topic.topic}</h4>
                      <p className="text-sm text-gray-600">{topic.details}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {phd_admission.updates && (
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {phd_admission.updates.heading}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  {
                    phd_admission.updates.contact_information.split(
                      "contact "
                    )[0]
                  }
                  contact{" "}
                  <MarkDownLink
                    text={
                      phd_admission.updates.contact_information.split(
                        "contact "
                      )[1]
                    }
                  />
                </li>
              </ul>

              {phd_admission.international_applicants && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">
                    {phd_admission.international_applicants.heading}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {
                      phd_admission.international_applicants.description.split(
                        " ["
                      )[0]
                    }
                    <MarkDownLink
                      text={
                        phd_admission.international_applicants.description.split(
                          " ["
                        )[1]
                      }
                    />
                  </p>
                </div>
              )}

              {phd_admission.dia_fellowship_scheme && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">
                    {phd_admission.dia_fellowship_scheme.heading}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {phd_admission.dia_fellowship_scheme.description}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Website -{" "}
                    {phd_admission.dia_fellowship_scheme.websites.map(
                      (website, index) => (
                        <Fragment key={index}>
                          <MarkDownLink text={website} />
                          {index <
                          phd_admission.dia_fellowship_scheme.websites.length -
                            1
                            ? " and "
                            : ""}
                        </Fragment>
                      )
                    )}
                    <br />
                    DIA YouTube promotional video -{" "}
                    <MarkDownLink
                      text={phd_admission.dia_fellowship_scheme.youtube_video}
                    />
                  </p>
                </div>
              )}

              {phd_admission.contact && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    {phd_admission.contact.split("contact ")[0]}contact{" "}
                    <MarkDownLink
                      text={phd_admission.contact.split("contact ")[1]}
                    />
                  </p>
                </div>
              )}
            </div>
          )}

          {phd_admission.apply_link && (
            <div className="mt-6">
              <MarkDownLink text={phd_admission.apply_link} />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
