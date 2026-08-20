# Below-Hero Section Upgrades

## 1. My Core Tech Pillars — Orbital Skill System

### Desktop
Each of the 3 skill categories becomes an "orbit card":
- Centre: category icon + label (e.g. 💻 Web Dev)
- Skills orbit around it as glowing pill tags using CSS animation (`@keyframes orbit`)
- Each skill tag is positioned on a circular path at a different `animation-delay` so they spread evenly
- Cards are a fixed height (e.g. 280px) to contain the orbit

### Mobile
Orbital animation is disabled via `@media (max-width: 768px)` — instead, skills render as a simple horizontal wrapping row of glowing nebula pills under the category label. Same data, just a linear layout.

### Implementation
- New component: `OrbitalSkillCard.tsx`
- Props: `label`, `icon`, `skills[]`, `orbitColor` (for tint)
- CSS orbit keyframe added to `globals.css`

---

## 2. My Journey — Cosmic Filament Timeline

- Vertical line: CSS gradient `from purple-500 → blue-500` with `box-shadow` glow pulse animation
- Each milestone: glowing star dot (small `div` with radial-gradient + pulse animation) + staggered warp-in via framer-motion (`scale 0.85→1`, `opacity 0→1`, `y 20→0`)
- Year in `font-orbitron` with a subtle violet text-shadow
- Milestone text stays normal

### Implementation
- Inline in `page.tsx` (small enough, no new component needed)
- Uses existing `framer-motion`

---

## 3. Featured Projects — Nebula Glow on Hover

- Look at `ProjectCard.tsx` and add `hover:shadow-[0_0_30px_4px_rgba(139,92,246,0.3)]` + a subtle `transition` for the nebula glow
- The existing card border already fits; just enhance the hover state

---

## Mobile Strategy

| Section | Desktop | Mobile |
|---------|---------|--------|
| Skills | Orbiting pills | Stacked category + pill grid |
| Timeline | Same (vertical, already mobile-friendly) | Same |
| Projects | Same | Same |

