import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';
import BootScreen from './components/BootScreen';
import ResumeModal from './components/ResumeModal';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // If it's a skill bar, trigger the level fill
          if (entry.target.classList.contains('skill-bar')) {
            const fill = entry.target.querySelector('.skill-fill');
            if (fill) fill.style.width = entry.target.getAttribute('data-level') + '%';
          }
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}
      <CustomCursor />
      <ParticleCanvas />
      <div className="grid-overlay"></div>
      
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
