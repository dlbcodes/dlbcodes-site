# dlbcodes personal site

A personal site built with `@dlbcodes/my-design-system`, styled like a component-library landing page (shadcn.com content model) with a bold, personal hero treatment (rvmp.me-inspired).

## Stack
- Vue 3.5 + TypeScript + Vite
- Tailwind CSS v4
- @dlbcodes/my-design-system (real npm package, live components)

## Sections
- Hero — headline + a live "reskin" demo that flips the same components between an "Assistant" and "Console" skin by swapping CSS token overrides.
- Library — a grid of the library's real, live components (Button, Badge, Select, Tabs, Field, Alert, etc).
- Templates — Assistant and dlbcodes-console template callouts.
- Playground — customizer explainer with a live token/accent switcher, built using Panel/Field/Switch/Separator from the library itself.
- Architecture — folder structure and design philosophy.

## Run locally
```
npm install
npm run dev
```

## Notes / placeholders to update
- Footer email (`mailto:hello@dlbcodes.dev`) is a placeholder — swap for your real contact address.
- GitHub links point to `github.com/dlbcodes` — update to the specific repo URLs for the Assistant and Console templates once you have final repo names/paths.
- The docs link for the design system (`my-design-system-beta.vercel.app`) wasn't reachable when this was built — double check it's live before pointing traffic at it.
