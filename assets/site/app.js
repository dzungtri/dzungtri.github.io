const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const postList = document.querySelector("#post-list");
const navLinks = Array.from(document.querySelectorAll("nav a[href^='/#']"));
const revealNodes = document.querySelectorAll("[data-reveal]");

if (revealNodes.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

if (navLinks.length) {
  const sections = navLinks
    .map((link) => {
      const hash = link.getAttribute("href")?.split("#")[1];
      if (!hash) {
        return null;
      }
      const section = document.getElementById(hash);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  const setActive = () => {
    let current = null;
    for (const item of sections) {
      const top = item.section.getBoundingClientRect().top;
      if (top <= 140) {
        current = item;
      }
    }

    navLinks.forEach((link) => link.classList.remove("is-active"));
    if (current) {
      current.link.classList.add("is-active");
    }
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
}

if (searchInput && searchResults && postList) {
  let searchIndex = [];

  fetch("/search-index.json")
    .then((response) => response.json())
    .then((data) => {
      searchIndex = data;
    })
    .catch(() => {
      searchIndex = [];
    });

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = "";
      postList.hidden = false;
      return;
    }

    const hits = searchIndex
      .filter((item) => {
        const haystack = [item.title, item.summary, item.tags.join(" "), item.content]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 20);

    postList.hidden = true;
    if (hits.length === 0) {
      searchResults.innerHTML = '<p class="muted">No result found.</p>';
      return;
    }

    searchResults.innerHTML = hits
      .map(
        (hit) => `
          <article class="search-hit">
            <p class="post-meta">${hit.date}${hit.tags.length ? ` · ${hit.tags.join(", ")}` : ""}</p>
            <h3><a href="${hit.url}">${hit.title}</a></h3>
            <p>${hit.summary}</p>
          </article>
        `
      )
      .join("");
  });
}
