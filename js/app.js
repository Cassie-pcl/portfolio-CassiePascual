console.log("salut");

const name = document.getElementById("name");
const avatar = document.getElementById("avatar");
const avatarSrc = document.getElementById("avatar-src");

// Chemins vers tes deux vidéos
const arrival = "videoscompr/videos_moi_entree.mp4";  // perso arrive
const leave = "videoscompr/videos_moi_sortir.mp4";      // perso part

let isHovering = false;

name.addEventListener("mouseenter", () => {
    isHovering = true;

    avatarSrc.src = arrival;   // charge la vidéo d’arrivée
    avatar.load();
    avatar.classList.add("show");

    avatar.currentTime = 0;
    avatar.play();
});

name.addEventListener("mouseleave", () => {
    isHovering = false;

    avatarSrc.src = leave;    // charge la vidéo de départ
    avatar.load();

    avatar.currentTime = 0;
    avatar.play();

    // Quand la vidéo "leave" est finie → cacher l’avatar
    avatar.onended = () => {
        if (!isHovering) {
            avatar.classList.remove("show");
        }
    };
});


//const slides = document.querySelectorAll('.slide');

//slides.forEach((slide, i) => {
  //slide.addEventListener('mouseenter', () => {
    //slide.style.transform = 'scale(1.2)';

    //slides.forEach((other, j) => {
      //const distance = j - i;
      //if (distance === 0) return; // l'image elle-même
      // Plus une image est proche, plus elle bouge
      //const offset = 200 / Math.abs(distance);
      //other.style.transform = `translateX(${distance * offset}px)`;
    //});
  //});

  //slide.addEventListener('mouseleave', () => {
    //slides.forEach((other) => {
      //other.style.transform = 'translateX(0) scale(1)';
    //});
  //});
//});

//const track = document.querySelector('.slide-track');
//const slidess = Array.from(track.children);

//slidess.forEach(slide => {
  //track.appendChild(slide.cloneNode(true)); // duplique toutes les slides
//});

// Re-sélectionner toutes les slides (y compris les clones)
//const allSlides = document.querySelectorAll('.slide');

//allSlides.forEach(slide => {
    //slide.addEventListener('click', () => {
        //const page = slide.dataset.page;
        //if (page) {
            //window.location.href = page;
        //}
    //});
//});


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






// Création du span qui va suivre la souris
const cursorText = document.createElement('span');
cursorText.classList.add('cursor-text');
//cursorText.textContent = 'Découvrir';
document.body.appendChild(cursorText);

// Sélectionne toutes les slides
////slidesss.forEach(slide => {
    //slide.addEventListener('mouseenter', () => {
        //cursorText.style.opacity = '1';
    //});

    //slide.addEventListener('mouseleave', () => {
        //cursorText.style.opacity = '0';
    //});

    //slide.addEventListener('mousemove', e => {
        //cursorText.style.left = e.clientX + 15 + 'px';
        //cursorText.style.top = e.clientY + 15 + 'px';
    //})

// Pour les slides
document.querySelectorAll('.lien-jeu').forEach(slide => {
    slide.addEventListener('mouseenter', () => {
      cursorText.style.opacity = '1';
      cursorText.textContent = 'Découvrir le jeu';
      });
    slide.addEventListener('mouseleave', () => cursorText.style.opacity = '0');
    slide.addEventListener('mousemove', e => {
        cursorText.style.left = e.clientX + 15 + 'px';
        cursorText.style.top = e.clientY + 15 + 'px';
    });
    slide.addEventListener('click', () => {
    const url = slide.dataset.url;
    if (url) {
      window.open(url, '_blank');
    }
    });
});

// Pour les médias (images et vidéos)
//document.querySelectorAll('.video-poster').forEach(media => {
    //media.addEventListener('mouseenter', () => {
      //cursorText.style.opacity = '1';
      //cursorText.textContent = 'Découvrir le projet';
      //document.body.style.cursor = 'none';
      //});
    //media.addEventListener('mouseleave', () => {
      //cursorText.style.opacity = '0';
      //document.body.style.cursor = 'auto';
      //});

    //media.addEventListener('mousemove', e => {
        //cursorText.style.left = e.clientX + 15 + 'px';
        //cursorText.style.top = e.clientY + 15 + 'px';
    //});
    //media.addEventListener('click', () => {
    //const videoSrc = media.dataset.video;
    //const video = document.createElement('video');
    //video.src = videoSrc;
    //video.controls = true;
    //video.autoplay = true;
    //video.width = media.width;

    //media.replaceWith(video);

    //cursorText.style.opacity = '0';
    //document.body.style.cursor = 'auto';
    //});
//});


document.querySelectorAll('.video-poster').forEach(media => {
    media.addEventListener('mouseenter', () => {
        cursorText.style.opacity = '1';
        cursorText.textContent = 'Découvrir le projet';
    });

    media.addEventListener('mouseleave', () => {
        cursorText.style.opacity = '0';
        document.body.style.cursor = 'auto';
    });

    media.addEventListener('mousemove', e => {
        cursorText.style.left = e.clientX + 15 + 'px';
        cursorText.style.top = e.clientY + 15 + 'px';
    });

    media.addEventListener('click', () => {
        const videoSrc = media.dataset.video;
        if (!videoSrc) return; // sécurité

        const video = document.createElement('video');
        video.src = videoSrc;
        video.controls = true;
        video.autoplay = true;

        // largeur fiable pour Safari
        const width = media.getBoundingClientRect().width;
        video.style.width = width + 'px';
        video.style.height = 'auto';

        // remplace l'image par la vidéo
        media.replaceWith(video);

        cursorText.style.opacity = '0';
        document.body.style.cursor = 'auto';
    });
});







document.querySelectorAll('.sous-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({behavior: 'smooth'});
        }
    });
});



document.getElementById('bulle-cv').addEventListener('click', () => {
  window.location.href = "pdf/cv_lastvf.pdf"
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
    threshold: 0.001 // plus petit = transition plus douce entre les sections
  });

  sections.forEach(section => observation.observe(section));
});



