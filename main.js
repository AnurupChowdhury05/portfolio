document.addEventListener('DOMContentLoaded', () => {
    
  // --- CUSTOM CURSOR ---
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      // Direct positioning for dot
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Slightly delayed positional calculation for trail via RequestAnimationFrame could be smoother,
      // but simple CSS transitions handle the trailing effect nicely in a portfolio.
      setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
      }, 50);
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .skill-tab, .proj-link');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        cursorTrail.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursorTrail.classList.remove('hovered');
      });
    });
  } else {
    // Hide custom cursor on mobile/touch devices
    cursor.style.display = 'none';
    cursorTrail.style.display = 'none';
  }

  // --- PARTICLE BACKGROUND ---
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.fill();
    }
  }

  // Create particles
  const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction for particles
  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Connect particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 - distance/1200})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      
      // Connect to mouse
      if (mouse.x && mouse.y) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(188, 19, 254, ${0.2 - distance/750})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();

  // --- TYPEWRITER EFFECT ---
  const typewriterElement = document.getElementById('typewriter');
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

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster deleting
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Finished typing, wait before deleting
      isDeleting = true;
      typingSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Wait before typing next
    }
    
    setTimeout(typeWriter, typingSpeed);
  }
  
  // Start typewriter
  setTimeout(typeWriter, 1000);

  // --- NAVBAR SCROLL & ACTIVE STATE ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Navbar glass effect
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- MOBILE MENU ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    if (isMenuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  menuToggle.addEventListener('click', toggleMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // --- SKILL TABS ---
  const tabs = document.querySelectorAll('.skill-tab');
  const panels = document.querySelectorAll('.skills-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      // Add active to current
      tab.classList.add('active');
      const panelId = 'panel-' + tab.getAttribute('data-tab');
      document.getElementById(panelId).classList.add('active');
      
      // Re-trigger bar animations in active panel
      setTimeout(animateSkillBars, 50);
    });
  });

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

  // Force skill bars check for initially visible panel
  function animateSkillBars() {
    const activePanel = document.querySelector('.skills-panel.active');
    const bars = activePanel.querySelectorAll('.skill-bar.active .skill-fill, .skill-bar .skill-fill');
    bars.forEach(fill => {
      // Use parent data-level
      const level = fill.closest('.skill-bar').getAttribute('data-level');
      fill.style.width = level + '%';
    });
  }

  // --- COUNTER UP ANIMATION ---
  const statNums = document.querySelectorAll('.stat-num');
  let startedCounters = false;
  
  const statObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !startedCounters) {
      startedCounters = true;
      
      statNums.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            stat.innerText = target + (stat.innerText.includes('K') ? 'K+' : ''); // keeping K+ if needed, though strictly we used simple numbers
            // Note: The HTML didn't use K+ directly on the span, but this allows for it
          }
        };
        updateCounter();
      });
    }
  }, { threshold: 0.5 });
  
  if(document.querySelector('.hero-stats')) {
    statObserver.observe(document.querySelector('.hero-stats'));
  }

  // --- CONTACT FORM (FormSubmit.co) ---
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit-btn');

  // Set _next to current page so FormSubmit knows where to redirect (used as fallback)
  const nextUrlInput = document.getElementById('form-next-url');
  if (nextUrlInput) nextUrlInput.value = window.location.href;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Button loading state
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.querySelector('.btn-text').textContent = 'SENDING...';
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';
      
      // Send via fetch to FormSubmit
      const formData = new FormData(contactForm);
      
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          formSuccess.classList.remove('hidden');
          contactForm.reset();
        } else {
          alert('Something went wrong. Please try again or email directly.');
        }
      })
      .catch(() => {
        alert('Network error. Please try again or email directly.');
      })
      .finally(() => {
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
        
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      });
    });
  }

});
