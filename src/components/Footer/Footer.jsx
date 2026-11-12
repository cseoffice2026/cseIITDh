
import { Link } from "react-router-dom";
import {
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const footerLinkGroups = [
  {
    title: "Explore",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Programmes", to: "/programmes/btech" },
      { label: "Admissions", href: "https://iitdh.ac.in/admissions" },
    ],
  },
  {
    title: "People",
    links: [
      { label: "News", to: "/allnews" },
      { label: "Faculty", to: "/people" },
      { label: "Students", to: "/people/students" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Research", to: "/research" },
      { label: "Talks & Events", to: "/allTalksEvents" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

function FooterLink({ link }) {
  const className =
    "text-sm text-brand-100 transition-colors hover:text-white hover:underline underline-offset-4";

  return link.to ? (
    <Link to={link.to} className={className}>
      {link.label}
    </Link>
  ) : (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} inline-flex items-center gap-1`}
    >
      {link.label}
      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
    </a>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-[#19007B] text-brand-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-7 sm:px-8 lg:px-10">

        {/* Department Branding */}
        <div className="flex items-center gap-4 border-b border-white/20 pb-5">
          <a
            href="https://www.iitdh.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit the IIT Dharwad main website"
            className="shrink-0 rounded bg-white p-1.5"
          >
            <img
              src="https://thumb.wikimedia.org/wikipedia/en/thumb/9/98/IIT_Dharwad.svg/500px-IIT_Dharwad.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
              alt="IIT Dharwad logo"
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
          </a>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-200">
              Department of Computer Science and Engineering
            </p>
            <h3 className="mt-1.5 text-xl font-bold text-white">
              Indian Institute of Technology Dharwad
            </h3>
          </div>
        </div>

        {/* Five-column footer layout */}
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 py-8 md:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_2rem_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,0.85fr)] xl:gap-x-4">

          {/* 1. Visit Us */}
          <section className="min-w-0 xl:col-start-1">
            <h3 className="mb-5 text-sm font-bold text-white">
              Visit Us
            </h3>

            <address className="space-y-1.5 text-sm not-italic leading-relaxed text-brand-100">
              <p>Permanent Campus, Chikkamalligawad</p>
              <p>Dharwad - 580011, Karnataka, India</p>
            </address>

            <div className="mt-5 space-y-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Indian+Institute+of+Technology+Dharwad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-brand-100 transition-colors hover:text-white"
              >
                <img
                  src="/map.png"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 object-contain"
                />
                Location
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://www.iitdh.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-100 transition-colors hover:text-white"
              >
                 <img
                  src="https://thumb.wikimedia.org/wikipedia/en/thumb/9/98/IIT_Dharwad.svg/500px-IIT_Dharwad.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 object-contain"
                />
                IIT Dharwad Main Site
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>

          {/* 2. Contact Us */}
          <section className="min-w-0 xl:col-start-2">
            <h3 className="mb-5 text-sm font-bold text-white">
              Contact Us
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:cse.office@iitdh.ac.in"
                  className="flex items-start gap-2 text-sm text-brand-100 transition-colors hover:text-white"
                >
                  <EnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                  <span className="break-all">
                    cse.office@iitdh.ac.in
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+918362309624"
                  className="flex items-center gap-2 text-sm text-brand-100 transition-colors hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-brand-300" />
                  +91 836 230 9624
                </a>
              </li>
            </ul>
          </section>

          {/* 3. Explore */}
          <nav className="min-w-0 xl:col-start-4" aria-label="Explore links">
            <h3 className="mb-5 text-sm font-bold text-white">
              Explore
            </h3>

            <ul className="space-y-4">
              {footerLinkGroups[0].links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>

          {/* 4. People */}
          <nav className="min-w-0 xl:col-start-5" aria-label="People links">
            <h3 className="mb-5 text-sm font-bold text-white">
              People
            </h3>

            <ul className="space-y-4">
              {footerLinkGroups[1].links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>

          {/* 5. Discover */}
          <nav className="min-w-0 xl:col-start-6" aria-label="Discover links">
            <h3 className="mb-5 text-sm font-bold text-white">
              Discover
            </h3>

            <ul className="space-y-4">
              {footerLinkGroups[2].links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-4">
          <div className="flex flex-col gap-2 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {currentYear} Department of CSE, IIT Dharwad.
              All rights reserved.
            </p>

            <p className="text-brand-300">
              Indian Institute of Technology Dharwad
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
