# Company Upload Purge Report

Vercel-ready Autodesk ACC/BIM 360 company upload app with Purge Report tab.

## New in this version

- Purge action now reports the number of companies scanned, candidates, deleted, and failed.
- New Report tab shows purge summary numbers clearly.
- Report tab can download a CSV report of purge results.
- Purge deletion still depends on Autodesk API availability/permissions in the tenant. If Autodesk refuses deletion, the report shows 0 deleted and the exact error per company.

## Vercel settings

Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: client/dist
