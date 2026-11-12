import useResearchData from "../../hooks/useResearchData";
import GlobalError from "../GlobalError";
import Loading from "../Loading";
import Section from "../Section";

function DepartmentFacilitiesData() {
  const { data, isLoading, isError, error } = useResearchData();
  if (isLoading) return <Loading />;
  if (isError) return <GlobalError error={error} />;

  const filterType = (type, rawData) =>
    rawData?.filter(
      (item) => item?.Type?.toLowerCase() === type?.toLowerCase()
    );

  const rndLabs = filterType("RnD", data).map((lab) => ({
    id: lab.documentId,
    name: lab.Name,
    link: lab.Link,
    img: null,
    imgWidth: null,
    imgHeight: null,
    hiring: false,
  }));

  return (
    <>
   {/*   <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Instructional Labs
        </h3>
        <ul className="list-disc list-inside ml-6 text-gray-700">
          {instructionalLabs.map((labData) => (
            <li key={labData.id}>{labData.lab}</li>
          ))}
        </ul>
      </div>*/}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Research & Development Labs
        </h3>
        <ul className="list-disc list-inside ml-6 text-gray-700">
          {rndLabs.map((lab) => (
            <li key={lab.id} className="mb-2">
              {lab.link ? (
                <a
                  href={lab.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  {lab.name}
                  {lab.img && (
                    <img
                      loading="lazy"
                      src={lab.img}
                      alt="EMA"
                      width={lab.imgWidth}
                      height={lab.imgHeight}
                      className="inline ml-2 align-middle"
                    />
                  )}
                </a>
              ) : (
                lab.name
              )}
              {lab.hiring && (
                <span className="ml-2 text-xs text-green-700 font-semibold">
                  (EMA Lab is hiring now!{" "}
                  <a
                    href="https://www.iitdh.ac.in/emerging-multimedia-and-ai-lab-ema-lab-hiring-were-looking-passionate-researchers-join-us-ms-phd"
                    target="_blank"
                    className="underline"
                    rel="noopener"
                  >
                    Click Here to know more
                  </a>
                  )
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function DepartmentFacilities() {
  return (
    <Section id="labs" title="Department Facilities">
      <DepartmentFacilitiesData />
    </Section>
  );
}
