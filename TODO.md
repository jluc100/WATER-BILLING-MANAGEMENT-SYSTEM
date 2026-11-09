# WaterBill TODO

- [x] Add admin routes for system water-fetch control and admin card management.
- [x] Add controllers for system control and admin card operations.
- [x] Add systemControlService and integrate system flag into waterService.authorizeWaterFetch.
- [x] Add admin dashboard UI panels: System Control + Cards Management.
- [x] Update frontend API client with admin endpoints.
- [ ] Fix supabase/schema.sql formatting around `system_controls` (missing closing `);` and correct indexes placement).
- [ ] Ensure `system_controls` table exists in Supabase and default row (`global`) is present.
- [ ] Remove/resolve Vite HMR warning if still appearing (AuthContext export compatibility).
- [ ] Smoke test endpoints:
  - [ ] PATCH /api/admin/system/water-fetch toggles flag
  - [ ] /api/water/authorize blocks when stopped
  - [ ] /api/admin/cards create/list/recharge works

