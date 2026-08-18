# Sangum — Backlog

Tracks deferred/known work that's been identified but intentionally
not built yet, so it doesn't get lost between sessions. Not a full
changelog — items get removed once actually done, not just noted here.

---

## Backend (Sangum-Backend)

- [ ] **Email delivery flows unverified** — forgot password, reset
  password, and verification emails are all pending Resend
  stabilization on the backend. Confirmed not a frontend issue.
- [ ] **`/auth/resend-verification` semantics** — the frontend now
  calls this endpoint both for a genuine first send (e.g. a user
  logging in on an unverified account, where no email has gone out for
  that visit at all) and for actual resends. Worth backend confirming
  this endpoint is fine being called as a "send it now" action in
  general, not just a strict resend, or whether a separate endpoint
  makes more sense.
- [ ] **No server-side re-check of `isVerified` once inside the app**
  — the frontend's login-time verify gate is now skippable (navigates
  straight to `/feed`), and nothing server-side currently gates any
  endpoint behind verification status. Worth a product/backend call on
  whether any actions should actually require a verified account.

---

## Frontend (Sangum-Frontend)

- [ ] **Global `notifications.store.ts`** (Zustand) — needed to sync
  unread counts across the sidebar, topbar bell, and the Notifications
  page. Deferred until after the UI shell phase.
- [ ] **`getCurrentUsername()` in profile** — still needs the real
  session lookup wired in (now that session bootstrap exists, this
  should be a small fix — just hasn't been touched).
- [ ] **Email field in profile edit** — `AuthUser.email` is now real
  (backend sends it, session carries it), so this is unblocked; just
  hasn't been wired into the profile edit form yet.
- [ ] **`useDisplaySettings` in profile** — local placeholder pending
  the real shared Zustand theme store import path.
- [ ] **`RightRail` breakpoint** — uses Tailwind's `lg:` (1024px)
  rather than the mockup's exact 1179px cutoff. Flagged for
  reconciliation, not urgent.
- [ ] **`SessionBootstrap` gates every route, including `(public)`
  pages** — mounted at the true root (`app/layout.tsx`), so public
  marketing/legal pages that don't care about auth state still wait on
  the session-check spinner before rendering. Alternative is mounting
  it separately inside `(auth)/layout.tsx` and `(app)/layout.tsx`
  instead, leaving `(public)` fast and untouched. Deliberate tradeoff
  for now, not a bug — revisit if it becomes a real perceived-perf
  issue.
- [ ] **`AppHeader`'s "Create" button and notification bell are still
  non-functional stubs** — noticed while wiring the account menu in
  next to them; out of scope for that change, but they're sitting
  right there unwired.
- [ ] **Sidebar's own "Settings" link vs. the new account-menu
  "Settings" item** — both exist now and point to the same place.
  Minor duplication, not broken, worth reconciling into one entry
  point eventually.