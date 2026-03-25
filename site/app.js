const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const postList = document.querySelector("#post-list");

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
      searchResults.innerHTML = "<p>No result found.</p>";
      return;
    }

    searchResults.innerHTML = hits
      .map(
        (hit) => `
          <article class="search-hit">
            <p class="post-meta">${hit.date} · ${hit.tags.join(", ")}</p>
            <h3><a href="${hit.url}">${hit.title}</a></h3>
            <p>${hit.summary}</p>
          </article>
        `
      )
      .join("");
  });
}
