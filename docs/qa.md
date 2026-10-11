# Verification — 11 October 2026

## Completed

- Production static export compiled and TypeScript checking passed with the revised 360° room and four-step consultation flow.
- All four routes generated successfully.
- Local homepage returned HTTP 200.
- Sample and generated assets inspected directly. Antique panorama rendered in the in-app browser; a screenshot confirmed the standing viewpoint, antique amphora composition, room controls and accessible collection list.
- Source review confirms no payment, booking, email, customer-data upload or persistence endpoint exists. Form completion only changes in-memory preview state.
- Source reference documents remained read-only and outside the Git repository.

- Geometry checks confirmed each room-corner camera target intersects its object silhouette; a console target initially pointed through the open space beneath the table and was corrected. Calendar tests cover leap years, Monday-first alignment and past-date disabling.

## Verification limits

Browser control repeatedly timed out or changed focus/navigation while attempting end-to-end checks. Consequently, complete pointer/keyboard interaction, full calendar/form completion and mobile visual checks are not claimed as passed. These remain review items below.

## Client review checks

1. Home opens with edge-to-edge image and overlaid Sixteen wordmark. Scroll gently; confirm the desired pacing and mobile composition.
2. In the room, drag/swipe horizontally through a full turn. Check image seam and each composition. Hover antiques and confirm silhouette tint; click/tap to open matching details.
3. Confirm every corner button changes the viewpoint; confirm the object list, Escape dismissal and keyboard focus behavior.
4. Choose a consultation service; navigate calendar months; select date and time; enter sample client/project details; inspect review and edit behavior. Verify nothing is sent or reserved.
5. Check 390px mobile and tablet layouts, touch interaction, text contrast and reduced motion.
6. Replace concept images/antique records with client-approved assets before production.

## Dependency note

The scaffold audit reports a development dependency chain through `braces` in Next's lint tooling. The static-preview `serve` package also reports a `compression` advisory. `npm audit fix` does not resolve these without proposed breaking downgrades. No blind downgrade was applied. Review tooling versions before a production deployment; this prototype currently runs only locally and exports static assets.
