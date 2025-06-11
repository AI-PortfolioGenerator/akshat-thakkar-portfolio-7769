import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import Loader from './components/ui/Loader'
import './App.css'
import WorkEx from './components/sections/WorkEx'

// Use dynamic import for data.json
let importedData = null;

// Helper for GitHub Pages asset paths - will prepend the correct base URL for GitHub Pages
const getAssetPath = (path) => {
  if (!path) return '';
  
  // If path is already a full URL, return as is
  if (path.startsWith('http')) return path;
  
  // For relative paths, ensure they work with the baseUrl
  return path.startsWith('./') ? path : `./${path}`;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(importedData);
  
  // Access site configuration with fallback
  const siteConfig = data?.siteConfig || {
    hasHero: true,
    hasAbout: true,
    hasSkills: true,
    hasProjects: true,
    hasWorkEx: true,
    hasContact: true
  };
  
  useEffect(() => {
    // Try to load data from multiple sources
    const loadData = async () => {
      try {
        // Try to dynamically import the data first (works in development)
        try {
          const module = await import('./data.json');
          if (module.default) {
            console.log("Successfully loaded data.json using dynamic import");
            processAndSetData(module.default);
            return;
          }
        } catch (importError) {
          console.log("Dynamic import failed, trying fetch instead");
        }
        
        // Try to fetch from relative path (works in GitHub Pages)
        console.log("Trying to fetch data.json from public folder");
        // Use multiple paths for GitHub Pages compatibility
        const dataUrls = [
          './data.json',           // GitHub Pages with base './'
          'data.json',             // Plain relative
          '/data.json',            // Root-relative for development
          window.location.origin + '/data.json' // Full URL as fallback
        ];
        
        let fetchedData = null;
        for (const url of dataUrls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              fetchedData = await response.json();
              console.log(`Successfully loaded data.json from ${url}`);
              processAndSetData(fetchedData);
              return;
            }
          } catch (fetchError) {
            console.log(`Fetch from ${url} failed:`, fetchError);
          }
        }
        
        console.error("Failed to load data.json from all locations");
        // If we reach here, no data could be loaded
        setLoading(false); // Ensure we still remove the loading screen
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false); // Ensure we still remove the loading screen
      } finally {
        // Fallback timeout to ensure loading screen is removed even if all fails
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    
    // Process the loaded data to fix paths for GitHub Pages
    const processAndSetData = (rawData) => {
      if (!rawData) return;
      
      try {
        // Create a deep copy to avoid mutating the original
        const processedData = JSON.parse(JSON.stringify(rawData));
        
        // Process image paths for GitHub Pages compatibility
        if (processedData.personalInfo) {
          // Fix profile image if present
          if (processedData.personalInfo.profileImage) {
            processedData.personalInfo.profileImage = getAssetPath(processedData.personalInfo.profileImage);
          }
        }
        
        // Process project images
        if (processedData.projects && Array.isArray(processedData.projects)) {
          processedData.projects = processedData.projects.map(project => {
            if (project.image) {
              project.image = getAssetPath(project.image);
            }
            return project;
          });
        }
        
        // Set the processed data
        setData(processedData);
        console.log("Data processed for GitHub Pages compatibility");
      } catch (processError) {
        console.error("Error processing data:", processError);
        // Use raw data as fallback
        setData(rawData);
      }
    };
    
    loadData();
  }, [])

  if (loading) {
    return <Loader fullScreen/>
  }

  return (
    <>
      <Header personalInfo={data?.personalInfo} />
      <main>
        {siteConfig.hasHero && <Hero personalInfo={data?.personalInfo} />}
        {siteConfig.hasAbout && <About about={data?.about} />}
        {siteConfig.hasSkills && <Skills skills={data?.skills} colors={data?.colors} />}
        {siteConfig.hasProjects && <Projects projects={data?.projects} colors={data?.colors} />}
        {siteConfig.hasWorkEx && <WorkEx workExperience={data?.workExperience} />}
        {siteConfig.hasContact && <Contact contact={data?.contact} personalInfo={data?.personalInfo} />}
      </main>
      <Footer personalInfo={data?.personalInfo} />
      <ScrollToTop />
    </>
  )
}

export default App
