# Design decisions

| ID        | Decision                           | Reason / status                                                                                                                              |
| --------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| DRD-001   | Architectural minimalism           | Selected in the prior conversation; warm paper, dark olive, generous space and large photographs implement it. Exact colors remain proposed. |
| DRD-002   | Interactive editorial storytelling | Selected refinement. Chapter navigation, image transitions and contextual discovery support a narrative without forced scrolling.            |
| OOD-001   | The Sixteen house                  | Selected spatial concept. Three restrained plus markers and an accessible list open one reusable detail panel.                               |
| IA-001    | Four prototype destinations        | Current request supersedes the broader production sitemap. Studio content is a home section.                                                 |
| TYPE-001  | Georgia + system sans serif        | Temporary, reliable, no network font requests or unlicensed commercial font use. Replace after branding approval.                            |
| MOT-001   | Native CSS motion                  | Short reveal, image hover and panel transitions; reduced-motion support; no scroll hijacking, autoplay or continuous parallax.               |
| PHOTO-001 | Local sample photography           | Temporary images are reusable offline after installation; clearly identified as references, not Sixteen's actual work.                       |
| TECH-001  | Next.js, TypeScript, Tailwind      | Explicit requested stack. Semantic named CSS handles bespoke editorial layouts; Tailwind supplies reset/utilities and token integration.     |
| TECH-002  | Static export                      | Matches the frontend-only scope, with portable output and no runtime backend.                                                                |
| A11Y-001  | Native controls and dialog         | Keyboard support, browser focus containment/return and Escape closing. Object list avoids dependence on spatial markers.                     |

## Initial wireframe decisions implemented

Home: masthead → typographic opening → image → studio text → selected project → collection → consultation. Case study: title → image → sticky chapter index beside evolving story. Collection: invitation → full uncropped scene → object index; detail enters from the right. Consultation: editorial introduction beside a short two-step selection preview.

No downloaded template, purchased font, actual client plan or reference website design was copied.

## Review corrections — authoritative current direction

- Opening must be a whole-image experience, with the existing Sixteen wordmark retained over the image. Decorative arrows removed across the interface.
- Objects of Desire represents a creative director’s collected antiques, not a contemporary furniture showroom.
- The collection is a person’s standing POV with 360° looking around and a composition in each direction. Silhouette tint replaces plus markers.
- Consultation must include calendar, time and client information in the prototype. The user explicitly deferred connecting studio email and live calendar until after prototype review.
- Earlier rows describing a flat room/three plus markers and a two-step consultation preview are superseded by these corrections.

## Continuous homepage revision

The user rejected separate homepage sections. A single sticky image canvas now connects five beats: feeling → detail → Villa 16 → personal collection → client story. Image framing, crossfades and text move with native scrolling; no scroll hijacking or carousel timer is used. A chapter rail provides direct access, with a static reading alternative for reduced-motion users. Deployment to a client-accessible preview is now explicitly requested. GitHub source remains private.

## Minimal visitor-facing revision — 12 October 2026

The user wants the prototype to look like the finished website, without guidance scattered across the layout. The homepage now keeps one short line per visual moment; the explanatory paragraphs, eyebrows, chapter rail, progress count and image-note overlays are removed. Navigation is tucked behind Menu on desktop and mobile. The footer contains the wordmark, contact and expandable image credits. Room viewpoints and the accessible collection list are disclosed on request. Brief notices remain at object/enquiry/booking decisions so sample content does not imply a real product or booking.

## Entrance-led visual journey

The user's requested opening is a dark metal house number 16 with an amber downlight and expressive cast shadows. The first scene has no visible headline; only the studio wordmark and Menu overlay the photograph. Five distinct images now connect the approach, doorway, material detail, Villa 16 reference and antique collection. New assets were generated for the entrance, interior threshold and material junction. They are concepts, not actual client photography.
