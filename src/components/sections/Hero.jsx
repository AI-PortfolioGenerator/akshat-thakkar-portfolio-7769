import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data.json'; // Import data from data.json

export default function Hero() {
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
  const getColorStyle = (colorName) => {
    const colorMap = {
      'primary': colors.primary,
      'secondary': colors.secondary,
      'accent1': colors.accent1,
      'accent2': colors.accent2,
      'accent3': colors.accent3,
      'accent4': colors.accent4,
      'blue': 'blue',
      'green': 'green',
      'purple': 'purple',
      'pink': 'pink',
      'yellow': 'yellow',
      'orange': 'orange',
      'gray': 'gray'
    };
    
    return colorMap[colorName] || 'gray';
  };

  // Helper function to get Tailwind color classes
  const getColorClass = (colorName, variant, prefix = 'bg') => {
    const colorValue = getColorStyle(colorName);
    return `${prefix}-${colorValue}-${variant}`;
  };

  // Floating icon animations
  const floatingAnimation = {
    y: {
      yoyo: Infinity,
      duration: 2.5,
      ease: "easeInOut",
      repeatDelay: 0.5,
    }
  };
  
  // Social media links using data from data.json
  const socialLinks = [
    { name: 'GitHub', url: data.personalInfo.github, icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ) },
    { name: 'LinkedIn', url: data.personalInfo.linkedin, icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    ) },
    { name: 'Twitter', url: data.personalInfo.twitter, icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ) }
  ];
  
  const iconVariants = [
    { initial: { y: 0 }, animate: { y: -15 } },
    { initial: { y: 0 }, animate: { y: -10 } },
    { initial: { y: 0 }, animate: { y: -20 } },
    { initial: { y: 0 }, animate: { y: -12 } }
  ];

  return (
    <div className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Decorative elements - floating icons */}
      {/* Floating SVG Icons - Responsive positioning */}
      <motion.div 
        className="absolute top-8 left-4 sm:top-16 sm:left-[8%] md:left-[10%] w-12 h-12 sm:w-16 sm:h-16 z-10"
        initial={iconVariants[0].initial}
        animate={iconVariants[0].animate}
        transition={{ ...floatingAnimation.y, delay: 0 }}
      >
        <svg className={`w-full h-full ${getColorClass('secondary', '500', 'text')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute top-28 left-1/4 sm:top-36 sm:left-[28%] md:left-[30%] w-10 h-10 sm:w-14 sm:h-14 z-10"
        initial={iconVariants[1].initial}
        animate={iconVariants[1].animate}
        transition={{ ...floatingAnimation.y, delay: 0.5 }}
      >
        <svg className={`w-full h-full ${getColorClass('primary', '400', 'text')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute top-16 right-1/4 sm:top-24 sm:right-[22%] md:right-[25%] w-12 h-12 sm:w-16 sm:h-16 z-10"
        initial={iconVariants[2].initial}
        animate={iconVariants[2].animate}
        transition={{ ...floatingAnimation.y, delay: 1 }}
      >
        <svg className={`w-full h-full ${getColorClass('accent2', '400', 'text')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute top-6 right-6 sm:top-16 sm:right-[12%] md:right-[15%] w-10 h-10 sm:w-12 sm:h-12 z-10"
        initial={iconVariants[3].initial}
        animate={iconVariants[3].animate}
        transition={{ ...floatingAnimation.y, delay: 1.5 }}
      >
        <svg className={`w-full h-full ${getColorClass('accent1', '400', 'text')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 2 00-2-2V7a2 2 2 00-2-2H5a2 2 2 00-2 2v12a2 2 2 00-2 2z"></path>
        </svg>
      </motion.div>

      {/* Background colorful blobs - Responsive and non-overlapping */}
      <div className={`absolute top-[7%] right-[8%] w-40 h-40 sm:w-72 sm:h-72 ${getColorClass(colors.primary, '200')} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
      <div className={`absolute top-[18%] left-[10%] w-32 h-32 sm:w-72 sm:h-72 ${getColorClass(colors.accent1, '200')} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
      <div className={`absolute bottom-[8%] right-[18%] w-36 h-36 sm:w-72 sm:h-72 ${getColorClass(colors.accent2, '200')} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
          {/* Hero image/illustration */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative p-5 flex justify-center items-center">
              {/* Main illustration */}
              <img 
                src={'/ProfilePic (2).png'} 
                alt="Profile" 
                className="w-80 mx-auto rounded-full shadow-lg transform transition-transform duration-500 hover:scale-105 object-cover"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))' }}
              />
              {/* Decorative elements */}
              <div className={`absolute -top-4 -right-4 w-8 h-8 sm:w-12 sm:h-12 ${getColorClass(colors.accent2, '400')} rounded-full animate-pulse`}></div>
              <div className={`absolute -bottom-4 -left-4 w-12 h-12 sm:w-20 sm:h-20 ${getColorClass(colors.primary, '500')} bg-opacity-20 rounded-full animate-ping`} style={{animationDuration: '3s'}}></div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-2 sm:px-8 lg:pl-8 lg:pr-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              {data.personalInfo.name.split(' ')[0]}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mt-1">
                {data.personalInfo.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-gray-600 max-w-xl lg:max-w-2xl text-justify lg:text-left">
              {data.personalInfo.title} with hands-on experience in full-stack development (React, FastAPI, MongoDB) and data tools like Python, Excel, and Power BI. Passionate about building scalable solutions and exploring AI/ML to drive real-world impact.
            </p>
            
            {/* Social links with subtle animations */}
            <div className="mt-4 flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 hover:text-white shadow-sm hover:shadow-md transition-all duration-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 * index + 0.8 }}
                  whileHover={{ 
                    scale: 1.15, 
                    color: "#FFFFFF",
                    backgroundColor: "#fff", 
                    background: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
                    rotate: [0, 5, -5, 0],
                    transition: { 
                      duration: 0.15, 
                      ease: [0.33, 1, 0.68, 1],
                      scale: {
                        duration: 0.15,
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      },
                      backgroundColor: { duration: 0.1 }
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full">
              <motion.a 
                href={data.personalInfo.resume}
                className="px-8 py-3 rounded-full bg-white text-lg font-medium text-gray-800 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:bg-yellow-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mx-auto lg:mx-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                target='_blank'
              >
                Get Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave separator for next section */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>

      {/* Add animations to stylesheet */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
