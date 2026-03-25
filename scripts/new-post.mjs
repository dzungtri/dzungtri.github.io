import { promises as fs } from "fs";
import path from "path";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new:post -- "Your Post Title"');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const slug = slugify(title);
const filename = `${today}-${slug}.md`;
const outputPath = path.join(process.cwd(), "_posts", filename);

const template = `---
layout: post
title: ${title}
date: ${today}
description: One paragraph summary for list and search.
tags: writing, update
---

# ${title}

Write your post here.
`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });

try {
  await fs.access(outputPath);
  console.error(`Post already exists: ${outputPath}`);
  process.exit(1);
} catch (_error) {
  await fs.writeFile(outputPath, template, "utf8");
  console.log(outputPath);
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
