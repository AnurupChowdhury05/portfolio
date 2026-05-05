import React from 'react';
import { useTilt } from '../hooks/useTilt';

const TiltCard = ({ children, className, id }) => {
  const tiltRef = useTilt({ max: 8, scale: 1.02, speed: 500 });
  
  return (
    <div ref={tiltRef} className={className} id={id}>
      {children}
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="projects section">
      <div className="section-header">
        <span className="section-num">03</span>
        <h2 className="section-title">FEATURED PROJECTS</h2>
        <div className="section-line"></div>
      </div>

      <div className="projects-grid">

        {/* FEATURED: F.R.I.D.A.Y. AI Assistant */}
        <TiltCard className="project-card glass-card featured reveal" id="project-friday">
          <div className="project-badge">FEATURED</div>
          <div className="project-preview">
            <img src={`${import.meta.env.BASE_URL}projects/friday-assistant.png`} alt="F.R.I.D.A.Y. AI Assistant" className="project-img" />
          </div>
          <div className="project-body">
            <div className="project-top">
              <div className="project-icon">🤖</div>
              <div className="project-links">
                <a href="https://github.com/AnurupChowdhury05" target="_blank" rel="noreferrer" className="proj-link" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg></a>
                <a href="#" className="proj-link" aria-label="Live Demo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg></a>
              </div>
            </div>
            <h3 className="project-title">F.R.I.D.A.Y. AI Assistant</h3>
            <p className="project-desc">
              Iron Man-inspired agentic AI assistant with LangGraph multi-agent orchestration,
              real-time SSE streaming, voice interaction, and a cinematic HUD interface with
              clap-to-wake dormant mode. Trilingual support (EN/HI/BN).
            </p>
            <div className="project-tags">
              <span className="tag">Next.js</span>
              <span className="tag">FastAPI</span>
              <span className="tag">LangGraph</span>
              <span className="tag">Gemini</span>
              <span className="tag">Web Speech API</span>
            </div>
            <div className="project-metrics">
              <div className="metric"><span className="metric-val">Multi-Agent</span><span className="metric-lbl">Orchestration</span></div>
              <div className="metric"><span className="metric-val">Real-time</span><span className="metric-lbl">SSE Streaming</span></div>
              <div className="metric"><span className="metric-val">3 Lang</span><span className="metric-lbl">Trilingual</span></div>
            </div>
          </div>
        </TiltCard>

        {/* AI Workflow Builder */}
        <TiltCard className="project-card glass-card reveal" id="project-workflow">
          <div className="project-preview">
            <img src={`${import.meta.env.BASE_URL}projects/workflow-builder.png`} alt="AI Workflow Builder" className="project-img" />
          </div>
          <h3 className="project-title">AI Workflow Builder</h3>
          <p className="project-desc">
            Enterprise-grade visual AI orchestration platform with DAG-based execution engine,
            AI Copilot, visual debugger, secrets vault, and a cyberpunk-themed interface.
          </p>
          <div className="project-tags">
            <span className="tag">React</span>
            <span className="tag">Node.js</span>
            <span className="tag">WebSocket</span>
            <span className="tag">LangChain</span>
          </div>
        </TiltCard>

        {/* AI Interview Simulator */}
        <TiltCard className="project-card glass-card reveal" id="project-interview">
          <div className="project-preview">
            <img src={`${import.meta.env.BASE_URL}projects/interview-simulator.png`} alt="AI Interview Simulator" className="project-img" />
          </div>
          <h3 className="project-title">AI Interview Simulator</h3>
          <p className="project-desc">
            FAANG-level AI interview platform with system design whiteboard, AST-based
            code profiling, resume RAG, and real-time performance analytics.
          </p>
          <div className="project-tags">
            <span className="tag">Python</span>
            <span className="tag">FastAPI</span>
            <span className="tag">MongoDB</span>
            <span className="tag">Gemini</span>
          </div>
        </TiltCard>

        {/* Sign Language Translator */}
        <TiltCard className="project-card glass-card reveal" id="project-signlang">
          <div className="project-preview">
            <img src={`${import.meta.env.BASE_URL}projects/sign-language.png`} alt="Sign Language Translator" className="project-img" />
          </div>
          <h3 className="project-title">Sign Language Translator</h3>
          <p className="project-desc">
            Real-time sign language recognition system using computer vision and deep learning.
            Webcam-based gesture detection with live text translation output.
          </p>
          <div className="project-tags">
            <span className="tag">Python</span>
            <span className="tag">OpenCV</span>
            <span className="tag">TensorFlow</span>
            <span className="tag">MediaPipe</span>
          </div>
        </TiltCard>

        {/* Fingerprint Voting System */}
        <TiltCard className="project-card glass-card reveal" id="project-voting">
          <div className="project-preview">
            <img src={`${import.meta.env.BASE_URL}projects/fingerprint-voting.png`} alt="Fingerprint Voting System" className="project-img" />
          </div>
          <h3 className="project-title">Fingerprint Voting System</h3>
          <p className="project-desc">
            Secure biometric voting platform with fingerprint authentication,
            tamper-proof ballot submission, real-time election analytics, and admin dashboard.
          </p>
          <div className="project-tags">
            <span className="tag">Python</span>
            <span className="tag">Biometrics</span>
            <span className="tag">SQLite</span>
            <span className="tag">Flask</span>
          </div>
        </TiltCard>

      </div>

      <div className="projects-cta">
        <a href="#" className="btn btn-secondary" id="all-projects-btn">VIEW ALL PROJECTS →</a>
      </div>
    </section>
  );
};

export default Projects;
