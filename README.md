# Company Upload Purge

Vercel-ready Autodesk ACC/BIM 360 company upload app.

## Features

- Autodesk 3-legged sign-in.
- Hub dropdown with optional ACC account fallback.
- Bulk company import using `/hq/v1/accounts/{account_id}/companies/import` in batches of 50.
- Hub company list using `/construction/admin/v1/accounts/{accountId}/companies`.
- Company details using `/hq/v1/accounts/{account_id}/companies/{company_id}`.
- Company image upload using `/hq/v1/accounts/{account_id}/companies/{company_id}/image`.
- Purge companies with 0 members.

## Purge rules

Default: `userSize == 0 and projectSize == 0`.
Optional: include project-linked companies when `userSize == 0`.
The app requires typing `PURGE` before deletion.

## Vercel settings

Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: client/dist
