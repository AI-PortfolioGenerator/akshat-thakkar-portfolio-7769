import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactDOM from 'react-dom';
import { 
  CodeBracketIcon, 
  DocumentTextIcon,
  ChartBarIcon, 
  CpuChipIcon, 
  ShieldCheckIcon,
  CommandLineIcon,
  CubeIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ServerIcon,
  PresentationChartLineIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Default colors as fallback
const defaultColors = {
  primary: 'blue',
  secondary: 'purple',
  accent1: 'green',
  accent2: 'red',
  accent3: 'yellow',
  accent4: 'orange'
};

// Helper for GitHub Pages asset paths
const getAssetPath = (path) => {
  if (!path) return '';
  
  // If path is already a full URL, return as is
  if (path.startsWith('http')) return path;
  
  // For relative paths, ensure they work with the baseUrl
  return path.startsWith('./') ? path : `./${path}`;
};

// Helper function to get color styles dynamically
const getColorStyle = (colorName, colors = defaultColors) => {
  const colorMap = {
    'primary': colors?.primary || 'blue',
    'secondary': colors?.secondary || 'purple',
    'accent1': colors?.accent1 || 'green',
    'accent2': colors?.accent2 || 'red',
    'accent3': colors?.accent3 || 'yellow',
    'accent4': colors?.accent4 || 'orange',
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

// Modal Portal Component that renders directly to body
function ModalPortal({ children }) {
  const modalRoot = typeof document !== 'undefined' ? document.body : null;
  const elRef = useRef(null);
  
  if (!elRef.current && typeof document !== 'undefined') {
    elRef.current = document.createElement('div');
    elRef.current.setAttribute('class', 'modal-portal');
  }
  
  useEffect(() => {
    const el = elRef.current;
    if (!modalRoot || !el) return;
    
    modalRoot.appendChild(el);
    
    return () => {
      if (modalRoot.contains(el)) {
        modalRoot.removeChild(el);
      }
    };
  }, [modalRoot]);
  
  if (!elRef.current) return null;
  
  return ReactDOM.createPortal(children, elRef.current);
}

export default function Projects({ projects: projectsFromProps, colors: colorProps }) {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTag, setActiveTag] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [colors, setColors] = useState(defaultColors);
  
  // Initialize colors from props when available
  useEffect(() => {
    if (colorProps) {
      setColors({ ...defaultColors, ...colorProps });
    }
  }, [colorProps]);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  // Handle clicks outside modal to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && isModalOpen) {
        closeModal();
      }
    }
    
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Add a class to the body that we can use to style elements when modal is open
      document.body.classList.add('modal-open');
      
      // Find and modify navbar z-index if it exists
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.zIndex = '1'; // Lower z-index than the modal
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      
      // Restore navbar z-index if needed
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.zIndex = ''; // Reset to default
      }
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      
      // Reset navbar z-index on cleanup
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.zIndex = '';
      }
    };
  }, [isModalOpen]);

  // Animation variants
  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Functions for handling modal
  const handleViewProject = (project) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
    // Use projects from props if available, otherwise fall back to imported data
  const projectsData = projectsFromProps || (data?.projects || { 
    title: "My Projects", 
    subtitle: "Check out some of my recent work", 
    tags: ["All"],
    items: []
  });
  
  // Extract tags from props or fallback
  const tags = projectsData.tags || ["All"];
  
  // State to control showing more projects
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // Map of icon types to icon components
  const iconComponents = {
    codeBracket: CodeBracketIcon,
    documentText: DocumentTextIcon,
    chartBar: ChartBarIcon,
    cpuChip: CpuChipIcon,
    shieldCheck: ShieldCheckIcon,
    commandLine: CommandLineIcon,
    cube: CubeIcon,
    cubeTransparent: CubeIcon, // Mapping to closest available icon
    server: ServerIcon,
    presentationChartLine: PresentationChartLineIcon
  };
  
  // Get project icon based on iconType from data
  const getIconComponent = (iconType) => {
    return iconComponents[iconType] || DocumentTextIcon; // Default to DocumentTextIcon if not found
  };
    // Process projects from data.json to add icon components and fix image paths
  const projects = (projectsData.items || []).map(project => {
    // Fix image paths for GitHub Pages compatibility
    const processedImages = (project.images || []).map(img => getAssetPath(img));
    
    return {
      ...project,
      icon: getIconComponent(project.iconType),
      images: processedImages
    };
  });
  
  // Filter projects based on selected tag or category
  const filteredProjects = activeTag === 'All'
    ? projects
    : activeTag === 'Resume Projects'
    ? projects.filter(project => project.category === 'resume')
    : activeTag === 'Vibe Code'
    ? projects.filter(project => project.category === 'vibe')
    : projects.filter(project => project.tags.includes(activeTag));
  
  return (
    <section id="projects" ref={ref} className={`py-20 ${getColorClass('gray', 50)} relative overflow-hidden`}>
      {/* Animated Programming SVGs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        {/* Code brackets */}
        <motion.div
          className={`absolute ${getColorClass(colors.primary, 600, 'text')} h-16 w-16 top-20 left-[10%]`}
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.div>

        {/* Server icon */}
        <motion.div
          className={`absolute ${getColorClass(colors.accent3, 600, 'text')} h-20 w-20 top-[30%] right-[5%]`}
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        </motion.div>
        
        {/* CPU icon */}
        <motion.div
          className={`absolute ${getColorClass(colors.secondary, 600, 'text')} h-24 w-24 bottom-40 left-[15%]`}
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </motion.div>

        {/* Chart icon */}
        <motion.div
          className={`absolute ${getColorClass(colors.accent2, 600, 'text')} h-16 w-16 top-[60%] right-[20%]`}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </motion.div>
        
        {/* Terminal/CLI */}
        <motion.div
          className={`absolute ${getColorClass(colors.accent4, 600, 'text')} h-20 w-20 bottom-20 right-[10%]`}
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ 
            duration: 7.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modal for Project Details - Rendered through portal to be above navbar */}
        <AnimatePresence>
          {isModalOpen && activeProject && (
            <ModalPortal>
              <motion.div 
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  ref={modalRef}
                  className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col border border-gray-200"
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                {/* Modal header */}                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${activeProject.color} text-white mr-3`}>
                      {React.createElement(activeProject.icon, { className: "w-5 h-5" })}
                    </div>
                    <h2 className="text-2xl font-bold">{activeProject.title}</h2>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Modal body with scrolling */}
                <div className="overflow-y-auto p-6 flex-grow">
                  {/* Project gallery */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {activeProject.images.map((image, idx) => (
                      <motion.div 
                        key={idx}
                        className="rounded-xl overflow-hidden shadow-md h-48 md:h-60"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                      >
                        <div className="w-full h-full overflow-hidden">
                          <motion.img 
                            src={image} 
                            alt={`${activeProject.title} screenshot ${idx + 1}`}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`text-sm px-3 py-1 ${getColorClass('primary', 100)} ${getColorClass('primary', 800, 'text')} rounded-full`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Overview</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{activeProject.longDescription}</p>
                    
                    <h3 className="text-xl font-bold mb-3">Key Features</h3>
                    <ul className="list-disc list-inside space-y-1 mb-6">
                      {activeProject.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="text-gray-700"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.4 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-bold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeProject.technologies.map((tech, idx) => (
                        <motion.span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 + 0.5 }}
                          whileHover={{ backgroundColor: "#e0f2fe", color: "#0369a1" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Modal footer */}
                <div className="border-t border-gray-200 p-6 flex justify-between">
                  <div className="flex gap-4">
                    {projects.findIndex(p => p.id === activeProject.id) > 0 && (
                      <button 
                        onClick={() => {
                          const currentIndex = projects.findIndex(p => p.id === activeProject.id);
                          if (currentIndex > 0) {
                            setActiveProject(projects[currentIndex - 1]);
                          }
                        }}
                        className={`flex items-center ${getColorClass('primary', 600, 'text')} hover:${getColorClass('primary', 800, 'text')}`}
                      >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Previous
                      </button>
                    )}
                    
                    {projects.findIndex(p => p.id === activeProject.id) < projects.length - 1 && (
                      <button 
                        onClick={() => {
                          const currentIndex = projects.findIndex(p => p.id === activeProject.id);
                          if (currentIndex < projects.length - 1) {
                            setActiveProject(projects[currentIndex + 1]);
                          }
                        }}
                        className={`flex items-center ${getColorClass('primary', 600, 'text')} hover:${getColorClass('primary', 800, 'text')}`}
                      >
                        Next
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={activeProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    
                    {activeProject.demo && activeProject.demo !== "#" && (
                      <a 
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center px-4 py-2 ${getColorClass('primary', 600)} text-white rounded-lg hover:${getColorClass('primary', 700)} transition-colors`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                </motion.div>
              </motion.div>
            </ModalPortal>
          )}
        </AnimatePresence>
        
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span 
            className={`${getColorClass('primary', 100)} ${getColorClass('primary', 800, 'text')} text-sm font-medium px-4 py-1 rounded-full inline-block mb-4`}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            MY WORK
          </motion.span>
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="gradient-text">{projectsData.title}</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {projectsData.subtitle}
          </motion.p>
        </div>
        
        {/* Project filter tags */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTag === tag
                ? `${getColorClass('primary', 600)} text-white shadow-md`
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
        
        {/* Projects grid - new alternating layout */}
        <motion.div 
          className="space-y-20 md:space-y-32"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredProjects
            .slice(0, showAllProjects ? filteredProjects.length : Math.min(4, filteredProjects.length))
            .map((project, idx) => (
            <motion.div
              key={project.id}
              className="flex flex-col md:flex-row gap-8 p-6 bg-white rounded-xl shadow-md border border-gray-100 md:items-center"
              variants={fadeInUp}
              custom={idx}
            >
              {/* Project Image Side - Always on top for mobile, alternating on desktop */}
              <motion.div 
                className={`w-full md:w-1/2 bg-white shadow-2xl rounded-2xl overflow-hidden cursor-pointer relative order-1 ${idx % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}
                onClick={() => handleViewProject(project)}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <motion.img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-5 w-full text-white">
                    <p className="font-medium">Click to view details</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Project Info Side - Always below image on mobile, alternating on desktop */}
              <div className={`w-full md:w-1/2 space-y-4 order-2 ${idx % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="flex items-center mb-2">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${project.color} text-white mr-3`}>
                    {React.createElement(project.icon, { className: "w-5 h-5" })}
                  </div>
                  <span className="text-sm font-medium text-gray-500">{project.tags[0]}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                
                <p className="text-gray-600">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4 pt-3">
                  <motion.button
                    onClick={() => handleViewProject(project)}
                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-${colors.primary}-500 to-${colors.primary}-700 text-white rounded-lg hover:from-${colors.primary}-600 hover:to-${colors.primary}-800 transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                    <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                  
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  
                  {project.demo && project.demo !== "#" && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center ${getColorClass('primary', 600, 'text')} hover:${getColorClass('primary', 800, 'text')} transition-colors duration-300`}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View More/Less button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {filteredProjects.length > 4 && (
            <motion.button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white ${getColorClass('primary', 600)} hover:${getColorClass('primary', 700)} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${getColorClass('primary', 500, 'ring')} transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllProjects ? "Show Less" : "View More Projects"}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showAllProjects ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
              </svg>
            </motion.button>
          )}
        </motion.div>
      </div>
      
      {/* Animated Blobs */}
      <div className={`absolute top-0 -left-4 w-64 h-64 ${getColorClass('secondary', 300)} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
      <div className={`absolute top-40 -right-4 w-72 h-72 ${getColorClass('accent2', 300)} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
      <div className={`absolute -bottom-8 left-40 w-80 h-80 ${getColorClass('primary', 300)} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>
      <div className={`absolute top-1/2 right-1/4 w-60 h-60 ${getColorClass('accent3', 300)} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000`}></div>

      {/* Animation styles */}
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
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
      
      {/* Global styles for modal to appear above navbar */}
      <style jsx global>{`
        body.modal-open header {
          z-index: 1 !important; /* Ensure navbar stays below the modal overlay */
        }
        
        /* This ensures the modal overlay is attached to the viewport */
        .fixed.inset-0.z-\\[9999\\] {
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
        }
      `}</style>
    </section>
  );
}
