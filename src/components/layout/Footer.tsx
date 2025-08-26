import logo from "@/assets/Logos/digilet-logo-2.svg";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";

const defaultSections = [
  {
    title: "Wallet Features",
    links: [
      { name: "Send Money", href: "/" },
      { name: "Add Money", href: "/" },
      { name: "Withdraw Money", href: "/" },
      { name: "Transaction History", href: "/" },
    ],
  },
  {
    title: "User",
    links: [
      { name: "Profile", href: "/" },
      { name: "Settings", href: "/" },
      { name: "Notifications", href: "/" },
      { name: "Support", href: "/" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "About Us", href: "/" },
      { name: "Careers", href: "/" },
      { name: "Blog", href: "/" },
      { name: "Privacy Policy", href: "/" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <Instagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <Facebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <Twitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <Linkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer = () => {
  const socialLinks = defaultSocialLinks;
  const sections = defaultSections;
  const legalLinks = defaultLegalLinks;
  const copyright = "© 2024 Digilet. All rights reserved.";

  return (
    <section className="p-8 border-t border-t-gray-300">
      <div className="container">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link to="/">
                <img
                  src={logo}
                  alt="Digilet Logo"
                  title="Digilet Logo"
                  className="h-8"
                />
              </Link>
            </div>
            <p className="text-muted-foreground max-w-[70%] text-sm">
              A platform for digital payment wallet solutions for users and
              agents
            </p>
            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary font-medium">
                  <Link to={social.href} aria-label={social.label}>
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid  w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <Link to={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground mt-8 flex flex-col justify-between items-center gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <Link to={link.href}> {link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
