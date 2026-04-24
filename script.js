const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const slides = Array.from(document.querySelectorAll(".testimonial-card"));
const nextButton = document.querySelector(".carousel-button.next");
const prevButton = document.querySelector(".carousel-button.prev");
let activeSlide = 0;
let autoRotate;

function showSlide(index) {
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === index);
  });
}

function moveSlide(direction) {
  activeSlide = (activeSlide + direction + slides.length) % slides.length;
  showSlide(activeSlide);
}

function startAutoRotate() {
  if (slides.length < 2 || window.innerWidth <= 720) return;
  clearInterval(autoRotate);
  autoRotate = setInterval(() => moveSlide(1), 6000);
}

if (slides.length) {
  if (window.innerWidth > 720) {
    showSlide(activeSlide);
    startAutoRotate();
  }

  nextButton?.addEventListener("click", () => {
    if (window.innerWidth > 720) {
      moveSlide(1);
      startAutoRotate();
    }
  });

  prevButton?.addEventListener("click", () => {
    if (window.innerWidth > 720) {
      moveSlide(-1);
      startAutoRotate();
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18
});

revealElements.forEach((element) => observer.observe(element));
