---
name: Phase 2 Real-time Notifications — SSE Architecture
description: Why SSE was chosen over WebSocket for real-time notifications, and how the system is structured.
---

## Decision: SSE not WebSocket

Replit's dev proxy does not reliably forward WebSocket upgrade requests. Attempting to proxy WebSocket via Vite (`ws: true` in proxy config) caused Vite's own HMR WebSocket to get a `400 Unexpected response code`. Pure HTTP SSE (EventSource) travels through the existing `/api` proxy with no protocol issues.

**Why:** WebSocket requires an HTTP→WS protocol upgrade that Replit's proxy may reject. SSE is chunked HTTP — the same proxy that works for REST works for SSE.

**How to apply:** Any future real-time server-to-client feature should use SSE. If bidirectional messaging is ever needed, use HTTP polling or a dedicated external WS service (not a local WS server proxied through Vite).

## SSE Manager (`apps/backend/src/ws/wsManager.ts`)

Despite the filename (kept for import compatibility), this is now an SSE manager. Key exports:
- `registerSseClient(userId, role, res)` — registers a Response as an SSE stream, returns cleanup fn
- `emitToUser(userId, event)` — push to one user's sessions
- `emitToUsers(userIds[], event)` — push to a list
- `emitToRole(role, event)` — push to all of a given role
- `emitToAll(event)` — broadcast

## SSE Endpoint

`GET /api/notifications/stream?token=<jwt>` — auth via query param (EventSource API has no custom headers). Sends `data: {...}\n\n` lines. Heartbeat comment `': heartbeat\n\n'` every 20s to keep Replit's proxy from timing out the connection.

Set headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache, no-transform`, `X-Accel-Buffering: no`.

## Frontend Hook (`src/app/hooks/useRealtimeNotifications.ts`)

Uses native `EventSource` API. Auto-reconnects natively — no custom backoff needed. Accepts `{ onNotification, enabled }`. Closes on unmount.

## Doubt Reply Flow

Teacher replies → `POST /api/teacher/doubts/:id/reply`:
1. Fetches doubt to get `studentId`
2. Inserts reply + marks doubt as `answered`
3. Inserts a `notifications` DB record (persists in bell)
4. Calls `emitToUser(studentId, event)` to push SSE event instantly

Student's `StudentDoubtsPage` also subscribes to the hook — on a `doubt`-type event it silently reloads the doubts list and highlights the newly answered doubt card with a green ring + "New reply!" badge for 8 seconds.

## NotificationBell Integration

`NotificationBell` calls `useRealtimeNotifications` — on any notification event:
- Shows a `sonner` toast with type-specific icon/color
- Increments unread badge (with pulse animation)
- Prepends to the open list if the panel is open
- Polling interval reduced from 30s → 60s (real-time covers freshness)
