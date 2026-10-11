# Sixteen Creative Studio

A focused, local-first client prototype built with Next.js App Router, TypeScript and Tailwind CSS. Architectural minimalism meets restrained editorial storytelling.

## Run and build

Use Node.js 24 LTS (the project was built with 24.14.1).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production output is a portable static website:

```sh
npm run build
npm run preview
```

The `out/` directory can be deployed to a static host supporting clean URLs. No server, secrets or database are needed. `next start` is not used with static export.

## Today's four destinations

- `/` — one continuous visual story connecting perspective, materials, Villa 16, collected antiques and the next client conversation.
- `/projects/nk-villa` — three chapters connecting concept, materials and execution to the evolution of Sixteen.
- `/objects-of-desire` — a standing-position 360° antique room, four discoverable object silhouettes, accessible alternatives and a detail panel.
- `/consultations` — service selection, demo calendar/time slots, client/project details and review; live calendar and studio email will be connected later.

## Where to edit

| Location                 | Responsibility                                                               |
| ------------------------ | ---------------------------------------------------------------------------- |
| `src/app/`               | Route composition, page copy, metadata and shared layout                     |
| `src/components/`        | Reusable editorial components and small interactive components               |
| `src/data/studio.ts`     | Navigation, project chapters and consultation services                       |
| `src/data/collection.ts` | Antique object records and panorama silhouette coordinates                   |
| `src/data/booking.ts`    | Demonstration calendar and times                                             |
| `src/types/content.ts`   | Typed content contracts                                                      |
| `src/app/globals.css`    | Design tokens, named component styles, breakpoints and reduced motion        |
| `public/images/`         | Locally served sample photography                                            |
| `docs/`                  | Requirements, scope, decisions, sitemap, architecture, QA and GitHub handoff |
| `references/`            | Reference index and image provenance; no private source documents copied     |

Change an antique in `src/data/collection.ts`; the room and detail panel share that record. Polygon coordinates use normalized panorama image space. Recalibrate silhouettes when replacing the panorama. `panorama-room.tsx` maps the image to the inside of a sphere with Three.js and raycasts those silhouettes; it renders only on camera/pointer/resize changes.

The page layouts use server components. Only navigation, opening scroll motion, reveal observation, the 360° room and consultation flow run in the browser. Plain CSS transitions avoid an unnecessary animation dependency. No commercial font or purchased template is embedded.

## Prototype boundaries

All imagery is temporary. The antique atelier and panorama are AI-generated concepts, not actual studio work or verified antiques. NK Villa's historical role is sourced from the supplied brief; the images and spatial diagram do not depict the actual villa. Objects, specifications and prices are illustrative. Client fields and selected filenames remain in transient page memory for review; they are never sent or persisted. No live commerce or booking exists. The site is marked `noindex` for review.

Read [prototype scope](docs/prototype-scope.md), [design decisions](docs/design-decisions.md), [architecture](docs/architecture.md), [QA](docs/qa.md) and [GitHub steps](docs/github-setup.md).
