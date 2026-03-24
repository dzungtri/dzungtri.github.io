# GitHub Pages Deployment

This project is prepared for GitHub Pages deployment using GitHub Actions.

## What is already set up

- The website is self-contained inside `./website`
- The resume `.docx` file is included inside `./website`
- A GitHub Actions workflow is ready at `./.github/workflows/deploy-pages.yml`
- `.nojekyll` is included for static hosting safety
- `404.html` is included by mirroring `index.html`

## Deploy steps

1. Initialize git locally if this folder is not yet a repository:

```bash
cd /Users/dzung/profile
git init
git branch -M main
git add .
git commit -m "Prepare personal site for GitHub Pages"
```

2. Create a new GitHub repository.

3. Add the remote and push:

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

4. On GitHub:

- Open `Settings`
- Open `Pages`
- If GitHub asks for a build source, choose `GitHub Actions`

5. Pushes to `main` will deploy the site automatically.

## Site root

The GitHub Pages workflow publishes `./website` as the site root.

## Notes

- The resume download link now points to `./nguyen-tri-dung-cto-resume.docx` inside the published site.
- Before publishing publicly, replace placeholder contact info in the website and resume.
