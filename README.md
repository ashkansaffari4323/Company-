# Company Upload Final

Latest complete Vercel-ready Autodesk ACC/BIM 360 company upload app.

## Included fixes

- Vercel Hobby compatible: 12 API functions only.
- Shared helper moved to `/lib/_lib.js`, not `/api/_lib.js`.
- Large Excel imports are browser-controlled batches of 50 companies via `/api/companies/import-batch`.
- Only **Name** is mandatory in Excel validation.
- Trade is optional in Excel. Backend sends a safe default trade if Excel trade is blank/0/N/A.
- Company creation sends only `name` and `trade` to Autodesk, avoiding country/state/phone/ABN validation errors.
- Validation checks existing hub companies and duplicate names inside Excel.
- Hub Admin supports company list/filter, company detail, company image upload, project list.
- Purge uses PATCH, not DELETE, for zero-member companies.

## Vercel settings

Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: client/dist
