# Sangum — Messages Feature

Documentation for `src/features/messages/`: what each file does, how to use the
feature as-is, and how to stand up a real Express API behind it.

---

## 1. Folder structure

```
src/
├── app/
│   └── messages/
│       └── page.tsx                          Route entry (Server Component)
│
├── shared/
│   └── components/
│       └── logo/
│           └── SangumLogo.tsx                 App-wide brand asset
│
└── features/
    └── messages/
        ├── index.ts                           Feature's public API
        │
        ├── types/
        │   ├── conversation.types.ts
        │   └── message.types.ts
        │
        ├── constants/
        │   ├── filters.ts
        │   └── emojiList.ts
        │
        ├── lib/
        │   ├── formatConversationTime.ts
        │   └── mockData.ts
        │
        ├── utils/
        │   └── cn.ts
        │
        ├── validation/
        │   └── messageComposer.schema.ts
        │
        ├── services/
        │   └── messages.service.ts            ← swap this for Express (§4)
        │
        ├── stores/
        │   └── messagesStore.ts
        │
        ├── hooks/
        │   ├── useConversations.ts
        │   ├── useMessageThread.ts
        │   ├── useMessageComposer.ts
        │   └── useClickOutside.ts
        │
        └── components/
            ├── MessagesShell.tsx               ← the only "use client" boundary
            ├── MobileBottomNav.tsx
            │
            ├── common/
            │   ├── Avatar.tsx
            │   ├── UnreadBadge.tsx
            │   └── OverflowMenu.tsx
            │
            ├── conversation-list/
            │   ├── ConversationListPanel.tsx
            │   ├── ConversationListHeader.tsx
            │   ├── ConversationSearchInput.tsx
            │   ├── ConversationFilterChips.tsx
            │   └── ConversationRow.tsx
            │
            └── chat-panel/
                ├── ChatPanel.tsx
                ├── ChatEmptyState.tsx
                ├── ChatHeader.tsx
                ├── MessageThread.tsx
                ├── MessageBubble.tsx
                ├── DateDivider.tsx
                ├── TypingIndicator.tsx
                └── composer/
                    ├── MessageComposer.tsx
                    ├── ComposerInput.tsx
                    ├── EmojiButton.tsx
                    ├── EmojiPickerPopover.tsx
                    ├── AttachmentButton.tsx
                    └── SendButton.tsx
```

**39 files.** Messages are plain text only — there is no code-block/file-attachment
rendering variant; `AttachmentButton` opens a native file picker and tracks the
selected filenames locally, but doesn't upload or render anything yet (see §4.5
for wiring real uploads).

---

## 2. What each file is responsible for

### `app/messages/page.tsx`
The Next.js route. A Server Component with no logic of its own — it renders
`<MessagesShell />` and nothing else. This is intentional: keeping the client
boundary out of the route file means the route itself stays server-renderable.

### `shared/components/logo/SangumLogo.tsx`
App-wide brand asset (`SangumIcon`, `SangumLogoHorizontal`, `SangumLogoFull`).
Not feature-specific — lives in `shared/` because other features/pages are
expected to use it too (navbars, footers, etc).

### `features/messages/index.ts`
The feature's public API surface. Currently exports only `MessagesShell` —
that's all any consumer (the page) should need. If another feature ever needs
something from here (e.g. an unread-count badge for a global header), export
it explicitly from this file rather than reaching into the feature's internals.

### `types/`
| File | Responsibility |
|---|---|
| `conversation.types.ts` | `Conversation`, `ConversationType`, `ConversationFilter`, `AvatarColorKey`. `AvatarColorKey` is a **closed set of named tokens** (`"primary"`, `"accent"`, etc.), not raw hex/CSS — this is what lets `Avatar.tsx` map to literal Tailwind classes instead of unsafe dynamic class strings. |
| `message.types.ts` | `Message`, `MessageSender`, `MessageStatus`. Plain text only — no variants. |

### `constants/`
| File | Responsibility |
|---|---|
| `filters.ts` | The `All` / `Unread` / `Groups` filter chip definitions. |
| `emojiList.ts` | Fixed emoji set for the composer's quick-pick popover. |

### `lib/`
| File | Responsibility |
|---|---|
| `formatConversationTime.ts` | Pure date/time formatting: row timestamps ("11:24 AM" / "Yesterday" / "Mon"), thread date-divider labels ("Today" / "May 6, 2026"), and day-grouping for the thread. No React, no side effects — easy to unit test in isolation. |
| `mockData.ts` | Seed data (`MOCK_CONVERSATIONS`, `MOCK_MESSAGES`) standing in for a backend. **This is the file you delete once the Express API is live** — nothing else should import it directly except `services/messages.service.ts`. |

