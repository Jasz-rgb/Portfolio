const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navbar = document.querySelector('nav');
const contactSection = document.getElementById('contact');
const navbarHeight = navbar.offsetHeight;
const links = document.querySelectorAll('nav a');

links.forEach(link => {
  link.addEventListener('click', function() {
    links.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  // Get the distance from the top of the page to the contact section
  const contactTop = contactSection.getBoundingClientRect().top + window.scrollY;

  // If the bottom of the navbar would overlap the contact section, stop fixing it
  if (window.scrollY + navbarHeight >= contactTop) {
    navbar.style.position = 'absolute';
    navbar.style.top = (contactTop - navbarHeight) + 'px';
    navbar.style.width = '100%';
  } else {
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.width = '100%';
  }
});

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
