/* animations.js */
document.addEventListener('DOMContentLoaded', () => {


  // Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 3D Card Hover Effect
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // Dynamic Speed Lines Backgrounds
  const speedLineContainers = document.querySelectorAll('.speed-lines');
  speedLineContainers.forEach(container => {
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.classList.add('speed-line');
      line.style.top = `${Math.random() * 100}%`;
      line.style.width = `${Math.random() * 100 + 50}px`;
      line.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
      line.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(line);
    }
  });
});
