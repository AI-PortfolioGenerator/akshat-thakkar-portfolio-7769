import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import data from '../../data.json';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Get site configuration from data.json
  const siteConfig = data.siteConfig;

  // Navigation links with potential dropdowns
  // Portfolio navigation items - only include available sections
  const allNavItems = [
    { name: "About", link: "/#about", available: siteConfig.hasAbout },
    { name: "Skills", link: "/#skills", available: siteConfig.hasSkills },
    { name: "Projects", link: "/#projects", available: siteConfig.hasProjects },
    { name: "Work Experience", link: "/#workexperience", available: siteConfig.hasWorkEx },
    { name: "Contact", link: "/#contact", available: siteConfig.hasContact },
  ];
  
  // Filter navigation items based on availability
  const navItems = allNavItems.filter(item => item.available);

  // Handle scroll effect for transparent to solid header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.nav-dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hardik Songara
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="text-gray-600 group inline-flex items-center transition-all duration-200 font-medium hover:text-blue-600"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button: Get Resume */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://res.cloudinary.com/dzt4vlcde/image/upload/v1747974219/Hardik_Songara_updated_ts8zh1.pdf"
              target="_blank"
              
              className="whitespace-nowrap px-6 py-3 rounded-full bg-yellow-400 text-gray-900 font-medium hover:bg-yellow-300 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
            >
              Get Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - portfolio links and resume */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
      }`}>
        <div className="pt-2 pb-3 space-y-1 bg-white flex flex-col">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-4 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="pt-4 pb-3 bg-white">
          <div className="flex items-center justify-center px-4">
            <a
              href="https://res.cloudinary.com/dzt4vlcde/image/upload/v1747974219/Hardik_Songara_updated_ts8zh1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 rounded-full text-base font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-300 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
            >
              Get Resume
            </a>
          </div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}
