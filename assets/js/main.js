/* main.js */
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const root = document.documentElement;
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  }

  // RTL Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = root.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      root.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  });

  // Load saved dir
  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    root.setAttribute('dir', savedDir);
  }

  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Sticky Header
  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
});
