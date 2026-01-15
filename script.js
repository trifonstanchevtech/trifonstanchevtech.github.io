/* =========================
   Portfolio JavaScript
   Author: Trifon Stanchev
   ========================= */

/* Smooth scrolling for navigation links */
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* Highlight active section in navigation */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

/* Scroll reveal animation */
const revealElements = document.querySelectorAll("section, .project");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("reveal");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Optional Dark Mode (toggle manually if you add a button) */
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

/*
To enable dark mode:
1. Add a button in HTML:
   <button onclick="toggleDarkMode()">🌙</button>

2. Add dark styles in CSS:
   body.dark-mode {
     background-color: #0a192f;
     color: #ccd6f6;
   }
*/

console.log("🚀 Portfolio script loaded successfully");