### `utils/cn.ts`
Minimal, dependency-free class-name joiner (`cn("a", cond && "b")` → `"a b"`).
No `clsx`/`tailwind-merge` — added deliberately to avoid pulling in a
dependency for something this small. Swap in `tailwind-merge` later if you
start hitting real class-conflict bugs.

### `validation/messageComposer.schema.ts`
Zod schema for a composer draft: trims whitespace, rejects empty strings, caps
length at 4000 chars. `validateComposerDraft()` wraps it in a `{success, ...}`
result so callers don't need to touch Zod's `safeParse` shape directly. This
is also exactly what an Express route should validate against server-side
(see §4.3) — don't trust the client-side check alone.

### `services/messages.service.ts`
**The entire external-communication boundary.** Every function is `async` and
returns exactly what a real fetch call would resolve to, on purpose — so
swapping the bodies for real HTTP calls means zero changes anywhere else in
the feature (hooks, store, components are all unaffected). Currently backed
by `lib/mockData.ts`. Four functions:
- `getConversations()`
- `getMessages(conversationId)`
- `sendMessage({ conversationId, text })`
This is the **one file you rewrite** to connect to Express — see §4.4.

### `stores/messagesStore.ts`
Zustand store holding state that's genuinely shared across non-nested parts
of the tree: `conversations`, `messagesByConversation`, `activeConversationId`,
`searchQuery`, `activeFilter`. Deliberately just state + plain setters — no
business logic, no API calls. (Business logic and orchestration live in the
hooks layer below, per this project's architecture rules.)

### `hooks/`
| File | Responsibility |
|---|---|
| `useConversations.ts` | Fetches conversations on mount via the service layer, exposes search/filter/sort/selection, and derives the live "Unread" count. |
| `useMessageThread.ts` | Loads a conversation's messages (lazily, once per conversation) and exposes `sendMessage` / `clearChat`. |
| `useMessageComposer.ts` | Local composer form state: draft text, emoji insert, file selection, submit validation via the Zod schema. Calls back into `useMessageThread`'s `sendMessage` — never touches the store or service directly. |
| `useClickOutside.ts` | Generic outside-click hook. Backs `OverflowMenu` and the emoji popover. |

### `components/MessagesShell.tsx`
**The only Client Component boundary and the only place that calls hooks or
touches the store.** Everything below it is pure presentation, driven by
props. Also owns the single responsive layout tree — sidebar vs. chat panel
visibility is controlled purely by Tailwind `lg:` breakpoints plus
`activeConversationId`, with no `matchMedia`/viewport JS, so there's no
server/client hydration mismatch.

### `components/MobileBottomNav.tsx`
Visual bottom nav shown only below the `lg` breakpoint, next to the
conversation list. `Home`/`Search` are inert (this feature doesn't own those
routes); `+` triggers the same "new message" stub as the header.

### `components/common/`
| File | Responsibility |
|---|---|
| `Avatar.tsx` | Initials, color, size, circle/rounded-square, online-status dot. Colors are looked up from a literal `Record<AvatarColorKey, string>` map — never built with a template string — so Tailwind's compiler can statically find every class. |
| `UnreadBadge.tsx` | Small unread-count pill. Renders nothing when count is 0. |
| `OverflowMenu.tsx` | Generic dropdown (trigger + panel), used for both the conversation-list "⋮" menu and the chat header menu. Closes on outside click and <kbd>Esc</kbd>. |

### `components/conversation-list/`
| File | Responsibility |
|---|---|
| `ConversationListPanel.tsx` | Composes the sidebar. Pure props in, no hooks. |
| `ConversationListHeader.tsx` | Logo, "new message" button, overflow menu. Owns its own **static** menu items (`New group`, `Starred`, `Archived`, `Settings`) locally since they're inert stubs with no backing state. |
| `ConversationSearchInput.tsx` | Controlled search input. |
| `ConversationFilterChips.tsx` | All / Unread / Groups chips. |
| `ConversationRow.tsx` | One row: avatar, name, timestamp, preview text + read/muted icon, unread badge. |

### `components/chat-panel/`
| File | Responsibility |
|---|---|
| `ChatPanel.tsx` | Composes header + thread + composer for the active conversation. Pure props in. |
| `ChatEmptyState.tsx` | Shown when no conversation is selected (desktop only — on mobile the list shows instead). |
| `ChatHeader.tsx` | Avatar, name, online status, mobile-only back button, overflow menu (mute/clear/block are real state changes; "view contact"/"search in conversation" are inert stubs — no target screens exist yet). |
| `MessageThread.tsx` | Scrollable, date-grouped message list. Auto-scrolls to the latest message. |
| `MessageBubble.tsx` | Single bubble, sent/received alignment and coloring. Plain text only. |
| `DateDivider.tsx` | Centered "Today" / "Yesterday" / date pill. |
| `TypingIndicator.tsx` | Animated three-dot row, shown when `conversation.isTyping`. |
| `composer/MessageComposer.tsx` | Orchestrates the composer row. Owns only the emoji-popover open/close state locally (that's "simple local UI state," allowed even in presentation components per this project's rules). |
| `composer/ComposerInput.tsx` | Plain text `<input>`. |
| `composer/EmojiButton.tsx` / `EmojiPickerPopover.tsx` | Trigger + emoji grid panel. |
| `composer/AttachmentButton.tsx` | Opens a native file picker; selected filenames are tracked in `useMessageComposer` state but not yet uploaded anywhere (see §4.5). |
| `composer/SendButton.tsx` | Disabled until the draft is non-empty. |

---

## 3. How to use this feature

### 3.1 Drop it into an existing Next.js project
1. Copy `src/features/messages/` and `src/shared/components/logo/` into your
   repo's `src/`.
2. Copy `src/app/messages/page.tsx` into your `app/` router.
3. Install the runtime dependencies if you don't already have them:
   ```bash
   npm install zustand zod lucide-react
   ```
4. Confirm `tsconfig.json` has the standard Next.js path alias:
   ```json
   { "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
   ```
5. Visit `/messages`.

### 3.2 Everything works without a backend
`services/messages.service.ts` is mock-backed by default, so the whole
feature — search, filters, selection, sending messages, mute/clear/block — is
fully interactive out of the box. This is the intended state for local
development and demos. Section 4 covers replacing the mock with a real API.

### 3.3 Extending the feature
- **New composer capability** (e.g. real emoji categories, GIFs): add to
  `composer/`, wire through `useMessageComposer`. Don't add new fields to
  `Message` until the composer can actually produce them — see the earlier
  code-block feature, which got removed for exactly that reason (a field the
  UI had no way to author is dead weight).
- **New conversation action** (e.g. "pin conversation"): add the mutation to
  `messagesStore.ts` as a plain setter, expose it from `useConversations.ts`,
  wire the callback through `MessagesShell.tsx` → `ConversationListPanel` →
  wherever the trigger lives.
- **Real-time updates**: see §4.6.

---

## 4. Implementing the Express API

The service layer was built for exactly this swap. Nothing outside
`services/messages.service.ts` needs to change — hooks, store, and every
component keep working unmodified as long as the function signatures below
stay the same.

### 4.1 Suggested endpoints

| Method | Path | Maps to |
|---|---|---|
| `GET`    | `/api/conversations`                        | `getConversations()` |
| `GET`    | `/api/conversations/:id/messages`           | `getMessages(id)` |
| `POST`   | `/api/conversations/:id/messages`           | `sendMessage({ conversationId, text })` |
| `DELETE` | `/api/conversations/:id/messages`           | Clear chat |
| `PATCH`  | `/api/conversations/:id`                    | Mute/unmute, block/unblock |

### 4.2 Express project structure

A small, separate service is enough — it doesn't need to share the feature's
folder conventions, just its data shapes:

```
server/
├── src/
│   ├── index.ts                 App entry — creates the Express app, starts listening
│   ├── app.ts                   Express app setup: middleware, route mounting
│   ├── routes/
│   │   └── conversations.routes.ts
│   ├── controllers/
│   │   └── conversations.controller.ts
│   ├── services/
│   │   └── conversations.service.ts   Business logic / DB access
│   ├── models/
│   │   ├── conversation.model.ts
│   │   └── message.model.ts
│   ├── validation/
│   │   └── sendMessage.schema.ts      Same Zod schema as the frontend
│   └── middleware/
│       └── errorHandler.ts
├── package.json
└── tsconfig.json
```

### 4.3 Data model (mirrors `types/*.ts` on the frontend)

```ts
// server/src/models/conversation.model.ts
export interface Conversation {
  id: string;
  type: "dm" | "group";
  name: string;
  avatarInitials: string;
  avatarColor: "primary" | "primary-light" | "accent" | "success" | "warning" | "danger" | "info";
  avatarRounded: boolean;
  isOnline: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  isTyping: boolean;
  lastMessageAt: string; // ISO timestamp
  lastMessagePreview: string;
  lastMessagePreviewIcon: "read" | "muted" | null;
  unreadCount: number;
}

// server/src/models/message.model.ts
export interface Message {
  id: string;
  conversationId: string;
  sender: "me" | "contact"; // in a real multi-user system, replace with a real userId
  text: string;
  createdAt: string; // ISO timestamp
  status: "sent" | "delivered" | "read";
}
```

> In a real product, `sender: "me" | "contact"` should become a real
> `senderId` resolved from the authenticated request (`req.user.id`), with
> "mine vs. theirs" computed on the frontend by comparing `senderId` to the
> logged-in user. This mock keeps `"me"` for simplicity since there's only
> ever one user in the demo.

### 4.4 Example route + controller

```ts
// server/src/routes/conversations.routes.ts
import { Router } from "express";
import * as controller from "../controllers/conversations.controller";

const router = Router();

router.get("/", controller.listConversations);
router.get("/:id/messages", controller.listMessages);
router.post("/:id/messages", controller.postMessage);
router.delete("/:id/messages", controller.clearMessages);
router.patch("/:id", controller.updateConversation);

export default router;
```

```ts
// server/src/controllers/conversations.controller.ts
import type { Request, Response, NextFunction } from "express";
import { sendMessageSchema } from "../validation/sendMessage.schema";
import * as conversationsService from "../services/conversations.service";

export async function listConversations(req: Request, res: Response, next: NextFunction) {
  try {
    const conversations = await conversationsService.getAll();
    res.json(conversations);
  } catch (err) {
    next(err);
  }
}

export async function listMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await conversationsService.getMessages(req.params.id);
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function postMessage(req: Request, res: Response, next: NextFunction) {
  const parsed = sendMessageSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid message" });
  }

  try {
    const message = await conversationsService.addMessage(req.params.id, parsed.data.text);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
}

export async function clearMessages(req: Request, res: Response, next: NextFunction) {
  try {
    await conversationsService.clearMessages(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function updateConversation(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await conversationsService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}
```

```ts
// server/src/validation/sendMessage.schema.ts
import { z } from "zod";

export const sendMessageSchema = z.object({
  text: z.string().trim().min(1, "Message can't be empty").max(4000, "Message is too long"),
});
```

```ts
// server/src/app.ts
import express from "express";
import cors from "cors";
import conversationsRouter from "./routes/conversations.routes";
import { errorHandler } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000" }));
  app.use(express.json());

  app.use("/api/conversations", conversationsRouter);

  app.use(errorHandler);
  return app;
}
```

```ts
// server/src/index.ts
import { createApp } from "./app";

const app = createApp();
const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`Messages API listening on :${port}`);
});
```

### 4.5 Rewiring the frontend — the only file that changes

Replace the body of `services/messages.service.ts`. The function signatures
stay identical, so nothing else in the feature needs to be touched:

```ts
// src/features/messages/services/messages.service.ts
import type { Conversation } from "../types/conversation.types";
import type { Message } from "../types/message.types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed: ${res.status}`);
  }
  // 204 No Content has no body to parse
  return res.status === 204 ? (undefined as T) : res.json();
}

