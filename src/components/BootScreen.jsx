import React, { useState, useEffect } from 'react';
import { playBootSound } from '../utils/sounds';

const BootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isFading, setIsFading] = useState(false);

  const bootSequence = [
    "INITIALIZING KERNEL...",
    "[OK] Loading Core Modules",
    "[OK] Establishing Secure Connection",
    "Fetching User Data [Anurup Chowdhury]",
    "[OK] AI Subsystems Online",
    "[OK] Rendering Holographic UI",
    "SYSTEM READY."
  ];

  useEffect(() => {
    // Attempt to play boot sound (may be blocked by browser if no prior interaction, but good to have)
    playBootSound();
    
    let delay = 0;
    bootSequence.forEach((line, index) => {
      delay += Math.random() * 300 + 150; // Random delay between 150-450ms
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootSequence.length - 1) {
          setTimeout(() => setIsFading(true), 800);
          setTimeout(() => onComplete(), 1500);
        }
      }, delay);
    });
  }, []);

  return (
    <div className={`boot-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="mac-buttons">
            <span className="mac-btn red"></span>
            <span className="mac-btn yellow"></span>
            <span className="mac-btn green"></span>
          </span>
          <span>ROOT@DEV.PORTFOLIO:~</span>
        </div>
        <div className="terminal-body">
          {lines.map((line, i) => (
            <p key={i} className="typewriter-line">
              <span className="prompt">{'>'}</span> {line}
            </p>
          ))}
          {!isFading && <p className="cursor-blink">_</p>}
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
