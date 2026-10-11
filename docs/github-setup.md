# GitHub handoff

Local Git is initialized on `main`. No GitHub connector or `gh` CLI is available in this session, and no remote account identity was assumed. The source is committed locally. Private client reference files and the parent `sources/` directory are outside this repository.

## Exact push steps

1. Sign into your GitHub account and create an **empty private** repository named `sixteen-creative-studio`. Do not initialize a README, license or .gitignore there.
2. In a terminal, run the following. Replace `YOUR_GITHUB_USERNAME` with the account owning that repository.

```sh
cd /Users/h_333/.codex/.chatgpt-projects/g-p-6ababdbda5f0819186bcdbbc8596f2af/sixteen-creative-studio
git status
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/sixteen-creative-studio.git
git push -u origin main
```

Authenticate using GitHub's supported credential manager or SSH; never put a token in the remote URL or repository files. If you already added a remote, inspect `git remote -v` and use `git remote set-url origin ...` instead of adding a duplicate.

## Ongoing changes

```sh
git add src public docs README.md package.json package-lock.json next.config.ts
git commit -m "Refine Sixteen prototype after client review"
git push
```

## Preview sharing

`npm run build` produces `out/` for a static host. Localhost works only on your computer and is not a link to send the client. No external deployment was made by this local Git handoff. Before sharing, choose a host and access settings, check the clean-URL routing, and retain prototype labels and noindex metadata.
