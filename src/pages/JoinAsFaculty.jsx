import useJoinAsFacultyData from "../hooks/useJoinAsFacultyData";
import GlobalError from "../components/GlobalError";
import Loading from "../components/Loading";

// Static "How to Apply" card data
const howToApplyCard = {
  id: "how-to-apply",
  title: "How to Apply",
  description: "Click on the button below to get updated application instructions and application form"
};

const JoinAsFacultyData = () => {
  const { data: apiData, isLoading, isError, error } = useJoinAsFacultyData();

  if (isLoading) return <Loading />;
  if (isError) return <GlobalError error={error} />;

  // Combine API data with the static "How to Apply" card
  const allData = [...(apiData || []), howToApplyCard];

  return (
    <div className="space-y-6">
      {allData.map((section) => (
        <section key={section.id || section.documentId} className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {section.Title || section.title}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {section.Description || section.description}
            </p>
            {(section.title === "How to Apply" || section.Title === "How to Apply") && (
              <div className="text-center mt-6">
                <a
                  href="https://www.iitdh.ac.in/faculty-recruitment"
                  className="inline-block bg-[#19007B] text-white px-6 py-3 rounded-md hover:bg-[#140063] transition duration-300 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                </a>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

const JoinAsFaculty = () => {
  return (
    <div className="py-6 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Join as Faculty</h1>
      <p className="text-gray-600 mb-8">
        Build your academic career at IIT DHARWAD's Department of Computer
        Science and Engineering
      </p>
      <JoinAsFacultyData />
    </div>
  );
};

export default JoinAsFaculty;