export async function getConversations(): Promise<Conversation[]> {
  return request<Conversation[]>("/conversations");
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  return request<Message[]>(`/conversations/${conversationId}/messages`);
}

export interface SendMessagePayload {
  conversationId: string;
  text: string;
}

export async function sendMessage(payload: SendMessagePayload): Promise<Message> {
  return request<Message>(`/conversations/${payload.conversationId}/messages`, {
    method: "POST",
    body: JSON.stringify({ text: payload.text }),
  });
}
```

At that point `lib/mockData.ts` is no longer imported by anything and can be
deleted (or kept around purely for local storybook-style development —
your call).

**File attachments:** `AttachmentButton.tsx` already tracks selected files in
`useMessageComposer`'s local state (`attachedFileNames`) — nothing uploads
yet. To wire real uploads: add a multipart `POST /api/conversations/:id/attachments`
endpoint (using `multer` on the Express side), call it from
`services/messages.service.ts`, and extend the `Message` model with an
`attachments?: { url: string; name: string }[]` field once there's a real
place to store the files (S3, etc). Don't add the field before the upload
path exists — same reasoning as dropping the earlier code-block variant.

### 4.6 Optional: real-time updates

REST alone means a user has to re-fetch to see a new message arrive from
someone else. If that matters:
- Add a WebSocket layer (`socket.io` pairs easily with Express) emitting
  `message:new` / `conversation:updated` events.
- On the frontend, subscribe inside `useMessageThread`/`useConversations` and
  call the existing store actions (`appendMessage`, `setConversations`) when
  events arrive — no new state shape needed, since the store already has
  exactly the setters a socket handler would call.
- Keep the REST endpoints regardless — they're still what the composer's
  `sendMessage` call hits; the socket is purely for receiving updates
  triggered by *other* users.