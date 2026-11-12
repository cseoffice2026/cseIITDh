import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const ContactPoints = lazy(() =>
  import("../components/ContactUs/ContactPoints")
);
const ContactUsFaq = lazy(() => import("../components/ContactUs/ContactUsFaq"));
const ContactUsForm = lazy(() =>
  import("../components/ContactUs/ContactUsForm")
);
const ContactUsSocialMediaSection = lazy(() =>
  import("../components/ContactUs/ContactUsSocialMediaSection")
);
const DepartmentAddress = lazy(() =>
  import("../components/ContactUs/DepartmentAddress")
);
const LocationAndDirections = lazy(() =>
  import("../components/ContactUs/LocationAndDirections")
);

const fallback = <Loading className="py-8" />;

const Contact = () => {
  return (
    <div className="py-6 px-4 md:px-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-600 mt-2">
          Get in touch with the Department of Computer Science and Engineering
          at IIT DHARWAD
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Address and General Contact */}
        <Suspense fallback={fallback}>
          <DepartmentAddress />
        </Suspense>

        {/* Middle Column - Specific Contact Points */}
        <Suspense fallback={fallback}>
          <ContactPoints />
        </Suspense>

        {/* Right Column - Map and Directions */}
        <Suspense fallback={fallback}>
          <LocationAndDirections />
        </Suspense>
      </div>

      {/* FAQ Section */}
      <Suspense fallback={fallback}>
        <ContactUsFaq />
      </Suspense>

      {/* Contact Form Section
      <Suspense fallback={fallback}>
        <ContactUsForm />
      </Suspense> */}
      

      {/* Social Media Section 
      <Suspense fallback={fallback}>
        <ContactUsSocialMediaSection />
      </Suspense>*/}
    </div>
  );
};

export default Contact;
