@AGENTS.md

# Compact instructions
When compacting, preserve:
- File paths and component names edited (Hero.tsx, SilhouetteCaseStudy.tsx, CaseStudyCard.tsx, ClickBlobs.tsx, globals.css)
- The 4 brand token values (Aldo: #3300AD/Jost/pill, CIS: #000/#daeb54/square, Sperry: #8f6300/navy/pill, GH Bass: #c34d00/sage/pill)
- Tailwind v4 caveat: CSS variable overrides don't reach baked utility classes — use unlayered [data-theme="light"] rules in globals.css
- TypeScript build errors and fixes (e.g. `object` not assignable to Framer Motion animate prop — use `TargetAndTransition`)
- Deploy command: `export PATH=/usr/local/bin:$PATH && npx vercel deploy --prod`
- Any unresolved design decisions or pending work
Discard: raw tool output, snapshot/accessibility tree dumps, deployment JSON responses, console log noise.
