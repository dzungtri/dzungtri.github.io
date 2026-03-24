const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  }
);

reveals.forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
  observer.observe(node);
});

const orbit = document.querySelector(".hero-orbit");

window.addEventListener(
  "pointermove",
  (event) => {
    if (!orbit || window.innerWidth < 900) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;
    orbit.style.transform = `translate(${x}px, ${y}px)`;
  },
  { passive: true }
);
