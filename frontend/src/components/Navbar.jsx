import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Globe, User } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed montserrat top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 group">
          <img
            src="/images/gold-logo.webp"
            alt="Logo"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <a href="/">
          <span className={`text-xl font-bold transition-colors duration-300 ${
            scrolled ? "text-gray-800" : "text-white"
          }`}>
            Brandenbed Living Spaces UG
          </span>
          </a>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center space-x-8">
          {[
            { name: "Properties", href: "#properties" },
            { name: "About Us", href: "#about" },
            { name: "Services", href: "#services" },
            { name: "Contact", href: "#contact" }
          ].map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className={`relative transition-all duration-300 hover:scale-105 ${
                  scrolled 
                    ? "text-gray-700 hover:text-blue-600" 
                    : "text-white/90 hover:text-white"
                } group`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}

          {/* Sign In Button */}
          <li>
            <a 
              href="/login" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </a>
          </li>

          {/* Language Dropdown */}
          <li className="relative">
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100 border border-gray-300"
                  : "text-white/90 hover:bg-white/10 border border-white/20 backdrop-blur-sm"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{language}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                isLanguageOpen ? "rotate-180" : ""
              }`} />
            </button>

            {/* Language Dropdown Menu */}
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[100px] animate-in fade-in slide-in-from-top-2 duration-200">
                {["EN", "DE"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => selectLanguage(lang)}
                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-200 ${
                      language === lang ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
            scrolled
              ? "text-gray-700 hover:bg-gray-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 animate-in slide-in-from-top duration-300">
          <div className="px-6 py-4 space-y-4">
            {[
              { name: "Properties", href: "#properties" },
              { name: "About Us", href: "#about" },
              { name: "Services", href: "#services" },
              { name: "Contact", href: "#contact" }
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 border-b border-gray-100 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-4 space-y-3">
              <a 
                href="/login" 
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </a>
              
              <div className="flex items-center justify-center space-x-4 pt-2">
                <span className="text-gray-600">Language:</span>
                {["EN", "DE"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-md transition-colors duration-300 ${
                      language === lang 
                        ? "bg-blue-100 text-blue-600 font-medium" 
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
