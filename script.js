// Page fade-in
window.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('page-loaded');
  // Fallback fade-in for sections if AOS not supported
  if (!window.AOS) {
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.add('fade-in');
    });
  }
  initWorkPremiumSlideshows();
});
// Navbar mobile toggle
function toggleNavMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('open');
}
// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});
// Button ripple effect
document.querySelectorAll('.btn, .about-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    circle.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = Math.max(rect.width, rect.height) + 'px';
    circle.style.left = (e.clientX - rect.left - rect.width/2) + rect.width/2 + 'px';
    circle.style.top = (e.clientY - rect.top - rect.height/2) + rect.height/2 + 'px';
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});
// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Initialize AOS
if (window.AOS) {
  AOS.init({
    duration: 900,
    once: true,
    offset: 80,
    easing: 'ease-in-out',
  });
}
// Smooth scroll to section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.offsetTop - 60,
      behavior: 'smooth'
    });
  }
}
window.scrollToSection = scrollToSection;
window.toggleNavMenu = toggleNavMenu;
window.scrollToTop = scrollToTop;
function openWorkWithMe() {
  // Opens mail client with a pre-filled subject
  window.open('mailto:hello@agency.com?subject=Work%20With%20Me%20Enquiry', '_blank');
}
window.openWorkWithMe = openWorkWithMe;

// Floating Emojis Animation
(function() {
  const emojis = [
    '💻', '🖥️', '🖱️', '⌨️', '🧰', '🛠️', '🧑‍💻', '📸', '🎥', '🎬', '🎨', '🖌️', '📷', '📹', '📽️', '🎞️', '🖲️', '🧑‍🎨', '🖼️', '📺', '📷', '🎛️', '🎚️', '🎙️', '🎧', '🗜️', '🧑‍🔬', '🧑‍🔧', '🧑‍💻', '🧑‍🎨'
  ];
  const container = document.querySelector('.floating-emojis');
  if (!container) return;
  const hero = document.querySelector('.hero');
  // Get bounding box for safe zone (main text area)
  function getSafeZone() {
    const h1 = hero.querySelector('h1');
    const btn = hero.querySelector('.hero-buttons');
    const rects = [h1, btn].map(el => el.getBoundingClientRect());
    // Merge all rects into one big bounding box
    const minTop = Math.min(...rects.map(r => r.top));
    const maxBottom = Math.max(...rects.map(r => r.bottom));
    const minLeft = Math.min(...rects.map(r => r.left));
    const maxRight = Math.max(...rects.map(r => r.right));
    // Convert to hero-relative percentages
    const heroRect = hero.getBoundingClientRect();
    return {
      top: ((minTop - heroRect.top) / heroRect.height) * 100,
      bottom: ((maxBottom - heroRect.top) / heroRect.height) * 100,
      left: ((minLeft - heroRect.left) / heroRect.width) * 100,
      right: ((maxRight - heroRect.left) / heroRect.width) * 100
    };
  }
  function randomPos(safe) {
    let top, left;
    let tries = 0;
    do {
      top = Math.random() * 100;
      left = Math.random() * 100;
      tries++;
    } while (
      top > safe.top - 8 && top < safe.bottom + 8 &&
      left > safe.left - 8 && left < safe.right + 8 &&
      tries < 20
    );
    return { top, left };
  }
  function spawnEmojis() {
    container.innerHTML = '';
    const safe = getSafeZone();
    for (let i = 0; i < 14; ++i) {
      const emoji = document.createElement('span');
      emoji.className = 'floating-emoji';
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      const { top, left } = randomPos(safe);
      emoji.style.top = `${top}%`;
      emoji.style.left = `${left}%`;
      emoji.style.animationDuration = `${7 + Math.random() * 3}s`;
      emoji.style.opacity = 0.7 + Math.random() * 0.3;
      container.appendChild(emoji);
    }
  }
  setTimeout(spawnEmojis, 400);
  window.addEventListener('resize', () => setTimeout(spawnEmojis, 400));
})();

// Our Work Premium Section: Slideshow for image cards
function initWorkPremiumSlideshows() {
  document.querySelectorAll('.our-work-premium-media.slideshow').forEach(container => {
    const slides = container.querySelectorAll('.slide');
    let idx = 0;
    if (slides.length < 2) return;
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 2500);
  });
} 