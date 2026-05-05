import React, { useState, useEffect } from 'react';

const Navbar = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav id="navbar" className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">DEV</span>
          <span className="logo-dot">.</span>
          <span className="logo-sub">PORT</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <ul className="nav-links">
          {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`} 
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
              >
                {section.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="nav-status">
            <span className="status-dot"></span>
            <span className="status-text">AVAILABLE FOR HIRE</span>
          </div>
          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={onOpenResume}>
            <span className="btn-glow"></span>
            <span className="btn-text">RESUME</span>
          </button>
        </div>
        <button 
          id="menu-toggle" 
          className="menu-toggle" 
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span style={isMenuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}}></span>
          <span style={isMenuOpen ? { opacity: 0 } : {}}></span>
          <span style={isMenuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}}></span>
        </button>

        <div id="mobile-menu" className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <a 
                  href={`#${section}`} 
                  className="mobile-link"
                  onClick={toggleMenu}
                >
                  {section.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => { onOpenResume(); toggleMenu(); }}>
              <span className="btn-glow"></span>
              <span className="btn-text">INTERACTIVE RESUME</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
