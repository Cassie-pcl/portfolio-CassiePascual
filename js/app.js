/* =========================================================
   AVATAR (vidéo qui apparaît au survol du nom)
   ========================================================= 
const nameEl = document.getElementById("name");
const avatar = document.getElementById("avatar");
const avatarSrc = document.getElementById("avatar-src");*/

// Chemins vers tes deux vidéos
/*const arrival = "videoscompr/videos_moi_entree.mp4"; // perso arrive
const leave = "videoscompr/videos_moi_sortir.mp4";   // perso part

let isHovering = false;

function showAvatar() {
    isHovering = true;

    avatarSrc.src = arrival;
    avatar.load();
    avatar.classList.add("show");

    avatar.currentTime = 0;
    avatar.play().catch(() => {}); // évite l'erreur si le navigateur bloque la lecture
}

function hideAvatar() {
    isHovering = false;

    avatarSrc.src = leave;
    avatar.load();

    avatar.currentTime = 0;
    avatar.play().catch(() => {});

    // Quand la vidéo "leave" est finie : cacher l'avatar
    avatar.onended = () => {
        if (!isHovering) {
            avatar.classList.remove("show");
        }
    };
}

nameEl.addEventListener("mouseenter", showAvatar);
nameEl.addEventListener("mouseleave", hideAvatar);

// CORRECTION tactile : un tap ailleurs que sur le nom fait repartir l'avatar
document.addEventListener("click", e => {
    if (isHovering && !nameEl.contains(e.target)) {
        hideAvatar();
    }
});*/


/* =========================================================
   NAVBAR : sous-menu au toucher
   CORRECTION : ce bloc doit rester AVANT le "scroll fluide"
   1er tap sur "Mes créations" = ouvre le sous-menu
   2e tap = va à la section
   ========================================================= */
const menuParent = document.querySelector(".has-sous-nav");
const isTouch = () => window.matchMedia("(hover: none)").matches;

menuParent.querySelector(":scope > a").addEventListener("click", e => {
    if (isTouch() && !menuParent.classList.contains("active")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        menuParent.classList.add("active");
    }
});

// Ferme le sous-menu si on tape ailleurs ou sur un de ses liens
document.addEventListener("click", e => {
    if (!menuParent.contains(e.target)) {
        menuParent.classList.remove("active");
    }
});

menuParent.querySelectorAll(".sous-nav a").forEach(a => {
    a.addEventListener("click", () => menuParent.classList.remove("active"));
});


/* =========================================================
   SCROLL FLUIDE (tous les liens internes, sous-menu compris)
   CORRECTION : le doublon sur ".sous-nav a" est supprimé,
   ce bloc gère déjà ces liens.
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


/* =========================================================
   TEXTE QUI SUIT LA SOURIS
   (désactivé automatiquement sur tactile par le CSS)
   ========================================================= */
const cursorText = document.createElement("span");
cursorText.classList.add("cursor-text");
document.body.appendChild(cursorText);

function followCursor(e) {
    cursorText.style.left = e.clientX + 15 + "px";
    cursorText.style.top = e.clientY + 15 + "px";
}

// Lien vers le jeu
document.querySelectorAll(".lien-jeu").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorText.style.opacity = "1";
        cursorText.textContent = "Découvrir le jeu";
    });
    el.addEventListener("mouseleave", () => {
        cursorText.style.opacity = "0";
    });
    el.addEventListener("mousemove", followCursor);
    el.addEventListener("click", () => {
        const url = el.dataset.url;
        if (url) {
            window.open(url, "_blank", "noopener");
        }
    });
});

// Images qui se transforment en vidéo au clic
document.querySelectorAll(".video-poster").forEach(media => {
    media.addEventListener("mouseenter", () => {
        cursorText.style.opacity = "1";
        cursorText.textContent = "Découvrir le projet";
    });

    media.addEventListener("mouseleave", () => {
        cursorText.style.opacity = "0";
    });

    media.addEventListener("mousemove", followCursor);

    media.addEventListener("click", () => {
        const videoSrc = media.dataset.video;
        if (!videoSrc) return; // sécurité

        const video = document.createElement("video");
        video.src = videoSrc;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true; // CORRECTION : évite le plein écran forcé sur iPhone

        // CORRECTION : plus de largeur en pixels.
        // Le CSS (.media video { width: 100%; max-width: 900px }) gère la taille
        // et s'adapte si on tourne l'écran ou redimensionne la fenêtre.

        media.replaceWith(video);

        cursorText.style.opacity = "0";
    });
});


/* =========================================================
   BULLES CV ET CONTACT
   ========================================================= */
document.getElementById("bulle-cv").addEventListener("click", () => {
    window.open("pdf/version2026/cv.pdf", "_blank", "noopener");
});

document.getElementById("bulle-contact").addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

// Cache les bulles quand le footer est visible
const footer = document.querySelector("footer");
const footerObserver = new IntersectionObserver(
    entries => {
        if (entries[0].isIntersecting) {
            document.body.classList.add("footer-visible");
        } else {
            document.body.classList.remove("footer-visible");
        }
    },
    { threshold: 0.1 }
);
footerObserver.observe(footer);


/* =========================================================
   APPARITION DES SECTIONS AU SCROLL
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".page-section");

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        { threshold: 0.001 } // petit = transition plus douce entre les sections
    );

    sections.forEach(section => sectionObserver.observe(section));
});


/* =========================================================
   LIGHTBOX : images en plein écran
   ========================================================= */
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Fermer">&times;</button>
  <img class="lightbox-img" src="" alt="">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden"; // bloque le scroll derrière
}

function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

// Images cliquables : celles des projets, sauf les vidéos et le lien du jeu
document.querySelectorAll(".media img").forEach(img => {
    if (img.classList.contains("video-poster")) return;
    if (img.closest(".lien-jeu")) return;

    img.classList.add("zoomable");
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

// Fermer : clic n'importe où, ou touche Échap
lightbox.addEventListener("click", closeLightbox);
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
});