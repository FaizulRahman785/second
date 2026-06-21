---
name: Phase 1 Pagination API Design
description: Server-side pagination, search, filter pattern for admin routes + N+1 fix approach used throughout.
---

## Paginated Response Format
```json
{ "success": true, "data": [...], "pagination": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 } }
```
Fees endpoint additionally returns `stats: { totalAmount, totalDiscount }`.

## Query Params Convention
`?page=1&limit=20&search=text&status=active&sort=createdAt&order=desc`
- `status` param doubles as `fileType` filter for materials, `entity` filter for audit-logs.
- `?all=true` on `/admin/courses` and `/admin/batches` returns lightweight list (no pagination) for dropdowns.
- `/admin/students/all` and `/admin/teachers/all` are dedicated unpagedted dropdown endpoints.

## Helper Functions (admin.ts)
- `parsePagination(query, defaultLimit)` — extracts and sanitizes page/limit/offset/search/status/sort/order.
- `paginationMeta(total, page, limit)` — returns `{ page, limit, total, totalPages }`.

## N+1 Fix Patterns
- Batches student count: SQL subquery `(SELECT COUNT(*) FROM batch_students WHERE batch_id = ${schema.batches.id})` as inline column.
- Teacher analytics: `inArray()` + `groupBy()` in a single query, then map results in JS — avoids one query per test/batch.
- Student doubts replies: fetch all doubt IDs, one `inArray` query for all replies, group by doubtId in JS.

## Frontend Pattern
- Pages use debounced search (400ms) with `useRef<setTimeout>` pattern.
- `TablePagination` component at `src/app/components/shared/TablePagination.tsx` is the reusable pagination UI.
- `api.admin.getAllStudents()` / `getAllTeachers()` for dropdown use (BatchesPage, FeesPage).

**Why:** Without server-side pagination, fetching all rows causes slow queries, large payloads, and JS-heap pressure as data grows. Indexes were co-added to avoid full-table scans on common filter columns.
