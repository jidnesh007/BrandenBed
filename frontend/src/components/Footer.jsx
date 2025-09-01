import React from "react";
import { Instagram, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Our Locations", href: "#" },
    { name: "Landlords", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const socialMedia = [
    { name: "Instagram", icon: <Instagram size={20} />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "#" },
    { name: "Twitter", icon: <Twitter size={20} />, href: "#" },
    { name: "Facebook", icon: <Facebook size={20} />, href: "#" },
    { name: "YouTube", icon: <Youtube size={20} />, href: "#" },
  ];

  return (
    <footer className="relative text-white pt-16 pb-8 overflow-hidden">
      {/* Background Image with Black Opacity */}
      <div
        className="absolute inset-0  bg-center"
        style={{
          backgroundImage: "url('/images/berlin3.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              Brandenbed Living Spaces UG
            </h3>
            <p className="text-sm text-gray-400 mb-4">(haftungsbeschränkt)</p>
            <p className="text-gray-300">Berlin</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>Business Registered Address</li>
              <li>Büro</li>
              <li className="pt-2">
                <a
                  href="mailto:contact@brandenbedlivingspaces.com"
                  className="hover:text-white transition-colors"
                >
                  contact@brandenbedlivingspaces.com
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h4 className="font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="group relative w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-white transition-all duration-300 hover:bg-yellow-400 hover:scale-110"
                >
                  {social.icon}
                  <span className="absolute bottom-full mb-2 w-auto px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Brandenbed Living Spaces. All
            rights reserved.
          </p>
          <div className="flex justify-center space-x-4 md:space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Refund Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
