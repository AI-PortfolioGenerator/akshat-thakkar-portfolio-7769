import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sendEmail } from '../../util/sendmail';
import data from '../../data.json'; // Import data from data.json
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  LinkIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ServerIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send email using the sendEmail function from our utility
      const result = await sendEmail(formData);
      
      setFormStatus({
        submitted: true,
        success: result.success,
        message: result.message
      });
      
      if (result.success) {
        // Reset form fields on success
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Oops! Something went wrong. Please try again later.'
      });
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Get icon component based on iconType from data
  const getIconComponent = (iconType, className = "w-12 h-12") => {
    const iconMap = {
      'envelope': <EnvelopeIcon className={className} />,
      'server': <ServerIcon className={className} />,
      'commandLine': <CommandLineIcon className={className} />,
      'codeBracket': <CodeBracketIcon className={className} />,
      'link': <LinkIcon className={className} />,
      'binary': (
        <div className="font-mono text-xs md:text-sm space-y-1 opacity-60">
          <div>01001100</div>
          <div>10101010</div>
          <div>01010101</div>
        </div>
      )
    };
    
    return iconMap[iconType] || <CodeBracketIcon className={className} />;
  };

  // Animated floating SVGs for visual interest
  const FloatingSVG = ({ delay, top, left, icon, color }) => (
    <motion.div
      className={`absolute ${getColorClass(color, '500', 'text')} opacity-20 md:opacity-30 pointer-events-none z-0`}
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

  // Generate SVG collection from data
  const svgCollection = data.contact.svgCollection.map(svg => ({
    icon: getIconComponent(svg.iconType),
    color: svg.color,
    top: svg.top,
    left: svg.left,
    delay: svg.delay
  }));

  return (
    <section id="contact" ref={ref} className="relative py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Animated code paths in the background */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 Q25,30 50,50 T100,50"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          className="text-blue-500"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
          d="M0,70 Q40,40 70,60 T100,30"
          stroke="currentColor" 
          strokeWidth="0.5"
          fill="none"
          className="text-purple-500"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.7 }}
        />
      </svg>

      {/* Floating SVGs */}
      {svgCollection.map((svg, i) => (
        <FloatingSVG
          key={i}
          delay={svg.delay}
          top={svg.top}
          left={svg.left}
          icon={svg.icon}
          color={svg.color}
        />
      ))}

      {/* Background animated blobs */}
      <div className="absolute top-0 -left-4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with animated reveal */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}        >
          <motion.div 
            className="inline-block"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <EnvelopeIcon className={`w-12 h-12 mx-auto ${getColorClass(colors.primary, '500', 'text')} mb-4`} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">{data.contact.title}</h2>
          <p className="max-w-xl mx-auto text-lg text-gray-600">{data.contact.subtitle}</p>
          
          {/* Animated glowing underline */}          <motion.div 
            className={`h-1 w-24 bg-gradient-to-r from-${colors.primary}-500 to-${colors.secondary}-500 rounded-full mx-auto mt-4`}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Contact content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact information */}
            <motion.div 
              className="lg:col-span-1"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                variants={itemVariants}
              >                <h3 className="text-2xl font-bold mb-6 text-gray-800">{data.contact.info.sectionTitle}</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className={`${getColorClass(data.contact.info.email.color, '100')} p-3 rounded-full mr-4`}>
                      <EnvelopeIcon className={`w-6 h-6 ${getColorClass(data.contact.info.email.color, '600', 'text')}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{data.contact.info.email.label}</p>
                      <p className="text-gray-800 font-medium">{data.contact.info.email.value}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className={`${getColorClass(data.contact.info.phone.color, '100')} p-3 rounded-full mr-4`}>
                      <PhoneIcon className={`w-6 h-6 ${getColorClass(data.contact.info.phone.color, '600', 'text')}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{data.contact.info.phone.label}</p>
                      <p className="text-gray-800 font-medium">{data.contact.info.phone.value}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className={`${getColorClass(data.contact.info.location.color, '100')} p-3 rounded-full mr-4`}>
                      <MapPinIcon className={`w-6 h-6 ${getColorClass(data.contact.info.location.color, '600', 'text')}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{data.contact.info.location.label}</p>
                      <p className="text-gray-800 font-medium">{data.contact.info.location.value}</p>
                    </div>
                  </motion.div>
                    <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-600 mb-4">{data.contact.info.socialMedia.title}</p>                    <div className="flex space-x-4">
                      <motion.a 
                        href={data.personalInfo.github}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        href={data.personalInfo.linkedin}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        href={data.personalInfo.twitter}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact form */}
            <motion.div 
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div 
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Send a Message</h3>

                {formStatus.submitted && (
                  <motion.div 
                    className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} flex items-center`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {formStatus.success ? (
                      <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                    ) : (
                      <ExclamationCircleIcon className="w-5 h-5 mr-2 text-red-500" />
                    )}
                    <p>{formStatus.message}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject of your message"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Your message"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-colors"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg flex items-center justify-center transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-1'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </span>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animation styles for blobs */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
    </section>
  );
}
