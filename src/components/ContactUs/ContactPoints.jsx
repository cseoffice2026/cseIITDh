export default function ContactPoints() {
  return (
    <div className="md:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 h-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Contact Points
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Department Office
            </h3>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:cse.office@iitdh.ac.in"
                className="text-brand-600 hover:underline"
              >
                cse.office@iitdh.ac.in
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Head CSE</h3>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:head.cse@iitdh.ac.in"
                className="text-brand-600 hover:underline"
              >
                head.cse@iitdh.ac.in
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              PG Admissions (CSE)
            </h3>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:pgadmissions.cse@iitdh.ac.in"
                className="text-brand-600 hover:underline"
              >
                pgadmissions.cse@iitdh.ac.in
              </a>
            </p>
          </div>

          <h3 className="font-semibold text-gray-800 mb-2">
            Training and Placement Officer (TPO)
          </h3>

          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto:tpo@iitdh.ac.in"
              className="text-brand-600 hover:underline"
            >
              tpo@iitdh.ac.in
            </a>
            <br />
            <span className="ml-[3.2rem]">
              <a
                href="mailto:sameerjoshi@iitdh.ac.in"
                className="text-brand-600 hover:underline"
              >
                sameerjoshi@iitdh.ac.in
              </a>
            </span>
          </p>


          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Associate Dean R&D, Projects
            </h3>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:adean.rnd@iitdh.ac.in"
                className="text-brand-600 hover:underline"
              >
                adean.rnd@iitdh.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
