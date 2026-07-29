/* ============================================
   UNITED WEB SOLUTIONS - PREMIUM JAVASCRIPT
   Vanilla JS | No jQuery | Production-Ready
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* =========================================
     1. PAGE LOADER
     ========================================= */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 500);
    }
  });

  /* =========================================
     2. SCROLL PROGRESS BAR
     ========================================= */
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    }, { passive: true });
  }

  /* =========================================
     3. THEME TOGGLE (Light/Dark Mode)
     ========================================= */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('uws-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('uws-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    if (theme === 'dark') {
      themeToggle.classList.remove('fa-moon');
      themeToggle.classList.add('fa-sun');
    } else {
      themeToggle.classList.remove('fa-sun');
      themeToggle.classList.add('fa-moon');
    }
  }

  /* =========================================
     4. TYPING ANIMATION (Hero Section)
     ========================================= */
  const typingElement = document.getElementById('typing');
  if (typingElement) {
    const words = ["Websites", "Solutions", "Experiences", "Brands"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  /* =========================================
     5. STICKY NAVBAR & ACTIVE LINK HIGHLIGHT
     ========================================= */
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    // Sticky Navbar
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active Link Highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial call

  // Close mobile menu on link click
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });

  /* =========================================
     6. SCROLL ANIMATIONS (AOS Init)
     ========================================= */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  /* =========================================
     7. COUNTER ANIMATIONS
     ========================================= */
  const counterBoxes = document.querySelectorAll('.counter-box h3');
  
  if (counterBoxes.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target')) || parseInt(el.innerText.replace(/\D/g, '')) || 0;
          const hasPlus = el.innerText.includes('+');
          let current = 0;
          const increment = target / 60;
          const duration = 2000;
          const stepTime = duration / 60;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.innerText = target.toLocaleString() + (hasPlus ? '+' : '');
              clearInterval(timer);
            } else {
              el.innerText = Math.ceil(current).toLocaleString() + (hasPlus ? '+' : '');
            }
          }, stepTime);

          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterBoxes.forEach(box => counterObserver.observe(box));
  }

  /* =========================================
     8. PORTFOLIO FILTERING
     ========================================= */
  const filterButtons = document.querySelectorAll('.portfolio-filter button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          // Trigger reflow for smooth animation
          void item.offsetWidth;
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* =========================================
     9. TESTIMONIAL SLIDER (Swiper Init)
     ========================================= */
  if (typeof Swiper !== 'undefined') {
    const swiperEl = document.querySelector('.testimonial-slider');
    if (swiperEl) {
      new Swiper(swiperEl, {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        speed: 800
      });
    }
  }

  /* =========================================
     10. CONTACT FORM VALIDATION
     ========================================= */
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      // Clear previous errors
      contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
      contactForm.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

      const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('is-invalid');
          showFeedback(input, 'This field is required.');
        } else if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            input.classList.add('is-invalid');
            showFeedback(input, 'Please enter a valid email address.');
          }
        } else if (input.type === 'tel' || input.name === 'phone') {
          const phoneRegex = /^[\d\s+()-]{7,20}$/;
          if (!phoneRegex.test(input.value.trim())) {
            isValid = false;
            input.classList.add('is-invalid');
            showFeedback(input, 'Please enter a valid phone number.');
          }
        }
      });

      if (isValid) {
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Simulate sending
        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-check me-2"></i> Message Sent!';
          btn.classList.remove('btn-gold');
          btn.classList.add('btn-success');
          contactForm.reset();
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-gold');
          }, 3000);
        }, 1500);
      }
    });

    // Live validation clear
    contactForm.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        const feedback = input.parentNode.querySelector('.invalid-feedback');
        if (feedback) feedback.remove();
      });
    });
  }

  function showFeedback(input, message) {
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    input.parentNode.appendChild(feedback);
  }

  /* =========================================
     11. BACK TO TOP BUTTON
     ========================================= */
  let backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =========================================
     12. LIGHTBOX FOR PORTFOLIO
     ========================================= */
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <img src="" alt="Portfolio Preview">
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.portfolio-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      // Trigger animation
      requestAnimationFrame(() => lightbox.classList.add('active'));
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });

  /* =========================================
     13. PERFORMANCE: LAZY LOADING
     ========================================= */
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

});