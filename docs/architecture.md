# Architecture and maintenance

Next.js App Router pages compose shared presentation components. Typed records live in `src/data/`; types live in `src/types/`. The prototype exports static files to `out/`.

## Main responsibilities

- `home-story.tsx`: one persistent full-screen canvas, with five story beats driven continuously by native scroll position. Shared images crossfade and change framing; chapter navigation and reduced-motion reading mode keep the story accessible. `story.ts` holds narrative content and image choices.
- `panorama-room.tsx`: Three.js room renderer, camera movement, pointer and keyboard controls, polygon raycasting and hover tint. Dynamically loaded with server rendering disabled.
- `discovery-scene.tsx`: collection list and native object-detail dialog; owns selected object and enquiry preview state.
- `collection.ts`: antique details, camera targets and silhouette polygons, measured in normalized equirectangular image coordinates.
- `consultation-preview.tsx`: service, calendar, project fields and review state.
- `booking.ts`: demo slots and calendar date helpers. This is the replacement boundary for a future provider adapter.

## The room

An illustrative 2:1 panorama maps to the interior of a sphere. A camera at its centre rotates horizontally through 360° and vertically within comfortable limits. Object polygons project into the same coordinate system, allowing a warm color overlay and raycast selection without visible hotspots. Rendering is event-driven rather than a continuous animation loop. GPU resources and listeners are disposed on unmount. A non-WebGL fallback retains the accessible object list.

This is a fixed-viewpoint panoramic experience, not a navigable reconstructed room. Final panorama quality, seams and silhouette alignment require review against approved room imagery. Corner selectors and object list are accessibility alternatives to dragging/hover.

## Booking boundary

All fields are transient browser state. Form submission only moves to the review step. Files contribute names only, never uploaded bytes. Calendar availability is explicitly illustrative; no reserved slot, timezone conversion, email, API, payment or notification exists yet. The user's instruction is to connect the studio email/calendar after this prototype, not today.

## Styling and assets

Tailwind is enabled through the scaffold's Turbopack loader. Named CSS provides the editorial layout, mobile adaptations and reduced motion. Local image assets avoid third-party requests. The antique images are generated concepts with provenance in `references/generated-assets.md`.

## Production follow-up

Confirm calendar provider and studio email, choose a secure submission backend, implement server validation/rate limits and real availability, approve privacy/booking policies, then add notifications. Decide payments and CMS separately. Do not send prototype details to an invented destination.
