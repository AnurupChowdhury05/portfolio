import React, { useEffect, useRef } from 'react';
import { useTilt } from '../hooks/useTilt';

const Hero = () => {
  const typewriterRef = useRef(null);
  const statsRef = useRef(null);
  const statNumsRef = useRef([]);
  const tiltRef = useTilt({ max: 20, scale: 1.05, speed: 600 });

  useEffect(() => {
    // Typewriter effect
    const phrases = [
      "Intelligent Systems", 
      "High-Performance APIs", 
      "Neural Architectures",
      "Scalable Backends",
      "Next-Gen UIs"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timeoutId;

    const typeWriter = () => {
      const currentPhrase = phrases[phraseIndex];
      const typewriterElement = typewriterRef.current;
      
      if (!typewriterElement) return;

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; 
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; 
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; 
      }
      
      timeoutId = setTimeout(typeWriter, typingSpeed);
    };
    
    const startTimeout = setTimeout(typeWriter, 1000);

    // Stats counter animation
    let startedCounters = false;
    const statObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !startedCounters) {
        startedCounters = true;
        
        statNumsRef.current.forEach(stat => {
          if (!stat) return;
          const target = parseInt(stat.getAttribute('data-target'));
          const duration = 2000; 
          const increment = target / (duration / 16); 
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            const suffix = stat.getAttribute('data-suffix') || '';
            if (current < target) {
              stat.innerText = Math.ceil(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              stat.innerText = target + suffix; 
            }
          };
          updateCounter();
        });
      }
    }, { threshold: 0.5 });
    
    if (statsRef.current) {
      statObserver.observe(statsRef.current);
    }

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      if (statsRef.current) {
        statObserver.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-tag">
          <span className="tag-line"></span>
          <span id="hero-tag-text">FULL-STACK ENGINEER &amp; AI ARCHITECT</span>
          <span className="tag-line"></span>
        </div>
        <h1 className="hero-name">
          <span className="name-line">Anurup</span>
          <span className="name-line accent">Chowdhury</span>
        </h1>
        <p className="hero-typewriter">
          I build <span id="typewriter" className="typewriter-text" ref={typewriterRef}></span><span className="cursor-blink">|</span>
        </p>
        <p className="hero-desc">
          Designing systems at the intersection of intelligence and engineering —<br/>
          from scalable cloud architectures to adaptive AI pipelines.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary" id="hero-cta-primary">
            <span className="btn-glow"></span>
            <span className="btn-text">VIEW MY WORK</span>
            <svg className="btn-icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" className="btn btn-secondary" id="hero-cta-secondary">
            <span className="btn-text">GET IN TOUCH</span>
          </a>
        </div>
        <div className="hero-stats" ref={statsRef}>
          <div className="stat-item">
            <span className="stat-num" data-target="15" data-suffix="+" ref={el => statNumsRef.current[0] = el}>0</span>
            <span className="stat-label">TECHNOLOGIES</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-num" data-target="5" ref={el => statNumsRef.current[1] = el}>0</span>
            <span className="stat-label">FEATURED PROJECTS</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-num" data-target="500" data-suffix="+" ref={el => statNumsRef.current[2] = el}>0</span>
            <span className="stat-label">GITHUB COMMITS</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="avatar-container" ref={tiltRef}>
          <div className="avatar-ring ring-1"></div>
          <div className="avatar-ring ring-2"></div>
          <div className="avatar-ring ring-3"></div>
          <div className="avatar-orb">
            <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt="Developer Avatar" className="avatar-img" />
            <div className="avatar-scan"></div>
          </div>
          <div className="avatar-data">
            <div className="data-node node-1">
              <span className="node-label">REACT</span>
            </div>
            <div className="data-node node-2">
              <span className="node-label">AI/ML</span>
            </div>
            <div className="data-node node-3">
              <span className="node-label">NODE.JS</span>
            </div>
            <div className="data-node node-4">
              <span className="node-label">CLOUD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span className="scroll-text">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
