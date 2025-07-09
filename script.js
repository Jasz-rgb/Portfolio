const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navbar = document.querySelector('nav');
const contactSection = document.getElementById('contact');
const navbarHeight = navbar.offsetHeight;
const links = document.querySelectorAll('nav a');

let lastScrollY = window.scrollY;

// Highlight active nav link
links.forEach(link => {
  link.addEventListener('click', function() {
    links.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Hide/show navbar on scroll
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const contactTop = contactSection.getBoundingClientRect().top + window.scrollY;

  // Hide on scroll down, show on scroll up
  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    navbar.style.top = '-150px';
  } else {
    navbar.style.top = '0';
  }

  lastScrollY = currentScrollY;

  // Prevent overlap with contact section
  if (window.scrollY + navbarHeight >= contactTop) {
    navbar.style.position = 'absolute';
    navbar.style.top = (contactTop - navbarHeight) + 'px';
    navbar.style.width = '100%';
  } else {
    navbar.style.position = 'fixed';
    navbar.style.width = '100%';
  }
});

// Toggle menu on hamburger click
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
});

// Close menu when nav link is clicked (mobile UX)
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

// Keyboard accessibility: close menu on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
