
// Scroll fluide pour tous les liens internes
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


document.querySelectorAll('.sous-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('href');
        if (page) window.location.href = page;
    });
});



document.getElementById('bulle-cv').addEventListener('click', () => {
  window.location.href = "pdf/cv_diago_v1.pdf";
});

// Défilement fluide vers la section contact
document.getElementById('bulle-contact').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});


// Détection de la visibilité du footer pour cacher la bulle
const footer = document.querySelector('footer');
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      document.body.classList.add('footer-visible');
    } else {
      document.body.classList.remove('footer-visible');
    }
  },
  { threshold: 0.1 }
);

observer.observe(footer);


document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.page-section');

  const observation = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.2 // plus petit = transition plus douce entre les sections
  });

  sections.forEach(section => observation.observe(section));
});



