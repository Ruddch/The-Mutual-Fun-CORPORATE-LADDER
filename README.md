# Corporate Ladder — Pixel Office Edition

An unofficial fan-made career game inspired by The Mutual Fun. Play an employee, walk an isometric pixel office, collect Briefcases, deal with corporate dilemmas and climb from Intern to Chairman. The final personal career card can be downloaded as a PNG and shared on X. This is a career adventure, not a business-management tycoon.

## Play

- Click floor tiles to walk. Click colleagues and objects to walk up and interact.
- Keyboard: WASD / arrow keys to move along the isometric grid, E to interact with the closest adjacent object. Mobile has directional controls.
- Follow the `!` marker to a different daily assignment destination: Management, colleagues, Accounting, Compliance, the meeting room, coffee machine or noticeboard. A seed shuffles the itinerary, with no consecutive repeats; the final day always uses the Board meeting room. The destination remains fixed after reloads and loot collection.
- Two optional Briefcases appear daily. Each gives +2 Wealth and a seeded +3 Reputation, Influence, Sanity or Shareholder Support bonus.
- Coffee: once daily, costs 6 Wealth and restores 9 Sanity.
- First colleague conversation each day: +3 Influence and −2 Sanity.
- After completing the assignment, walk to and enter the elevator. A 3.2-second doors-close → travel → doors-open animation runs before the next day is committed and saved. The display changes floor after a promotion; returning without a promotion keeps the same floor. Reduced-motion settings shorten the transition to 0.65 seconds. Promotions unlock higher floors and executive decor.
- Survive 15 days and attend the final Board meeting. View your career card, download its PNG, share on X or copy the full personnel file.

56 regular events, six delayed consequence chains, five fictional departments and several endings. Department names and characters are fan-game placeholders. The palette matches the user-provided The Mutual Fun website screenshot: dark brown #1d140f, burgundy #84393a / #6d2027, cream #ecdfbf and gold #e7c76d.

## Local development

Requires Node.js 22+.

```sh
npm ci
npm run dev
npm test
npm run build
```

`npm run build` type-checks and builds static output in `dist/`. `npm test` checks deterministic runs, 1000 simulated careers, failure/ending behavior, reachable routes to every interaction and assignment on all seven floors for all 15 days, seeded itineraries without consecutive repeats, Briefcase rewards and the satirical Vice President title.

## Deploy to GitHub Pages

1. Create a repository. Upload the project's contents to the `main` branch, including `.github/workflows/pages.yml` and `package-lock.json`. Do not upload `node_modules`.
2. Open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push a commit to `main`, or run **Actions → Deploy GitHub Pages → Run workflow**.
4. The workflow installs dependencies, runs tests, builds and publishes `dist/`. Open the deployment URL, usually `https://USERNAME.github.io/REPOSITORY/`.

Vite uses `base: './'` for relative assets, so repository subpaths and user domains work. There are no history-router routes or server dependencies. The game needs no wallet, API keys, backend or runtime external assets. GitHub Pages must be available for your repository visibility/account plan. The `.openai` directory belongs to the private Work preview and can be omitted from the GitHub repository.

## Career and election rules

Stats are bounded 0–100. Reputation, Wealth or Sanity at zero ends the career. Influence may reach zero. Promotions occur on days 3, 5, 8, 10 and 13, at most one rank at each review. Requirements are shown on the personnel noticeboard. A seeded random department determines starting bonuses and weights its own scenarios more heavily.

Delayed follow-ups arrive two days after a decision, consume a primary assignment and displace normal events. Overflow moves to later days. The final vote always happens on day 15, so late follow-ups may remain pending.

Confidence = 45% chosen primary stat + 15% Reputation + 15% Influence + 20% Shareholder Support + 3 × Corporate Favor + 8 at Executive Director − 12 unresolved audit. Chairman requires Vice President or higher and confidence ≥65. Otherwise Wealth ≥85 gives Golden Parachute, Shareholders ≥80 gives Shareholder Hero, else Permanent Middle Management. Corporate Favor is hidden until the final card. Different career ranks produce satirical job titles, including **Senior Vice President of Doing Nothing**.

Saves use browser localStorage under `corporate-ladder-office-v2`; the old decision-only game uses a different save key. Progress stays on the device/browser. `?seed=example` prefills the seed for new careers; an existing save takes priority. Same seed plus same decisions, Briefcase collections and other actions reproduce the same career.

## Source

- `src/engine.ts`: pure seeded career simulation.
- `src/events.ts`: authored corporate dilemmas and consequences.
- `src/game/world.ts`: floor layouts and collision-aware pathfinding.
- `src/game/art.ts`: original procedural pixel art; no external image dependencies.
- `src/game/Office.tsx`: canvas rendering, movement and interaction controls.
- `src/game/career.ts`: Briefcase rewards and satirical job titles.
- `src/game/assignments.ts`: deterministic shuffled daily destinations.
- `src/game/ElevatorRide.tsx`: closing, travel and arrival animation.
- `src/main.tsx`: UI, persistence, sound, dialogues and PNG export.
- `.github/workflows/pages.yml`: automated Pages deployment.
