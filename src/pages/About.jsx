import useAboutData from "../hooks/useAboutData";
import Loading from "../components/Loading";

const AboutDescription = ({ description }) => {
  if (!Array.isArray(description) || description.length === 0) {
    return null;
  }

  // Generate a unique key for each item
  const getItemKey = (item, idx) => {
    if (item.id) return item.id;
    const text = item?.children?.[0]?.text || "";
    return `${item.type}-${text.slice(0, 10)}-${idx}`;
  };

  const elements = [];

  for (const [index, item] of description.entries()) {
    // Validate item structure
    const isValid =
      item &&
      typeof item.type === "string" &&
      Array.isArray(item.children) &&
      item.children[0]?.text;

    if (!isValid) continue;

    const key = getItemKey(item, index);
    const text = item.children[0].text;

    if (item.type === "paragraph") {
      elements.push(
        <p key={key} className="text-gray-600 leading-relaxed">
          {text}
        </p>
      );
    } else if (item.type === "heading") {
      elements.push(
        <h3 key={key} className="text-xl font-medium text-gray-700 mb-2">
          {text}
        </h3>
      );
    }
  }

  return <>{elements}</>;
};

const AboutData = () => {
  const { data: aboutData, isLoading, isError, error } = useAboutData();

  if (isLoading) return <Loading className="py-8" />;

  if (isError) {
    return (
      <div className="py-6 px-4 md:px-8">
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          <p>Error loading content: {error?.message}</p>
          <p className="text-sm mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {aboutData.map((section) => (
        <section key={section.id} className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {section.Title}
          </h2>
          <div className="space-y-4">
            <AboutDescription description={section?.Description} />
          </div>
        </section>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <div className="py-6 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
      <AboutData />
    </div>
  );
};

export default About;
