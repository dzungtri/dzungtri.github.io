import { promises as fs } from "fs";
import path from "path";

const { title, format } = parseArgs(process.argv.slice(2));

if (!title) {
  console.error('Usage: npm run new:post -- [--format md|html] "Your Post Title"');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const slug = slugify(title);
const isHtmlPost = format === "html";
const extension = isHtmlPost ? "html" : "md";
const filename = `${today}-${slug}.${extension}`;
const outputPath = path.join(process.cwd(), "_posts", filename);
const assetDir = path.join(process.cwd(), "assets", "posts", slug);
const demoScriptPath = path.join(assetDir, "demo.js");
const demoStylePath = path.join(assetDir, "demo.css");

const template = isHtmlPost ? createHtmlTemplate({ title, today, slug }) : createMarkdownTemplate({ title, today });

await fs.mkdir(path.dirname(outputPath), { recursive: true });

try {
  await fs.access(outputPath);
  console.error(`Post already exists: ${outputPath}`);
  process.exit(1);
} catch (_error) {
  await fs.writeFile(outputPath, template, "utf8");
  const createdFiles = [outputPath];

  if (isHtmlPost) {
    await fs.mkdir(assetDir, { recursive: true });
    await Promise.all([
      fs.writeFile(demoScriptPath, createDemoScript(), "utf8"),
      fs.writeFile(demoStylePath, createDemoStyle(), "utf8"),
    ]);
    createdFiles.push(demoScriptPath, demoStylePath);
  }

  console.log(createdFiles.join("\n"));
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseArgs(argv) {
  const args = [...argv];
  let format = "md";
  const titleParts = [];

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === "--format") {
      format = normalizeFormat(args.shift());
      continue;
    }

    if (arg.startsWith("--format=")) {
      format = normalizeFormat(arg.split("=")[1]);
      continue;
    }

    if (arg === "--interactive") {
      format = "html";
      continue;
    }

    titleParts.push(arg);
  }

  return { title: titleParts.join(" ").trim(), format };
}

function normalizeFormat(value) {
  if (!value) {
    console.error("Missing value for --format. Use md or html.");
    process.exit(1);
  }

  const normalized = value.toLowerCase();
  if (normalized !== "md" && normalized !== "html") {
    console.error(`Unsupported format: ${value}. Use md or html.`);
    process.exit(1);
  }

  return normalized;
}

function createMarkdownTemplate({ title, today }) {
  return `---
layout: post
title: ${JSON.stringify(title)}
date: ${today}
description: One paragraph summary for list and search.
tags: writing, update
---

# ${title}

Write your post here.
`;
}

function createHtmlTemplate({ title, today, slug }) {
  return `---
layout: post
title: ${JSON.stringify(title)}
date: ${today}
description: "Interactive post summary for lists and search."
tags: [writing, interactive]
post_styles:
  - /assets/posts/${slug}/demo.css
post_scripts:
  - /assets/posts/${slug}/demo.js
search_content: "Interactive post covering HTML layout, progressive enhancement, and a small JavaScript demo."
---

<section class="demo-playground" data-counter-demo>
  <p class="meta-label">Interactive block</p>
  <h2>${title}</h2>
  <p>
    This HTML post template ships with a small mount point, plain semantic markup,
    and a page-scoped script loaded through <code>post_scripts</code>.
  </p>

  <div class="demo-card">
    <p class="demo-value" data-demo-value>0</p>
    <div class="demo-actions">
      <button class="btn solid" type="button" data-demo-increment>Increase</button>
      <button class="btn ghost" type="button" data-demo-reset>Reset</button>
    </div>
    <p class="demo-status" data-demo-status>Ready.</p>
  </div>
</section>
`;
}

function createDemoScript() {
  return `const demoRoot = document.querySelector("[data-counter-demo]");

if (demoRoot) {
  const valueNode = demoRoot.querySelector("[data-demo-value]");
  const statusNode = demoRoot.querySelector("[data-demo-status]");
  const incrementButton = demoRoot.querySelector("[data-demo-increment]");
  const resetButton = demoRoot.querySelector("[data-demo-reset]");
  let count = 0;

  const render = () => {
    valueNode.textContent = String(count);
    statusNode.textContent = count === 0 ? "Ready." : \`Count is now \${count}.\`;
  };

  incrementButton?.addEventListener("click", () => {
    count += 1;
    render();
  });

  resetButton?.addEventListener("click", () => {
    count = 0;
    render();
  });

  render();
}
`;
}

function createDemoStyle() {
  return `.demo-playground {
  display: grid;
  gap: 1rem;
}

.demo-card {
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 1rem;
  padding: 1.25rem;
  background: rgba(15, 23, 42, 0.6);
}

.demo-value {
  margin: 0;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
}

.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1rem 0;
}

.demo-status {
  margin: 0;
  color: var(--muted);
}
`;
}
