import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, ChartBarIcon, CubeIcon, ServerStackIcon, CpuChipIcon, AcademicCapIcon, CommandLineIcon, CloudIcon, LockClosedIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import data from '../../data.json'; // Import data from data.json

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
    'red': 'red',
    'gray': 'gray'
  };
  
  return colorMap[colorName] || 'gray';
};

// Helper function to get Tailwind color classes
const getColorClass = (colorName, variant, prefix = 'bg') => {
  const colorValue = getColorStyle(colorName);
  return `${prefix}-${colorValue}-${variant}`;
};
// Import React Icons for technology-specific icons
import { 
  FaPython,  
  FaReact, FaBootstrap, FaDatabase,
  FaChartBar, FaFileExcel, FaServer, 
  FaTools, FaUserFriends, FaChartLine, 
  FaCode, FaFlask, FaChartPie
} from 'react-icons/fa';
import { 
  SiNumpy, SiPandas, SiScikitlearn, SiStreamlit, 
  SiReact, SiMongodb, SiMysql, SiFastapi, 
  SiJira, SiGoogleanalytics
} from 'react-icons/si';

import FaJava from '../../assets/icons/skills/java.svg';
import FaHtml5 from '../../assets/icons/skills/html5.svg';
import FaCss3Alt from '../../assets/icons/skills/css3.svg';
import FaJs from '../../assets/icons/skills/javascript.svg';
// Import custom PowerBI icon SVG
import PowerBiIcon from '../../assets/icons/powerbi-icon-new.svg';


// Icon mapping for each skill to ensure visual recognition
const skillIcons = {
  // Programming Languages
  'Java': () => <img src={FaJava} alt="Java" className="w-6 h-6" />,
  'Python': FaPython,
  'HTML5': () => <img src={FaHtml5} alt="HTML5" className="w-6 h-6" />,
  'CSS3': () => <img src={FaCss3Alt} alt="CSS" className="w-6 h-6" />,
  'JavaScript': () => <img src={FaJs} alt="JavaScript" className="w-6 h-6" />,
    // Data Visualization
  'Power BI': () => <img src={PowerBiIcon} alt="Power BI" className="w-6 h-6" />,
  'Excel': FaFileExcel,
  // ML Libraries
  'NumPy': SiNumpy,
  'pandas': SiPandas,
  'scikit-learn': SiScikitlearn,
  'Streamlit': SiStreamlit,
  // Frameworks
  'Bootstrap': FaBootstrap,
  'Flask': FaFlask,
  'React': SiReact,
  'FastAPI': SiFastapi,
  // Database
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  // Product & Analytical Skills (using more abstract icons)
  'Strategy & Roadmapping': FaChartLine,
  'Agile & Scrum': SiJira,
  'User Research & UX Thinking': FaUserFriends,
  'A/B Testing': SiGoogleanalytics,
  'SQL for Analytics': FaDatabase,
  'Data Storytelling': FaChartBar
};

// Get icon for a skill with fallback
const getSkillIcon = (skill) => {
  return skillIcons[skill] || FaCode;
};

