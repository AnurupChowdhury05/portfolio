import React from 'react';
import TerminalFeed from './TerminalFeed';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="section-header">
        <span className="section-num">01</span>
        <h2 className="section-title">ABOUT ME</h2>
        <div className="section-line"></div>
      </div>
      <div className="about-grid">
        <div className="about-text reveal">
          <p className="about-intro">
            Hey — I'm <strong>Anurup Chowdhury</strong>, a full-stack engineer who lives at the edge of technology.
          </p>
          <p>
            I architect and build intelligent systems — from high-performance APIs and real-time data pipelines
            to AI-powered applications that actually make a difference. My philosophy is simple: <em>ship fast, think deeply, build to last.</em>
          </p>
          <p>
            When I'm not writing code, I'm experimenting with language models, tinkering with embedded systems,
            or sketching out the next big idea on a whiteboard.
          </p>
          <div className="about-badges">
            <span className="badge">🛰️ Remote-First</span>
            <span className="badge">⚡ Open Source</span>
            <span className="badge">🤖 AI Enthusiast</span>
            <span className="badge">🔐 Security Minded</span>
          </div>
        </div>
        <div className="about-card-stack reveal">
          <div className="info-card glass-card">
            <div className="card-icon">📍</div>
            <div>
              <div className="card-label">LOCATION</div>
              <div className="card-value">Kolkata,West Bengal,India</div>
            </div>
          </div>
          <div className="info-card glass-card">
            <div className="card-icon">🎓</div>
            <div>
              <div className="card-label">EDUCATION</div>
              <div className="card-value">B.Tech Computer Science</div>
            </div>
          </div>
          <div className="info-card glass-card">
            <div className="card-icon">💼</div>
            <div>
              <div className="card-label">FOCUS</div>
              <div className="card-value">Full-Stack + AI Systems</div>
            </div>
          </div>
          <div className="info-card glass-card">
            <div className="card-icon">🚀</div>
            <div>
              <div className="card-label">STACK</div>
              <div className="card-value">React · Node · Python · GCP</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Terminal Feed integrated into the About section */}
      <div style={{ marginTop: '3rem' }}>
        <TerminalFeed />
      </div>
    </section>
  );
};

export default About;
