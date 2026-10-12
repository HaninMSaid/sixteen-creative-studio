# Client preview deployment

The user explicitly requested a live, client-accessible preview and GitHub/Vercel setup if needed. The client preview is deployed at https://sixteen-creative-studio.vercel.app.

## Prepared configuration

`vercel.json` sets the project to the Other/static framework preset, builds with `npm run build` and serves `out/` with clean URLs. It adds `X-Robots-Tag: noindex, nofollow` alongside page metadata. Noindex discourages indexing; it is not access control.

Configuration reference: https://vercel.com/docs/project-configuration/vercel-json

## Release checks

- Build and unit checks pass on the final commit.
- Create/use a private GitHub repository; push the source, excluding reference review frames and source client briefs.
- Deploy the current source to Vercel.
- Verify Home, NK Villa, Objects of Desire and consultation routes on the live URL.
- Confirm the preview opens for the client without requiring the developer's account.
- Record the actual repository, commit, deployment and URL here after success.

Prototype boundaries remain: generated/sample imagery, demo availability, no email delivery, booking, payment or stored client information.

## GitHub

Private repository: https://github.com/HaninMSaid/sixteen-creative-studio

Original prototype uploaded at `e23883e` before further edits. Vercel deployed successfully; all five public routes and the entrance image returned HTTP 200 without authentication.

## Verified deployment

- URL: https://sixteen-creative-studio.vercel.app
- Source commit: `e1045fd`
- Deployment: `dpl_BVyqQzGNBb16i3RX2YSAvZbzoy3t`
- Vercel production build passed.
- GitHub source is private. Automatic GitHub deployment linking requires the GitHub login connection in Vercel; current release was uploaded through the authenticated CLI.
