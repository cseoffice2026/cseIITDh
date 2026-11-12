export default function ContactUsFaq() {
  return (
    <div className="mt-10 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800">
            What are the office hours of the CSE department?
          </h3>
          <p className="text-gray-700 mt-1">
            The department office is open Monday to Friday from 9:00 AM to 6:00
            PM. The office remains closed on weekends and public holidays.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">
            How can I schedule a visit to the department?
          </h3>
          <p className="text-gray-700 mt-1">
            To schedule a visit, please email{" "}
            <a
              href="mailto:office.cse@iitdh.ac.in"
              className="text-brand-600 hover:underline"
            >
              office.cse@iitdh.ac.in
            </a>{" "}
            with your details and purpose of visit at least one week in advance.
          </p>
        </div>
        {/* <div>
          <h3 className="font-semibold text-gray-800">
            Is there accommodation available for visitors?
          </h3>
         <p className="text-gray-700 mt-1">
            IIT DHARWAD has a guest house facility for official visitors. For
            booking inquiries, please contact{" "}
            <a
              href="mailto:guesthouse@iitdh.ac.in"
              className="text-brand-600 hover:underline"
            >
              guesthouse@iitdh.ac.in
            </a>
            .
          </p>
        </div>*/}
        <div>
          <h3 className="font-semibold text-gray-800">
            How do I contact a specific faculty member?
          </h3>
          <p className="text-gray-700 mt-1">
            Faculty contact information is available on the People section of
            our website. You can directly email the faculty member using their
            individual email addresses.
          </p>
        </div>
      </div>
    </div>
  );
}
