---
name: Coaching Platform Architecture
description: Key decisions, API shapes, and deployment facts for the Coaching Management Platform SaaS.
---

## Runtime
- Frontend: Vite + React on port 5000 (`npm run dev:frontend`)
- Backend: Express + tsx watch on port 3001 (`npm run dev:backend`)
- Both started together via `concurrently` from root `npm run dev`
- Vite proxies `/api/*` → `http://localhost:3001` (vite.config.ts)

## Auth
- JWT tokens stored in `localStorage` under key `token`
- Login: `POST /api/auth/login` → `{ success, token, user }`
- JWT_SECRET stored in Replit Secrets (never hardcode in production)
- Demo credentials: admin@demo.com/Admin@123, teacher@demo.com/Teacher@123, student@demo.com/Student@123
- Seed: `POST /api/seed/demo` (also wired as button on login page)

## Security (Phase E — completed)
- `helmet` installed and configured in server.ts (CORP: cross-origin, CSP disabled for dev)
- `express-rate-limit`: 500 req/15min global, 20 req/15min for /auth/login
- `app.set('trust proxy', 1)` REQUIRED — Replit uses X-Forwarded-For, rate-limit will throw without this
- **Why:** Without trust proxy, express-rate-limit throws ERR_ERL_UNEXPECTED_X_FORWARDED_FOR on every request

## Critical API shape mismatches (fixed)
- Teacher dashboard returns `myBatches`, `materialsUploaded`, `testsCreated`, `pendingDoubts`, `upcomingClasses[]`
- `/teacher/analytics` returns: totalStudents, totalBatches, totalTests, totalMaterials, batches[], testResultSummary[]
- Student dashboard returns `recentResults[]`, `upcomingClasses[]`, `recentMaterials[]`, `feeStatus`
- `/student/fees` returns `{ fees: [], payments: [] }` (NOT a flat array)
- Materials backend stores as `fileUrl`/`fileType`/`fileName` — display layer must handle both shapes

## Router paths (react-router v7)
- Teacher live classes: `/teacher/classes`
- Student live classes: `/student/classes`
- Admin broadcast: `/admin/broadcast`
- Admin audit logs: `/admin/audit-logs`
- Router: `src/app/routes.tsx`

## DB
- Drizzle ORM schema at `apps/backend/src/db/schema.ts`
- Run `npm run db:push` to push schema changes
- `drizzle.config.ts` at root reads `DATABASE_URL` env var
- `settings` table: key (PK), value, updatedAt
- `auditLogs` table: userId, userRole, action, entity, entityId, details, ipAddress, createdAt
- `logAudit()` helper in admin.ts — never throws, silent fail so it never blocks requests

## File Uploads
- Backend: `POST /api/upload` (multer, 50MB limit) → saves to `uploads/` dir → returns `{ fileUrl, fileName, fileSize, mimeType }`
- Files served as static via `app.use('/api/uploads', express.static(...))` in server.ts
- Frontend: `api.uploadFile(file)` — does FormData POST

## Notifications
- Schema: `notifications` table — receiverId, senderId, type, title, message, link, isRead, createdAt
- Backend routes at `/api/notifications`
- Admin broadcast: `POST /api/admin/notifications/broadcast` with `{ title, message, type, targetRole?, batchId? }`
- Frontend: `NotificationBell` polls every 30s; `NotificationBroadcastPage` at `/admin/broadcast`

## Subjects & Chapters (Phase A)
- Admin routes: `GET/POST /admin/courses/:courseId/subjects`, `PUT/DELETE .../subjects/:subId`
- Admin routes: `GET/POST /admin/subjects/:subjectId/chapters`, `PUT/DELETE .../chapters/:chapterId`
- Order is auto-computed (last order + 1)

## Assignment Grading (Phase C)
- Teacher: `GET /teacher/assignments/:id/submissions` → returns submissions with student info
- Teacher: `PATCH /teacher/assignments/:id/submissions/:subId/grade` → `{ marksAwarded, feedback }`
- Frontend: AssignmentsPage.tsx has two views — list and submissions reviewer with grade dialog

## Fee Receipts (Phase D)
- Admin: `GET /admin/fees/:feeId/receipt` → `{ fee, payments }` with student info joined
- Frontend: StudentFeesPage uses `window.open()` to render a print-friendly HTML receipt
- Receipt shows: student info, course, fee breakdown, payment history table

## Test System (fully implemented)
- Auto-scoring MCQ, countdown timer, full-screen modal
- Backend routes: `GET/POST /api/teacher/tests/:id/questions`, `GET /api/student/tests/:testId/questions`, `POST /api/student/tests/:testId/submit`

## Admin Settings
- Persisted to `settings` table as key-value pairs
- Backend: `GET /api/admin/settings`, `PUT /api/admin/settings`

## PWA (Phase F)
- manifest.json: already existed in public/
- sw.js: updated to v2 with network-first navigation, cache-first for static assets, push notification support
- SW registration: already in index.html via `navigator.serviceWorker.register('/sw.js')`
- `app.set('trust proxy', 1)` must come before rate-limit middleware

## Audit Logs (Phase B)
- `GET /api/admin/audit-logs?limit=50&offset=0&entity=student`
- `AuditLogsPage` at `/admin/audit-logs` — paginated, filterable by entity, shows action badge colored by type
- `logAudit()` called on: student/teacher CREATE/DELETE, payment CREATE, batch members, subject CREATE/DELETE, notification BROADCAST

## What's Still Missing / Next to Build
1. Subjects/Chapters builder in Admin Courses UI (backend done, frontend CoursesPage not updated)
2. PDF viewer inline for materials (currently just links)
3. Admin Analytics page (separate from teacher analytics)
4. Student test autosave to localStorage