// Define skill categories and map to data from data.json
const categories = [
  {
    title: 'Technical Skills',
    icon: CodeBracketIcon,
    color: colors.primary,
    items: data.skills.technical,
  },
  {
    title: 'Data Analysis',
    icon: ChartBarIcon,
    color: colors.secondary,
    items: data.skills.dataAnalysis,
  },
  {
    title: 'Other Skills',
    icon: AcademicCapIcon,
    color: colors.accent1,
    items: data.skills.other,
  }
];

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};
// Floating accent SVGs around Skills section using theme colors
const floatingSvgs = [
  { icon: CodeBracketIcon, color: getColorClass(colors.primary, '500', 'text'), style: { top: '10%', left: '15%', width: 40, height: 40 }, delay: 0 },
  { icon: CubeIcon, color: getColorClass(colors.accent2, '500', 'text'), style: { top: '30%', right: '5%', width: 40, height: 40 }, delay: 0.5 },
  { icon: ChartBarIcon, color: getColorClass(colors.primary, '500', 'text'), style: { bottom: '50%', left: '5%', width: 40, height: 40 }, delay: 1 },
  { icon: CpuChipIcon, color: getColorClass(colors.accent3, '500', 'text'), style: { bottom: '5%', right: '15%', width: 40, height: 40 }, delay: 1.5 },
  { icon: CommandLineIcon, color: getColorClass(colors.secondary, '500', 'text'), style: { top: '20%', left: '35%', width: 40, height: 40 }, delay: 0.7 },
  { icon: CloudIcon, color: getColorClass(colors.accent1, '500', 'text'), style: { top: '40%', right: '25%', width: 40, height: 40 }, delay: 1.2 },
  { icon: WrenchScrewdriverIcon, color: getColorClass(colors.accent3, '500', 'text'), style: { bottom: '30%', left: '40%', width: 40, height: 40 }, delay: 0.3 },
  { icon: LockClosedIcon, color: getColorClass(colors.accent4, '500', 'text'), style: { bottom: '20%', right: '30%', width: 40, height: 40 }, delay: 0.9 },
];
// Microcode touches: floating < and > symbols
// const microSvgs = [
//   { char: '<', style: { top: '15%', left: '30%', fontSize: '1rem' }, delay: 0.3 },
//   { char: '>', style: { top: '20%', left: '35%', fontSize: '1rem' }, delay: 0.6 },
//   { char: '<', style: { bottom: '15%', right: '25%', fontSize: '1rem' }, delay: 0.9 },
//   { char: '>', style: { bottom: '10%', right: '20%', fontSize: '1rem' }, delay: 1.2 },
// ];

export default function Skills() {
  return (
  <section id="skills" className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-32 overflow-hidden">
      {/* Floating accent icons */}
      {floatingSvgs.map((f, idx) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={idx}
            className="absolute z-10"
            style={f.style}
            initial={{ y: 0, opacity: 0.7 }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 15, 0],
              opacity: [0.7, 1, 0.7],
              transition: { repeat: Infinity, duration: 4 + f.delay, delay: f.delay }
            }}
               whileHover={{ scale: 1.2 }}
          >
            <div className="p-2 rounded-full bg-white shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
              <Icon className={`w-full h-full ${f.color}`} strokeWidth={1.5} />
            </div>
          </motion.div>
        );
      })}      {/* Background blobs */}
      <div className={`absolute top-0 right-0 w-56 h-56 ${getColorClass(colors.accent1, '100')} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000`} />
      <div className={`absolute bottom-0 left-0 w-64 h-64 ${getColorClass(colors.primary, '100')} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`} />
      {/* Micro floating code symbols
      {microSvgs.map((m, idx) => (
        <motion.div
          key={idx}
          className="absolute text-gray-400"
          style={m.style}
          initial={{ y: 0, opacity: 0.5 }}
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, delay: m.delay }}
        >
          <span className="p-1 bg-white/70 border border-gray-200 rounded shadow-sm transition-all duration-300" style={{ fontSize: m.style.fontSize }}>{m.char}</span>
        </motion.div>
      ))} */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          My Skills
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="group bg-white p-6 rounded-2xl shadow-lg transition-colors duration-500 ease-in-out hover:bg-[#fdadad] hover:text-white hover:z-30 relative"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-3 p-2 bg-gray-100 border border-gray-300 rounded-full flex-shrink-0 transition-colors duration-300 ease-in-out group-hover:bg-[#fdadad] group-hover:border-[#fdadad]">
                  <cat.icon className="w-6 h-6 text-blue-500 transition-colors duration-300 ease-in-out group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 ease-in-out group-hover:text-white">{cat.title}</h3>
              </div>
              <ul className="space-y-3">
                {cat.items.map((skill, j) => {
                  const IconComponent = getSkillIcon(skill);                  return (
                    <li key={j} className="flex items-center text-gray-700 group-hover:text-white">
                      <div className="w-10 h-10 mr-3 flex items-center justify-center bg-gray-50 rounded-full transition-all duration-300 
                        group-hover:bg-white group-hover:shadow-xl transform hover:scale-110 hover:rotate-3">
                        <IconComponent className="w-6 h-6 text-blue-500 group-hover:text-[#fdadad]" />
                      </div>
                      <span className="font-medium">{skill}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animations for blobs */}
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
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
