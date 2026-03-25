import { promises as fs } from "fs";
import path from "path";

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "content");
const postsDir = path.join(contentDir, "posts");
const staticDir = path.join(rootDir, "site");
const outDir = path.join(rootDir, "public");

async function main() {
  const site = JSON.parse(await fs.readFile(path.join(contentDir, "site.json"), "utf8"));
  const profileMd = await fs.readFile(path.join(contentDir, "profile.md"), "utf8");
  const profileHtml = markdownToHtml(profileMd);
  const posts = await loadPosts(postsDir);

  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  await copyDir(staticDir, outDir);
  await buildHome(site, profileHtml, posts);
  await buildBlog(site, posts);
  await buildPosts(site, posts);
  await buildSearch(posts);
  await buildSitemap(site, posts);
  await fs.writeFile(path.join(outDir, "404.html"), renderNotFound(site), "utf8");
  await fs.writeFile(path.join(outDir, ".nojekyll"), "", "utf8");
  await fs.writeFile(path.join(outDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://dzungtri.github.io/sitemap.xml\n", "utf8");

  console.log(`Built ${posts.length} posts to ${outDir}`);
}

async function loadPosts(dir) {
  const files = (await fs.readdir(dir))
    .filter((name) => name.endsWith(".md"))
    .sort();

  const posts = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { meta, body } = parseFrontMatter(raw);
    if (meta.draft === true || meta.draft === "true") {
      continue;
    }

    const filenameSlug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
    const slug = meta.slug ? slugify(meta.slug) : slugify(filenameSlug);
    const date = meta.date || file.slice(0, 10);
    const tags = parseTags(meta.tags);
    const title = meta.title || filenameSlug;
    const summary = meta.summary || "";

    posts.push({
      slug,
      title,
      date,
      tags,
      summary,
      bodyMd: body.trim(),
      bodyHtml: markdownToHtml(body),
      bodyText: markdownToText(body),
      path: `/posts/${slug}/`,
      isoDate: new Date(`${date}T00:00:00Z`).toISOString(),
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function parseFrontMatter(raw) {
  if (!raw.startsWith("---\n")) {
    return { meta: {}, body: raw };
  }

  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    return { meta: {}, body: raw };
  }

  const header = raw.slice(4, end).split("\n");
  const meta = {};
  for (const line of header) {
    const idx = line.indexOf(":");
    if (idx === -1) {
      continue;
    }
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    meta[key] = value;
  }

  return { meta, body: raw.slice(end + 5) };
}

function parseTags(input) {
  if (!input) {
    return [];
  }

  const normalized = input.replace(/^\[/, "").replace(/\]$/, "");
  return normalized
    .split(",")
    .map((tag) => tag.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

async function buildHome(site, profileHtml, posts) {
  const featured = posts.slice(0, 3);
  const pillarsHtml = (site.brandPillars || [])
    .map(
      (pillar) => `
      <article class="card">
        <h3>${escapeHtml(pillar.name)}</h3>
        <p>${escapeHtml(pillar.description)}</p>
      </article>`
    )
    .join("");

  const recentWorkHtml = (site.recentWork || [])
    .map(
      (item) => `
      <article class="card">
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </article>`
    )
    .join("");

  const writingTracksHtml = (site.writingTracks || [])
    .map((track) => `<li>${escapeHtml(track)}</li>`)
    .join("");

  const projectsHtml = (site.projects || [])
    .map(
      (project) => `
      <article class="card">
        <h3><a href="${escapeAttr(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(project.name)}</a></h3>
        <p>${escapeHtml(project.description)}</p>
      </article>`
    )
    .join("");

  const postsHtml = featured
    .map(
      (post) => `
      <article class="post-item">
        <p class="post-meta">${escapeHtml(formatDate(post.date))} · ${post.tags.map(escapeHtml).join(", ")}</p>
        <h3><a href="${post.path}">${escapeHtml(post.title)}</a></h3>
        <p>${escapeHtml(post.summary)}</p>
      </article>`
    )
    .join("");

  const content = `
    <section class="hero">
      <p class="eyebrow">${escapeHtml(site.role)}</p>
      <h1>${escapeHtml(site.title)}</h1>
      <p class="lead">${escapeHtml(site.description)}</p>
      <div class="cta-row">
        <a class="btn solid" href="/blog/">Read Blog</a>
        <a class="btn ghost" href="https://github.com/dzungtri" target="_blank" rel="noreferrer">View GitHub</a>
      </div>
    </section>
    <section class="section" id="profile">
      <h2>Profile</h2>
      <div class="prose">${profileHtml}</div>
    </section>
    <section class="section" id="brand">
      <h2>Brand Pillars</h2>
      <div class="grid">${pillarsHtml}</div>
    </section>
    <section class="section" id="work">
      <h2>Recent Work</h2>
      <div class="grid">${recentWorkHtml}</div>
    </section>
    <section class="section" id="writing">
      <h2>What I Publish</h2>
      <div class="prose">
        <ul>${writingTracksHtml}</ul>
      </div>
    </section>
    <section class="section" id="contact">
      <h2>Contact</h2>
      <p class="lead">${escapeHtml(site.contactCta || "")}</p>
    </section>
    <section class="section" id="projects">
      <h2>Projects</h2>
      <div class="grid">${projectsHtml}</div>
    </section>
    <section class="section">
      <div class="section-head">
        <h2>Latest Posts</h2>
        <a href="/blog/">View all</a>
      </div>
      <div class="post-list">${postsHtml}</div>
    </section>
  `;

  const html = renderPage({
    site,
    title: site.title,
    description: site.description,
    canonicalPath: "/",
    content,
  });

  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
}

async function buildBlog(site, posts) {
  const postList = posts
    .map(
      (post) => `
      <article class="post-item">
        <p class="post-meta">${escapeHtml(formatDate(post.date))} · ${post.tags.map(escapeHtml).join(", ")}</p>
        <h2><a href="${post.path}">${escapeHtml(post.title)}</a></h2>
        <p>${escapeHtml(post.summary)}</p>
      </article>`
    )
    .join("");

  const content = `
    <section class="section">
      <h1>Blog</h1>
      <p class="lead">Writing on AI engineering, leadership, and product execution.</p>
      <label class="search-wrap" for="search-input">
        <span>Search posts</span>
        <input id="search-input" type="search" placeholder="Type keyword or tag..." />
      </label>
      <div id="search-results" class="search-results"></div>
      <div id="post-list" class="post-list">${postList}</div>
    </section>
  `;

  const html = renderPage({
    site,
    title: `Blog | ${site.name}`,
    description: "All posts",
    canonicalPath: "/blog/",
    content,
  });

  const blogDir = path.join(outDir, "blog");
  await fs.mkdir(blogDir, { recursive: true });
  await fs.writeFile(path.join(blogDir, "index.html"), html, "utf8");
}

async function buildPosts(site, posts) {
  for (const post of posts) {
    const content = `
      <article class="section prose post-single">
        <p class="post-meta">${escapeHtml(formatDate(post.date))} · ${post.tags.map(escapeHtml).join(", ")}</p>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="lead">${escapeHtml(post.summary)}</p>
        ${post.bodyHtml}
      </article>
    `;

    const html = renderPage({
      site,
      title: `${post.title} | ${site.name}`,
      description: post.summary,
      canonicalPath: post.path,
      content,
    });

    const postDir = path.join(outDir, "posts", post.slug);
    await fs.mkdir(postDir, { recursive: true });
    await fs.writeFile(path.join(postDir, "index.html"), html, "utf8");
  }
}

async function buildSearch(posts) {
  const items = posts.map((post) => ({
    title: post.title,
    summary: post.summary,
    tags: post.tags,
    url: post.path,
    date: post.date,
    content: post.bodyText,
  }));
  await fs.writeFile(path.join(outDir, "search-index.json"), JSON.stringify(items, null, 2), "utf8");
}

async function buildSitemap(site, posts) {
  const staticPaths = ["/", "/blog/"];
  const urls = [...staticPaths, ...posts.map((post) => post.path)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${site.baseUrl}${url}</loc></url>`)
  .join("\n")}
</urlset>
`;
  await fs.writeFile(path.join(outDir, "sitemap.xml"), xml, "utf8");
}

function renderPage({ site, title, description, canonicalPath, content }) {
  const social = (site.social || [])
    .map((link) => `<a href="${escapeAttr(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <link rel="canonical" href="${site.baseUrl}${canonicalPath}" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="shell">
        <a class="brand" href="/">${escapeHtml(site.name)}</a>
        <nav>
          <a href="/">Home</a>
          <a href="/#profile">Profile</a>
          <a href="/#work">Work</a>
          <a href="/blog/">Blog</a>
          <a href="/#projects">Projects</a>
        </nav>
      </div>
    </header>
    <main class="shell">${content}</main>
    <footer class="site-footer">
      <div class="shell">
        <p>${escapeHtml(site.name)} · ${escapeHtml(site.footerNote)}</p>
        <div class="social">${social}</div>
      </div>
    </footer>
    <script src="/app.js"></script>
  </body>
</html>`;
}

function renderNotFound(site) {
  return renderPage({
    site,
    title: `Not Found | ${site.name}`,
    description: "Page not found",
    canonicalPath: "/404.html",
    content: `
      <section class="section">
        <h1>404</h1>
        <p>The page you requested was not found.</p>
        <p><a href="/">Go back home</a></p>
      </section>
    `,
  });
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let paragraph = [];
  let listItems = [];
  let inCode = false;
  let codeBuffer = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }
    html += `<p>${renderInline(paragraph.join(" "))}</p>\n`;
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }
    const items = listItems.map((item) => `<li>${renderInline(item)}</li>`).join("");
    html += `<ul>${items}</ul>\n`;
    listItems = [];
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html += `<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>\n`;
        inCode = false;
        codeBuffer = [];
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      html += `<h${level}>${renderInline(headingMatch[2].trim())}</h${level}>\n`;
      continue;
    }

    const listMatch = line.match(/^- (.*)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1].trim());
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  return html;
}

function markdownToText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function renderInline(text) {
  let out = escapeHtml(text);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, url) => {
    const safeUrl = escapeAttr(url);
    const external = /^https?:\/\//.test(url);
    const rel = external ? ' rel="noreferrer" target="_blank"' : "";
    return `<a href="${safeUrl}"${rel}>${label}</a>`;
  });
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true });
  const entries = await fs.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(src, dst);
    } else if (entry.isFile()) {
      await fs.copyFile(src, dst);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
