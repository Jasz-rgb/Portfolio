const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle menu on hamburger click
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
});

// Close menu when a nav link is clicked (for mobile UX)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 700) {
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Close menu when clicking outside nav
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('show') &&
    !navLinks.contains(e.target) &&
    e.target !== menuToggle
  ) {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Keyboard accessibility: close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
