import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import data from '../../data.json';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CodeBracketIcon, 
  ServerIcon, 
  CommandLineIcon,
  CpuChipIcon,
  CubeIcon,
  LinkIcon,
  CloudIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Get site configuration
  const siteConfig = data.siteConfig;
  
  // Function to get available sections
  const getAvailableSections = () => {
    const sections = [];
    
    if (siteConfig.hasAbout) sections.push('About');
    if (siteConfig.hasProjects) sections.push('Projects');
    if (siteConfig.hasSkills) sections.push('Skills');
    if (siteConfig.hasWorkEx) sections.push('WorkExperience');
    if (siteConfig.hasContact) sections.push('Contact');
    
    return sections;
  };

  // Update year automatically
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Trigger animations when footer comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      } 
    }
  };

  // Collection of SVGs for the background
  const svgCollection = [
    { 
      icon: <EnvelopeIcon className="w-10 h-10" />, 
      color: "text-blue-500", 
      top: 25, 
      left: 8, 
      delay: 0 
    },
    { 
      icon: <ServerIcon className="w-12 h-12" />, 
      color: "text-green-500", 
      top: 65, 
      left: 85, 
      delay: 1.2 
    },
    { 
      icon: <CommandLineIcon className="w-8 h-8" />, 
      color: "text-purple-500", 
      top: 15, 
      left: 80, 
      delay: 0.5 
    },
    { 
      icon: <CodeBracketIcon className="w-14 h-14" />, 
      color: "text-yellow-500", 
      top: 70, 
      left: 15, 
      delay: 2.1 
    },
    { 
      icon: <CpuChipIcon className="w-10 h-10" />, 
      color: "text-pink-500", 
      top: 35, 
      left: 92, 
      delay: 1.7 
    },
    { 
      icon: <CubeIcon className="w-12 h-12" />, 
      color: "text-cyan-500", 
      top: 55, 
      left: 3, 
      delay: 0.8 
    }
  ];

  // Animated floating SVGs
  const FloatingSVG = ({ delay, top, left, icon, color }) => (
    <motion.div
      className={`absolute ${color} opacity-10 md:opacity-20 pointer-events-none z-0`}
      style={{ top: `${top}%`, left: `${left}%` }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 4,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {icon}
    </motion.div>
  );

  // Social media links
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Hardik74658', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ) },
    { name: 'LinkedIn', url: 'https://in.linkedin.com/in/hardik21549', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ) },
    { name: 'Twitter', url: 'https://twitter.com/kano746581', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ) },
    { name: 'Instagram', url: 'https://instagram.com/hardik_21549', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ) }
  ];

  return (
    <footer ref={ref} className="relative m-12 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden pt-16 p-8 rounded-2xl">
      {/* Floating SVGs background */}
      {svgCollection.map((svg, index) => (
        <FloatingSVG 
          key={index}
          delay={svg.delay}
          top={svg.top}
          left={svg.left}
          icon={svg.icon}
          color={svg.color}
        />
      ))}

      {/* Main footer content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* About column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold pb-2 border-b border-gray-700 inline-block">Hardik Songara</h3>
            <p className="text-gray-400 max-w-xs">
              Full Stack Developer & Data Analyst passionate about building scalable, user-centric web solutions and data-driven products.
            </p>
            
            {/* Social icons */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-300 text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  variants={socialVariants}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold pb-2 border-b border-gray-700 inline-block">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {getAvailableSections().map((item, index) => (
                <motion.a
                  key={index}
                  href={`/#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <motion.span 
                    className="opacity-0 group-hover:opacity-100 mr-2"
                    initial={{ width: 0 }}
                    animate={{ width: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    &raquo;
                  </motion.span>
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Projects */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold pb-2 border-b border-gray-700 inline-block">Featured Work</h3>
            <div className="space-y-3">
              <a href="/#projects" className="block group">
                <div className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">Founders Nexus</div>
                <div className="text-gray-500 text-sm">Full Stack Development</div>
              </a>
              <a href="/#projects" className="block group">
                <div className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">Quantum Vista</div>
                <div className="text-gray-500 text-sm">Frontend / UI Design</div>
              </a>
              <a href="/#projects" className="block group">
                <div className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">Data Analysis Dashboard</div>
                <div className="text-gray-500 text-sm">Python / Power BI</div>
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold pb-2 border-b border-gray-700 inline-block">Contact</h3>
            <div className="space-y-3">
              <a href="mailto:hardik.songara.21549@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                <span>hardik.songara.21549@gmail.com</span>
              </a>
              <a href="tel:+91" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-green-500" />
                <span>Available on request</span>
              </a>
              <div className="text-gray-400 flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-red-500" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>

            {/* Call to action */}
            <motion.a
              href="/#contact"
              className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 my-8"
        />

        {/* Bottom footer */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
        >
          <div className="mb-4 md:mb-0">
            © {currentYear} Hardik Songara. All rights reserved.
          </div>
          
          <div className="flex space-x-4 items-center">
            <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <span className="hidden md:inline">•</span>
            <a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </motion.div>
        
        {/* Microcode at the bottom - Little touch of programmer style */}
        <div className="mt-8 text-center">
          <motion.div 
            className="text-xs font-mono opacity-30 tracking-wider"
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          >
            // Designed & Built with 💻 by Hardik Songara 
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
