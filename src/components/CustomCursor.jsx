import React, { useEffect, useRef } from 'react';
import { playHoverSound, playClickSound } from '../utils/sounds';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTrail = cursorTrailRef.current;

    if (window.matchMedia('(pointer: fine)').matches) {
      const moveCursor = (e) => {
        if (cursor && cursorTrail) {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
          
          setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
          }, 50);
        }
      };

      document.addEventListener('mousemove', moveCursor);

      // We'll use event delegation for hover effects rather than adding listeners to all elements
      const handleMouseOver = (e) => {
        if (e.target.closest('a, button, .skill-tab, .proj-link, .project-card, .info-card')) {
          cursor?.classList.add('hovered');
          cursorTrail?.classList.add('hovered');
          playHoverSound();
        }
      };

      const handleMouseOut = (e) => {
        if (e.target.closest('a, button, .skill-tab, .proj-link, .project-card, .info-card')) {
          cursor?.classList.remove('hovered');
          cursorTrail?.classList.remove('hovered');
        }
      };

      const handleGlobalClick = (e) => {
        if (e.target.closest('a, button, .skill-tab, .proj-link, .project-card, .info-card')) {
          playClickSound();
        }
      };

      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('click', handleGlobalClick);

      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
        document.removeEventListener('click', handleGlobalClick);
      };
    } else {
      if (cursor && cursorTrail) {
        cursor.style.display = 'none';
        cursorTrail.style.display = 'none';
      }

      // Mobile Touch Animation Logic
      const handleTouch = (e) => {
        // e.touches exists on touchstart, e.clientX exists on click
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const dot = document.createElement('div');
        dot.className = 'touch-ripple-dot';
        dot.style.left = clientX + 'px';
        dot.style.top = clientY + 'px';

        const ring = document.createElement('div');
        ring.className = 'touch-ripple-ring';
        ring.style.left = clientX + 'px';
        ring.style.top = clientY + 'px';

        document.body.appendChild(dot);
        document.body.appendChild(ring);

        // Clean up DOM after animation completes
        setTimeout(() => {
          dot.remove();
          ring.remove();
        }, 600);
      };

      document.addEventListener('touchstart', handleTouch);
      // document.addEventListener('click', handleTouch); // Optional, but touchstart gives instant mobile feedback

      return () => {
        document.removeEventListener('touchstart', handleTouch);
      };
    }
  }, []);

  return (
    <>
      <div id="cursor" className="cursor" ref={cursorRef}></div>
      <div id="cursor-trail" className="cursor-trail" ref={cursorTrailRef}></div>
    </>
  );
};

export default CustomCursor;
