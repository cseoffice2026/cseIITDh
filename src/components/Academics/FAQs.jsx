import useAcademicFaq from "../../hooks/useAcademicFaqs";
import Section from "../Section";
import Loading from "../Loading";

function FAQsLoading() {
  return <Loading className="py-8" children="Loading FAQs, please wait..." />;
}

function FAQsError({ error }) {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-3">
        <svg
          className="h-6 w-6 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Error"
        >
          <title>Error</title>
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9l6 6m0-6l-6 6"
          />
        </svg>
        <div>
          <p className="text-red-700 font-semibold text-base mb-1">
            Unable to load FAQs
          </p>
          <p className="text-gray-700 text-sm">
            {error?.message
              ? `Details: ${error.message}`
              : "An unexpected error occurred. Please try again later or contact the Academic Office if the problem persists."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQs() {
  const { data: faqs, isLoading, isError, error } = useAcademicFaq();

  return (
    <Section id="faq" title="Frequently Asked Questions">
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {isLoading && <FAQsLoading />}
          {isError && <FAQsError error={error} />}

          <div className="space-y-6">
            {faqs?.map((faq, index) => (
              <div
                key={faq.id ?? faq.documentId ?? `${faq.question}-${index}`}
                className="border-b border-gray-200 pb-4"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800">
              Still have questions?
            </h3>
            <p className="mt-2 text-gray-600">
              Contact the Academic Office at{" "}
              <a
                href="mailto:academics@cs.iitdh.ac.in"
                className="text-brand-600 hover:underline"
              >
                academicstaff@iitdh.ac.in
              </a>{" "}
              or visit during office hours (Monday-Friday, 9:00 AM - 6:00 PM).
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
