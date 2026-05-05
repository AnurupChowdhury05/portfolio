import { useRef, useEffect } from 'react';

export const useTilt = (options = {}) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (!node) return;

    const { max = 15, scale = 1.05, speed = 400 } = options;

    const handleMouseMove = (e) => {
      // Disable on touch devices/mobile to save performance
      if (window.matchMedia('(max-width: 768px)').matches) return;
      
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;
      
      node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      node.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      node.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      node.style.transition = `transform ${speed}ms ease-out`;
    };

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [options.max, options.scale, options.speed]);

  return tiltRef;
};
