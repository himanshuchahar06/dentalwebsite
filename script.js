// --- AURA DENTAL CLINIC INTERACTIVE CONTROLLER ---

document.addEventListener('DOMContentLoaded', () => {
  initHeroGallery();
  initBeforeAfterSlider();
  initFaqAccordion();
  initTechShowcase();
  initTestimonialsSlider();
  initGSAPAnimations();
});

// ==========================================
// 1. HERO REAL-LIFE PHOTO GALLERY SWITCHER
// ==========================================
function initHeroGallery() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const heroImages = document.querySelectorAll('.hero-img');
  const activeTitle = document.getElementById('active-photo-title');

  if (!tabButtons.length || !heroImages.length) return;

  const photoTitles = {
    suite: 'Aesthetic Surgery Suite 01',
    lab: 'CAD/CAM Restoration Lab',
    lounge: 'Concierge Recovery Suite'
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      tabButtons.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      const photoKey = btn.getAttribute('data-photo');

      // Update text title
      if (activeTitle && photoTitles[photoKey]) {
        activeTitle.textContent = photoTitles[photoKey];
      }

      // Swap images with smooth CSS opacity transition
      heroImages.forEach(img => {
        if (img.id === `hero-img-${photoKey}`) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    });
  });
}

// ==========================================
// 2. COMPARISON SLIDER (BEFORE & AFTER)
// ==========================================
function initBeforeAfterSlider() {
  const slider = document.getElementById('before-after-slider');
  if (!slider) return;

  const beforeWrapper = slider.querySelector('.image-before-wrapper');
  const handle = slider.querySelector('.slider-handle');

  function move(clientX) {
    const rect = slider.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    
    // Clamp percentages
    percentage = Math.max(0, Math.min(100, percentage));

    beforeWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse drag events
  let isDragging = false;

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    move(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    move(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch drag events for mobile
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) {
      move(e.touches[0].clientX);
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      move(e.touches[0].clientX);
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

// ==========================================
// 3. FAQ ACCORDION TRIGGER
// ==========================================
function initFaqAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');
  
  faqCards.forEach(card => {
    const trigger = card.querySelector('.faq-trigger');
    const content = card.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

      // Close all other accordions
      faqCards.forEach(c => {
        c.classList.remove('open');
        c.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isOpen) {
        card.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// ==========================================
// 4. TECHNOLOGY TABS SHOWCASE
// ==========================================
function initTechShowcase() {
  const tabs = document.querySelectorAll('.tech-tab');
  const slides = document.querySelectorAll('.tech-slide');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const techIdx = tab.getAttribute('data-tech');

      slides.forEach((slide, idx) => {
        if (idx == techIdx) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    });
  });
}

// ==========================================
// 5. TESTIMONIALS SLIDER
// ==========================================
function initTestimonialsSlider() {
  const dots = document.querySelectorAll('.dot-btn');
  const slides = document.querySelectorAll('.testimonial-slide');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const testIdx = dot.getAttribute('data-test');

      slides.forEach((slide, idx) => {
        if (idx == testIdx) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    });
  });
}

// ==========================================
// 6. GSAP SCROLL & ENTRANCE ANIMATIONS
// ==========================================
function initGSAPAnimations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero Fades
  gsap.from('.hero-content h1', {
    opacity: 0,
    y: 30,
    duration: 1.0,
    ease: 'power3.out'
  });

  gsap.from('.hero-content p', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out'
  });

  gsap.from('.hero-content .hero-buttons, .hero-content .badge', {
    opacity: 0,
    y: 15,
    duration: 0.8,
    delay: 0.5,
    ease: 'power3.out'
  });

  gsap.from('.interactive-card', {
    opacity: 0,
    scale: 0.98,
    duration: 1.2,
    delay: 0.2,
    ease: 'power3.out'
  });

  // Services Cards stagger fade on scroll
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 85%'
    },
    opacity: 0,
    y: 35,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // Value proposition cards fade
  gsap.from('.about-card', {
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top 85%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out'
  });
}
