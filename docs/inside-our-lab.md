# Inside Our Lab Maintenance

## Structure

The existing site is a Jekyll/Liquid Markdown site. This feature adds no runtime
dependencies and does not change navigation or the existing homepage content.
The English and Traditional Chinese homepages include the same component after
Lab Introduction / Latest News. Only these pages load its CSS and JavaScript.

- `_data/lab_platforms.json`: bilingual content, artwork paths and scene positions.
- `_includes/lab-explorer.html`: shared map and contextual information panel.
- `assets/css/lab-explorer.css`: scoped layout, highlighting and reduced motion.
- `assets/js/lab-explorer.js`: hover, focus, click/tap and keyboard behavior.
- `assets/images/lab/*.svg`: five independently replaceable prototype illustrations.
- `index.md`, `zh/index.md`: integration; `lab_explorer: true` enables assets.
- `_layouts/default.html`: conditional stylesheet and deferred script loading.
- `_tools/`: optional preview and browser checks; not part of the published site.

## Update People And Content

Edit `_data/lab_platforms.json`. Each platform has `en` and `zh` objects. Update
both languages together. Personnel are deliberately placeholders, not real names.

```json
"groupLeader": "Person's name",
"teamMembers": ["First member", "Second member"]
```

The same values appear in the contextual panel and no-JavaScript
fallback. Use valid
JSON: double quotes, no comments, no trailing commas. Content is rendered as text,
not HTML.
Do not insert literal HTML/script tags into the data file.

## Replace Artwork

Replace a platform's SVG, or change its `asset` to a new local SVG, PNG or WebP.
Use transparent backgrounds and a consistent `280 x 220` canvas (or that aspect
ratio). Keep instrument silhouettes inside the canvas with room for highlighting.
The image itself is decorative to assistive technology: the platform button has
a localized accessible name. Do not bake long descriptions or personnel into art.

All five platforms are independent buttons, not image-map hotspots on a flat
illustration. The shared floor and external connecting path are in the include.
Replacing artwork does not require changing interaction code.

## Move Or Add Platforms

`position.x`, `position.y`, and `position.width` are percentages of the shared
scene. `accent` is the platform highlight color; keep it dark enough for white
backgrounds. `external: true` marks an external facility rather than an in-house
instrument. Keep the synchrotron node outside the main floor.

To add a platform, copy one full entry with a unique `id` and `number`, supply
both languages and artwork, and adjust its position. Rendering and keyboard
navigation use the data array automatically. If the floor or scene size needs
expansion, update the SVG floor and `.lab-map` aspect ratio as well. Update the
five-platform test expectations if the platform count intentionally changes.

## Preview And Test

The preview is a development-only Liquid/Markdown renderer, not a complete Jekyll
replacement. The repository has no Ruby/Jekyll build toolchain. Production still
uses the existing GitHub Pages workflow; do not replace its configuration.

With Node.js and npm installed:

```powershell
npm install --prefix _tools
npm --prefix _tools run preview
```

Open `http://127.0.0.1:4175/TCLab/` or
`http://127.0.0.1:4175/TCLab/zh/`. Set `PORT` to choose a different port.
The preview deliberately tests a non-empty base URL for GitHub project Pages.

```powershell
npx --prefix _tools playwright install chromium
npm --prefix _tools test
```

Alternatively set `$env:TCLAB_BROWSER_CHANNEL = 'msedge'` to test with installed
Microsoft Edge. Tests cover both languages at 1440, 1280, 768, 390 and 320 pixels,
artwork loading, all five platform selections, keyboard focus, arrow navigation,
touch, no-JavaScript fallback and page overflow. Screenshots go to the temporary
`tclab-lab-screenshots` directory. Mobile map scrolling is intentional and stays
inside the section; there should be no horizontal page overflow.

The optional `TCLAB_TEST_MODULES` environment variable accepts module directories
separated by the OS path delimiter when using an existing local test runtime.

## Interaction Notes

- Hover/focus previews a platform with a 12% artwork enlargement, without layout shifts.
- The existing side panel updates with a brief slide-in; no details button is needed.
- Click, Enter, Space or mobile tap selects a platform in the existing information panel.
- Arrow keys move between scene platforms. There are no duplicate detail dialogs.
- Mobile platform shortcuts select a platform and scroll its artwork into view.
- Focus stays on the selected control; no popup interrupts navigation.
- Reduced-motion preferences disable light pulses, moving links and transitions.
- Lab CSS and JavaScript URLs include the build revision to avoid mixed cached versions.
- Without JavaScript, the expandable text listing still exposes all platform data.

This is a functional, art-ready scene, not a floor plan of actual equipment
locations. The approved section is published from the `main` branch.
