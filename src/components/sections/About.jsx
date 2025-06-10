import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../../data.json'; // Import data from data.json// Import data from data.json

// Theme colors from data.json
const colors = {
  primary: data.colors.primary,
  secondary: data.colors.secondary,
  accent1: data.colors.accent1,
  accent2: data.colors.accent2,
  accent3: data.colors.accent3,
  accent4: data.colors.accent4
};

// Helper function to get color styles dynamically
const getColorStyle = (colorName, shade) => {
  const colorMap = {
    'blue': '#3b82f6',
    'purple': '#9333ea',
    'pink': '#ec4899',
    'yellow': '#eab308',
    'green': '#22c55e',
    'orange': '#f97316'
  };
  
  return colorMap[colorName] || '#6b7280'; // Default to gray if color not found
};

// Programming-themed floating SVGs
const floatingSvgs = [
  // Code brackets
  <svg className="w-full h-full" fill="none" stroke={getColorStyle(colors.primary)} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  // Terminal
  <svg className="w-full h-full" fill="none" stroke={getColorStyle(colors.accent3)} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
  // Cloud
  <svg className="w-full h-full" fill="none" stroke={getColorStyle(colors.secondary)} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>,
  // CPU
  <svg className="w-full h-full" fill="none" stroke={getColorStyle(colors.accent2)} viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
    <path strokeWidth="2" d="M9 9h6v6H9z" />
    <path strokeWidth="2" d="M9 2v2m0 18v2M2 9h2m18 0h2M2 15h2m18 0h2M15 2v2m0 18v2" />
  </svg>,
  // Lightning bolt
  <svg className="w-full h-full" fill="none" stroke={getColorStyle(colors.accent4)} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
];

// Unique SVGs (open-license, coding/engineering themed)
const svgList = [
  // Laptop/coding
  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke={getColorStyle(colors.primary)} viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="12" rx="2" strokeWidth="2"/><path d="M2 17h20M8 21h8" strokeWidth="2"/></svg>,
  // Gear/engineering
  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke={getColorStyle(colors.accent2)} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" strokeWidth="2"/></svg>,
  // Database
  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke={getColorStyle(colors.secondary)} viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="2"/><path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" strokeWidth="2"/><path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" strokeWidth="2"/></svg>,
  // Lightbulb/idea
  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke={getColorStyle(colors.accent1)} viewBox="0 0 24 24"><path d="M9 18h6m-3 3v-3m0 0a7 7 0 1 0-7-7c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4a7 7 0 1 0-7 7z" strokeWidth="2"/></svg>,
  // Certificate
  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke={getColorStyle(colors.accent3)} viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="2"/><path d="M16 3v4M8 3v4M12 12v2m0 4h.01" strokeWidth="2"/></svg>,
  // Rocket/launch
  <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke={getColorStyle(colors.accent4)} viewBox="0 0 24 24"><path d="M19 11V9a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M15 19l2 2l4-4M7 19h2" strokeWidth="2"/><path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" strokeWidth="2"/></svg>,
];

// Small decorative elements
const miniDecoSvgs = [
  // Code
  <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  // Browser
  <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l9-5 9 5v12l-9 5-9-5V8z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13l-9 5-9-5M12 3v10m0 10V13" />
  </svg>,
  // Stars
  <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>,
  // Document
  <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
];

// Get FAQ content from data.json
const aboutFAQs = data.about.faqs;

