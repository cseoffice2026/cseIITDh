import { Link } from "react-router-dom";
import {
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const LOGO_URL =
  "https://thumb.wikimedia.org/wikipedia/en/thumb/9/98/IIT_Dharwad.svg/500px-IIT_Dharwad.svg.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail";

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

const linkClass =
  "text-sm text-white/70 transition-colors duration-200 hover:text-accent hover:underline underline-offset-4";

function FooterLink({ link }) {
  return link.to ? (
    <Link to={link.to} className={linkClass}>
      {link.label}
    </Link>
  ) : (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${linkClass} inline-flex items-center gap-1`}
    >
      {link.label}
      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 w-full rounded-t-3xl bg-brand-600 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Left: brand, address, contact */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <a
                href="https://www.iitdh.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the IIT Dharwad main website"
                className="shrink-0 rounded-xl bg-white p-1.5"
              >
                <img
                  src={LOGO_URL}
                  alt="IIT Dharwad logo"
                  className="h-10 w-10 object-contain"
                  loading="lazy"
                />
              </a>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider">
                  Department of Computer Science and Engineering
                </p>
                <p className="text-lg font-semibold">
                  Indian Institute of Technology Dharwad
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPinIcon
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <address className="not-italic leading-relaxed">
                  Permanent Campus, Chikkamalligawad,
                  <br />
                  Dharwad - 580011, Karnataka, India
                </address>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeIcon
                  className="h-5 w-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <a href="mailto:cse.office@iitdh.ac.in" className={linkClass}>
                  cse.office@iitdh.ac.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon
                  className="h-5 w-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <a href="tel:+918362309624" className={linkClass}>
                  +91 836 230 9624
                </a>
              </li>
            </ul>
          </div>

          {/* Right: link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
            {footerLinkGroups.map((group) => (
              <nav key={group.title} aria-label={`${group.title} links`}>
                <h3 className="text-sm font-semibold text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Divider + bottom row */}
        <div className="mt-10 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {currentYear} Department of CSE, IIT Dharwad. All rights
              reserved.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Indian+Institute+of+Technology+Dharwad"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} underline`}
              >
                Location
              </a>
              <a
                href="https://www.iitdh.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} underline`}
              >
                IIT Dharwad Main Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;