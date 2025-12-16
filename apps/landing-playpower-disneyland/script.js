// =============================================
// MATHLAND - Interactive JavaScript
// Theme Park Landing Page
// =============================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initParkGates();
  initScrollAnimations();
  initLandSwitching();
  initFloatingElements();
  initCardAnimations();
  initParallax();
});

// =============================================
// PARK GATES ENTRANCE ANIMATION
// =============================================

function initParkGates() {
  const gates = document.getElementById('parkGates');
  const content = document.getElementById('parkContent');

  // Open gates after 2 seconds
  setTimeout(() => {
    gates.classList.add('open');
    content.classList.add('visible');

    // Remove gates from DOM after animation
    setTimeout(() => {
      gates.style.display = 'none';
    }, 1500);
  }, 2000);
}

// =============================================
// LAND SWITCHING FUNCTIONALITY
// =============================================

let currentLand = 'space';

function selectLand(landName) {
  if (currentLand === landName) return;

  // Update button states
  const buttons = document.querySelectorAll('.land-btn');
  buttons.forEach(btn => {
    if (btn.dataset.land === landName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Hide current land
  const currentLandEl = document.querySelector(`.themed-land.active`);
  if (currentLandEl) {
    currentLandEl.classList.remove('active');
  }

  // Show new land
  setTimeout(() => {
    const newLandEl = document.getElementById(`land-${landName}`);
    if (newLandEl) {
      newLandEl.classList.add('active');
      currentLand = landName;

      // Scroll to the land
      newLandEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
}

// Make selectLand available globally
window.selectLand = selectLand;

// =============================================
// SCROLL TO FUNCTIONS
// =============================================

function scrollToMap() {
  const mapSection = document.getElementById('parkMap');
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function scrollToLands() {
  const landsContainer = document.getElementById('landsContainer');
  if (landsContainer) {
    landsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Make scroll functions available globally
window.scrollToMap = scrollToMap;
window.scrollToLands = scrollToLands;

// =============================================
// SCROLL ANIMATIONS
// =============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll('.park-features, .cta-section');
  sections.forEach(section => observer.observe(section));

  // Observe cards
  const cards = document.querySelectorAll('.attraction-card, .feature-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

// =============================================
// FLOATING ELEMENTS (Stars, Clouds, etc.)
// =============================================

function initFloatingElements() {
  createStars();
  createClouds();
  createBalloons();
}

function createStars() {
  const starsField = document.querySelector('.stars-field');
  if (!starsField) return;

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: white;
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.5};
      animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    starsField.appendChild(star);
  }
}

function createClouds() {
  const cloudsContainer = document.querySelector('.clouds');
  if (!cloudsContainer) return;

  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.cssText = `
      position: absolute;
      width: ${Math.random() * 200 + 100}px;
      height: ${Math.random() * 60 + 40}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50px;
      top: ${Math.random() * 50}%;
      left: ${Math.random() * 100}%;
      filter: blur(20px);
      animation: cloudDrift ${Math.random() * 20 + 30}s linear infinite;
      animation-delay: ${Math.random() * 10}s;
    `;
    cloudsContainer.appendChild(cloud);
  }

  // Add cloud drift animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cloudDrift {
      from { transform: translateX(0); }
      to { transform: translateX(100vw); }
    }
  `;
  document.head.appendChild(style);
}

function createBalloons() {
  const balloonsContainer = document.querySelector('.balloons');
  if (!balloonsContainer) return;

  const colors = ['#FF6B9D', '#FEC130', '#4ECDC4', '#9B59B6', '#FF8C42'];

  for (let i = 0; i < 8; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.cssText = `
      position: absolute;
      width: 40px;
      height: 50px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      bottom: -60px;
      left: ${Math.random() * 100}%;
      opacity: 0.7;
      animation: balloonFloat ${Math.random() * 10 + 15}s ease-in infinite;
      animation-delay: ${Math.random() * 5}s;
      box-shadow: inset -10px -10px 20px rgba(0, 0, 0, 0.2);
    `;

    // Add string
    const string = document.createElement('div');
    string.style.cssText = `
      position: absolute;
      width: 2px;
      height: 50px;
      background: rgba(0, 0, 0, 0.3);
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
    `;
    balloon.appendChild(string);

    balloonsContainer.appendChild(balloon);
  }

  // Add balloon float animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes balloonFloat {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0.7;
      }
      50% {
        transform: translateY(-50vh) translateX(${Math.random() * 100 - 50}px);
      }
      100% {
        transform: translateY(-100vh) translateX(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// =============================================
// CARD ANIMATIONS
// =============================================

function initCardAnimations() {
  const cards = document.querySelectorAll('.attraction-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add ripple effect
      createRipple(card);
    });

    card.addEventListener('click', () => {
      // Add click animation
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    });
  });
}

function createRipple(card) {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: rippleEffect 0.6s ease-out;
  `;

  card.style.position = 'relative';
  card.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);

  // Add ripple animation
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes rippleEffect {
        to {
          width: 200px;
          height: 200px;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// =============================================
// PARALLAX EFFECTS
// =============================================

function initParallax() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function updateParallax() {
  const scrollY = window.scrollY;

  // Parallax for clouds
  const clouds = document.querySelectorAll('.cloud');
  clouds.forEach((cloud, index) => {
    const speed = 0.5 + (index * 0.1);
    cloud.style.transform = `translateY(${scrollY * speed}px)`;
  });

  // Parallax for floating shapes
  const shapes = document.querySelector('.floating-shapes');
  if (shapes) {
    shapes.style.transform = `translateY(${scrollY * 0.3}px)`;
  }

  // Parallax for land backgrounds
  const landBackgrounds = document.querySelectorAll('.land-background');
  landBackgrounds.forEach(bg => {
    bg.style.transform = `translateY(${scrollY * 0.2}px)`;
  });
}

// =============================================
// SPARKLE CURSOR EFFECT (Optional)
// =============================================

function initSparkleCursor() {
  let isEnabled = false;

  document.addEventListener('mousemove', (e) => {
    if (!isEnabled) return;

    if (Math.random() > 0.8) {
      createSparkle(e.clientX, e.clientY);
    }
  });

  // Toggle with keyboard shortcut (Ctrl+S)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      isEnabled = !isEnabled;
      console.log('Sparkle cursor:', isEnabled ? 'ON' : 'OFF');
    }
  });
}

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  const size = Math.random() * 10 + 5;

  sparkle.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, #FEC130, #FF6B9D);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    left: ${x}px;
    top: ${y}px;
    animation: sparkleDisappear 0.8s ease-out forwards;
  `;

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);

  // Add sparkle animation
  if (!document.getElementById('sparkle-style')) {
    const style = document.createElement('style');
    style.id = 'sparkle-style';
    style.textContent = `
      @keyframes sparkleDisappear {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Uncomment to enable sparkle cursor
// initSparkleCursor();

// =============================================
// PORTAL EFFECTS FOR MULTIVERSE LAND
// =============================================

function createPortalEffect() {
  const portalContainer = document.querySelector('.land-multiverse .portal-effects');
  if (!portalContainer) return;

  setInterval(() => {
    const portal = document.createElement('div');
    const size = Math.random() * 100 + 50;

    portal.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 255, 163, 0.4), transparent);
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: portalPulse 3s ease-out forwards;
      pointer-events: none;
    `;

    portalContainer.appendChild(portal);

    setTimeout(() => portal.remove(), 3000);
  }, 2000);

  // Add portal pulse animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes portalPulse {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: scale(2) rotate(180deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize portal effects
setTimeout(createPortalEffect, 3000);

// =============================================
// TREASURE PARTICLES FOR PIRATES LAND
// =============================================

function createTreasureParticles() {
  const treasureContainer = document.querySelector('.land-pirates .treasure-particles');
  if (!treasureContainer) return;

  setInterval(() => {
    const coin = document.createElement('div');

    coin.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #FFD700, #FFA500);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      bottom: -20px;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
      animation: coinFloat 4s ease-in-out forwards;
      pointer-events: none;
    `;

    treasureContainer.appendChild(coin);

    setTimeout(() => coin.remove(), 4000);
  }, 1500);

  // Add coin float animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes coinFloat {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize treasure particles
setTimeout(createTreasureParticles, 3000);

// =============================================
// CONFETTI BURST FOR CTA SECTION
// =============================================

function createConfettiBurst() {
  const ctaSection = document.querySelector('.cta-section');
  if (!ctaSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        launchConfetti();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(ctaSection);
}

function launchConfetti() {
  const colors = ['#FF6B9D', '#FEC130', '#4ECDC4', '#9B59B6', '#FF8C42'];
  const confettiContainer = document.querySelector('.confetti-burst');

  if (!confettiContainer) return;

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');

    confetti.style.cssText = `
      position: absolute;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: 50%;
      top: 50%;
      opacity: 1;
      animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
      animation-delay: ${Math.random() * 0.5}s;
      pointer-events: none;
    `;

    confettiContainer.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }

  // Add confetti fall animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translate(${Math.random() * 400 - 200}px, 100vh) rotate(${Math.random() * 720}deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize confetti burst
createConfettiBurst();

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// =============================================
// ACCESSIBILITY ENHANCEMENTS
// =============================================

// Add keyboard navigation for land buttons
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const lands = ['space', 'pirates', 'multiverse', 'creatures', 'arcade'];
    const currentIndex = lands.indexOf(currentLand);

    let newIndex;
    if (e.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % lands.length;
    } else {
      newIndex = (currentIndex - 1 + lands.length) % lands.length;
    }

    selectLand(lands[newIndex]);
  }
});

// =============================================
// CONSOLE EASTER EGG
// =============================================

console.log('%c🎢 Welcome to MathLand! 🎢', 'font-size: 24px; color: #FF6B9D; font-weight: bold;');
console.log('%cYou found the developer console! Here\'s a secret:', 'font-size: 14px; color: #4ECDC4;');
console.log('%cPress Ctrl+S to enable sparkle cursor trail!', 'font-size: 12px; color: #FEC130;');

// =============================================
// EXPORT FOR EXTERNAL USE
// =============================================

window.MathLand = {
  selectLand,
  scrollToMap,
  scrollToLands,
  initSparkleCursor
};
