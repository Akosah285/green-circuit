---
target: green-circuit website
total_score: 16
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-11-21T02-59-17Z
slug: src-app-page-tsx
---
Method: dual-agent (A: 9f78e136-ae9e-4197-8709-e404d55280d5; B: c0a4704c-f6ba-4d65-9de5-75984c280f4f)

# Green Circuit design critique

The biggest improvement is to make the work discoverable, not add more decoration. The homepage's primary CTA and featured-project links lead to /work, which renders My Journey instead of projects.

Source-based critique only: Chrome unavailable; localhost preview failed after dependency restore attempts; deployment candidate returned 404. No rendered desktop/mobile, computed font, measured contrast, or overlay evidence.

## Design health

Scores are provisional; 4 means excellent.

| # | Heuristic | Score | Main finding |
|---|---|---|---|
| 1 | System status | 2 | Lab failures can resemble loading |
| 2 | Real-world language | 3 | Personal introduction works; project descriptions abstract |
| 3 | Control and freedom | 3 | Navigation and disclosure offer escape routes |
| 4 | Consistency | 2 | Work & School opens My Journey |
| 5 | Error prevention | 1 | Links promise missing project destinations |
| 6 | Recognition | 2 | Content categories overlap |
| 7 | Efficiency | n/a | Unnecessary for portfolio browsing |
| 8 | Minimalist design | 3 | Restrained authored homepage structure |
| 9 | Error recovery | 0 | Lab lacks actionable failure state |
| 10 | Help/documentation | n/a | Unnecessary for portfolio browsing |
| Total | | 16/32 | Main work-discovery flow needs repair |

## Design specificity and strengths

Distinctive biography, category-interchangeable presentation. Kumasi to Dartmouth to Microsoft gives genuine character, while terminal identity, charcoal/emerald palette, and rounded cards could fit many developer portfolios. Preserve the quiet tone; show real engineering artifacts instead of adding more styling.

Strengths: grounded personal story; only two featured projects; expandable coursework.

Detector: 2 warnings, 0 errors. overused-font at src\app\globals.css:25 matches Arial. gray-on-color at src\app\layout.tsx:27 is a likely false positive conflating emerald selection styling with neutral body background. No contrast failure established. No browser overlays.

## Priority issues

1. P1: Work links do not deliver work. src\app\work\page.tsx:2-19 and src\app\page.tsx:33,76,87. Create a project index with matching slug anchors, artifacts, approach, and takeaways. Keep chronology under Journey. Suggested command: /impeccable shape.
2. P1: Navigation lacks deliberate mobile composition. src\components\Navbar.tsx:19-28,50-60. Fixed gaps/non-wrapping row are a risk, not observed overflow. Separate identity/navigation on small widths, label secondary disclosure, and use generous touch targets. Suggested command: /impeccable adapt.
3. P1: Lab has unexplained sign-in boundary and no failure ending. src\app\lab\page.tsx:19-27,60-65; staticwebapp.config.json:2-17. Label Private Lab, explain access, and provide unavailable/retry/home actions. Suggested command: /impeccable harden.
4. P2: Highlights describe rather than demonstrate engineering. src\app\page.tsx:10,83-102. Select one current build and one distinctive school artifact such as maze robot. Show real image/diagram and one engineering decision; never invent metrics or disclose confidential work. Suggested command: /impeccable shape.
5. P2: Coursework disclosure lacks announced expanded state. src\app\academics\page.tsx:103-139. Add aria-expanded and panel associations; stack codes above titles on mobile. Suggested command: /impeccable audit.

## Cognitive load and emotional journey

Chief problem is organization, not page density. Four source-based checklist failures: single focus, chunking, minimal choices, working memory. Grouping, one decision at a time, and progressive disclosure pass; hierarchy provisionally passes without rendering. Longer browsing lists are not inherently simultaneous choices.

Curiosity about projects ends in repeated biography. Lab authentication and failed loading add a second valley. Make a real artifact the memorable peak and finish project reading with a relevant invitation.

## Persona red flags

First-time visitors cannot find promised projects. Mobile visitors face unclear navigation. Failure-case visitors get no Lab recovery action.

## Minor observations

Align loaded font variables with theme/body CSS (src\app\layout.tsx:5-12; src\app\globals.css:8-12,22-25). Add aria-current (src\components\Navbar.tsx:35-46). Verify reduced-motion behavior (src\app\page.tsx:18-21,50-53,65-68). Check rendered readability of small muted text; no measured contrast failure.

## Questions to consider

Should the homepage lead with builds, the personal journey, or a balanced artifact-and-story pairing? Should Work and School be one grouped project index or separate destinations? Should the private Lab remain in public navigation?