export default function About() {
  const [openIndex, setOpenIndex] = useState(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  
  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  // Floating animation for SVGs
  const floatingAnimation = {
    y: {
      yoyo: Infinity,
      duration: index => 2 + index * 0.5,
      ease: "easeInOut",
      repeatDelay: 0.2,
    }
  };

  // Pulse animation for mini decorative elements
  const pulseAnimation = {
    scale: {
      yoyo: Infinity,
      duration: 3,
      ease: "easeInOut",
      values: [1, 1.1, 1],
    },
    opacity: {
      yoyo: Infinity, 
      duration: 3,
      ease: "easeInOut",
      values: [0.5, 0.8, 0.5],
    }
  };

  // Rotation animation for gear-like elements
  const rotateAnimation = {
    rotate: {
      yoyo: Infinity,
      duration: 8,
      ease: "linear", 
      from: 0,
      to: 360,
    }
  };
  
  // Accordion animation variants
  const accordionContent = {
    hidden: { 
      height: 0, 
      opacity: 0,
      transition: { 
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };
  // Toggle FAQ
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // Helper function to map color name to Tailwind color class
  const getColorClass = (colorName, variant) => {
    // This handles dynamic color classes better than template literals with Tailwind
    const colorMap = {
      'blue': {
        '50': 'bg-blue-50',
        '100': 'bg-blue-100',
        '200': 'border-blue-200',
        '500': 'text-blue-500',
        '600': 'text-blue-600',
        'hover': 'hover:bg-blue-50'
      },
      'purple': {
        '50': 'bg-purple-50',
        '100': 'bg-purple-100',
        '200': 'border-purple-200',
        '500': 'text-purple-500',
        '600': 'text-purple-600',
        'hover': 'hover:bg-purple-50'
      },
      'pink': {
        '50': 'bg-pink-50',
        '100': 'bg-pink-100',
        '200': 'border-pink-200',
        '500': 'text-pink-500',
        '600': 'text-pink-600',
        'hover': 'hover:bg-pink-50'
      },
      'yellow': {
        '50': 'bg-yellow-50',
        '100': 'bg-yellow-100',
        '200': 'border-yellow-200',
        '500': 'text-yellow-500',
        '600': 'text-yellow-600',
        'hover': 'hover:bg-yellow-50'
      },
      'green': {
        '50': 'bg-green-50',
        '100': 'bg-green-100',
        '200': 'border-green-200',
        '500': 'text-green-500',
        '600': 'text-green-600',
        'hover': 'hover:bg-green-50'
      },
      'orange': {
        '50': 'bg-orange-50',
        '100': 'bg-orange-100',
        '200': 'border-orange-200',
        '500': 'text-orange-500',
        '600': 'text-orange-600',
        'hover': 'hover:bg-orange-50'
      }
    };

    return colorMap[colorName]?.[variant] || '';
  };

  // Get background color based on state and color
  const getBgColor = (index, color) => {
    if (openIndex === index) {
      return getColorClass(color, '50');
    }
    return 'bg-white hover:bg-gray-50';
  };
  
  // Get text color based on state and color
  const getTextColor = (index, color) => {
    if (openIndex === index) {
      return getColorClass(color, '600').replace('bg-', 'text-');
    }
    return 'text-gray-800';
  };

  // Get border color based on state and color
  const getBorderColor = (index, color) => {
    if (openIndex === index) {
      return getColorClass(color, '200').replace('bg-', 'border-');
    }
    return 'border-gray-100';
  };

  // Get border radius based on state
  const getBorderRadius = (index) => {
    return openIndex === index ? 'rounded-3xl' : 'rounded-full';
  };

  // Chevron/Arrow animation
  const chevronVariants = {
    open: { rotate: 180, transition: { duration: 0.3 } },
    closed: { rotate: 0, transition: { duration: 0.3 } }
  };
  return (
    <section id="about" className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-32 overflow-hidden font-[Inter,sans-serif]">
      {/* Animated SVG Blobs */}
      <div className={`absolute top-[7%] right-[8%] w-40 h-40 sm:w-72 sm:h-72 bg-${colors.primary}-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>      <div className={`absolute top-[18%] left-[10%] w-32 h-32 sm:w-72 sm:h-72 bg-${colors.accent1}-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
      <div className={`absolute bottom-[8%] right-[18%] w-36 h-36 sm:w-72 sm:h-72 bg-${colors.accent2}-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>

      {/* Floating SVG Elements */}
      <motion.div 
        className="absolute top-10 left-[5%] w-10 h-10 sm:w-14 sm:h-14 z-10 opacity-70"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {floatingSvgs[0]}
      </motion.div>
      
      <motion.div 
        className="absolute top-[25%] right-[6%] w-12 h-12 sm:w-16 sm:h-16 z-10 opacity-70"
        animate={{ y: [-15, 5, -15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {floatingSvgs[1]}
      </motion.div>
      
      <motion.div 
        className="absolute bottom-[20%] left-[8%] w-8 h-8 sm:w-12 sm:h-12 z-10 opacity-70"
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {floatingSvgs[2]}
      </motion.div>

      <motion.div 
        className="absolute bottom-[10%] right-[15%] w-10 h-10 sm:w-14 sm:h-14 z-10 opacity-70"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {floatingSvgs[3]}
      </motion.div>

      <motion.div 
        className="absolute top-[60%] left-[70%] w-8 h-8 sm:w-12 sm:h-12 z-10 opacity-70"
        animate={{ y: [-12, 8, -12] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {floatingSvgs[4]}
      </motion.div>

      {/* Mini decorative elements */}
      <motion.div 
        className="absolute top-[15%] left-[20%] w-4 h-4 opacity-30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {miniDecoSvgs[0]}
      </motion.div>
      
      <motion.div 
        className="absolute top-[45%] right-[25%] w-6 h-6 opacity-30"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {miniDecoSvgs[1]}
      </motion.div>
      
      <motion.div 
        className="absolute bottom-[35%] left-[30%] w-5 h-5 opacity-30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {miniDecoSvgs[2]}
      </motion.div>
      
      <motion.div 
        className="absolute top-[75%] right-[12%] w-4 h-4 opacity-30"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {miniDecoSvgs[3]}
      </motion.div>      {/* Heading */}
      <motion.div 
        className="text-center relative z-20"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-3">
          {data.about.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          {data.about.subtitle}
        </p>
      </motion.div>

      {/* FAQ Accordion - Minimal Redesign */}
      <motion.div
        className="max-w-5xl mx-auto mt-12 px-4 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {aboutFAQs.map((faq, index) => (          <motion.div
            key={index}
            layout
            variants={fadeInUp}
            className={`${getBorderRadius(index)} w-full px-8 py-2 shadow-sm overflow-hidden transition-all duration-300 ease-in-out border ${getBorderColor(index, faq.color)} ${getBgColor(index, faq.color)}` }
            style={{ boxShadow: openIndex === index ? `0 4px 15px rgba(0,0,0,0.05)` : 'none' }}
          >
            {/* Question Header */}
            <motion.button
              onClick={() => toggleFAQ(index)}
              className={`w-full flex items-center justify-between p-5 text-left ${getBgColor(index, faq.color)} transition-colors duration-300`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center">                <motion.div 
                  className={`flex-shrink-0 mr-3 p-2 rounded-lg ${openIndex === index ? getColorClass(faq.color, '100') : 'bg-gray-50'} transition-colors duration-300`}
                  animate={index % 2 === 0 ? { y: [0, -4, 0] } : { rotate: [0, 8, 0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {svgList[faq.icon]}
                </motion.div>
                <h3 className={`text-lg font-semibold ${getTextColor(index, faq.color)} transition-colors duration-300`}>
                  {faq.question}
                </h3>
              </div>
              <motion.div
                variants={chevronVariants}
                animate={openIndex === index ? 'open' : 'closed'}
                className={`flex-shrink-0 ${openIndex === index ? getColorClass(faq.color, '500').replace('bg-', 'text-') : 'text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>
            
            {/* Answer Content */}
            <AnimatePresence>
              {openIndex === index && (                <motion.div
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`px-5 pb-5 ${getColorClass(faq.color, '50')} border-t ${getColorClass(faq.color, '100').replace('bg-', 'border-')} rounded-b-xl`}
                >
                  <p className="text-base text-gray-700 pt-3 relative">
                    {/* Small decorative element inside open accordion */}
                    <motion.div 
                      className="absolute -right-2 -top-1 w-6 h-6 opacity-10"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      {svgList[faq.icon]}
                    </motion.div>
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Animations for blobs */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
}
