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

// Try to import data, but don't crash if it fails
let importedData;
try {
  importedData = require('./data.json');
} catch (e) {
  console.error("Failed to load data.json from import:", e);
  importedData = null;
}

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
        // First try to load from imported data
        if (importedData) {
          console.log("Using imported data.json");
          setData(importedData);
        } else {
          // Try to fetch from public folder
          console.log("Trying to fetch data.json from public folder");
          const response = await fetch('/data.json');
          if (response.ok) {
            const fetchedData = await response.json();
            console.log("Successfully loaded data.json from public folder");
            setData(fetchedData);
          } else {
            console.error("Failed to load data.json from public folder");
            // Use fallback sample data if needed
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        // End loading after data attempt or timeout
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    
    loadData();
  }, [])

  if (loading) {
    return <Loader fullScreen/>
  }

  return (
    <>
      <Header />
      <main>
        {siteConfig.hasHero && <Hero />}
        {siteConfig.hasAbout && <About />}
        {siteConfig.hasSkills && <Skills />}
        {siteConfig.hasProjects && <Projects />}
        {siteConfig.hasWorkEx && <WorkEx />}
        {siteConfig.hasContact && <Contact />}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
