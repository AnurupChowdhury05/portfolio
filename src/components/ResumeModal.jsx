import React from 'react';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="resume-header">
          <h2>INTERACTIVE_RESUME</h2>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer" className="btn btn-primary btn-download" onClick={() => alert("Resume download ready!")}>
            <span className="btn-glow"></span>
            <span className="btn-text">DOWNLOAD PDF</span>
          </a>
        </div>
        <div className="resume-body">
          <div className="resume-section">
            <h3>[EDUCATION]</h3>
            <div className="resume-item">
              <h4>B.Tech in Computer Science</h4>
              <span className="resume-date">2020 - 2024</span>
              <p>Specialization in Data Structures, Algorithms, and System Design. Developed real-time Sign Language Translators using Computer Vision and Deep Learning.</p>
            </div>
          </div>
          <div className="resume-section">
            <h3>[CORE_SKILLS]</h3>
            <div className="resume-skills">
              <span className="tag">React/Next.js</span>
              <span className="tag">Node/Express</span>
              <span className="tag">Python/FastAPI</span>
              <span className="tag">LangChain/LangGraph</span>
              <span className="tag">MongoDB/SQL</span>
              <span className="tag">Docker/GCP</span>
              <span className="tag">WebSockets/SSE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
