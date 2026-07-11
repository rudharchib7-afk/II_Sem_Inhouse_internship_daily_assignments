# Describely

A Next.js product description generator with a simple cookie-based login/logout flow.

## Features

- Product description generator UI
- Auth shell with demo login/logout
- Responsive landing page and product workbench
- GitHub-ready structure for deployment

## Demo login

Use these credentials for the built-in demo auth:

- Email: `admin@describely.com`
- Password: `Describely123!`

## Local development

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Public URL

This project is ready to be deployed to Vercel for a public shareable URL.

Recommended flow:

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Add the environment variables:
   - `AUTH_EMAIL`
   - `AUTH_PASSWORD`
4. Deploy.

Vercel will generate a public URL like:

```text
https://describely-your-project-name.vercel.app
```

## GitHub

Create a GitHub repository and push the current local repo with:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```
