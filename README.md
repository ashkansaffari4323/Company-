# Company Upload Purge Patch

Vercel-ready Autodesk ACC/BIM 360 company upload app.

## Important purge behaviour

There is no DELETE workflow in this version. Purge uses PATCH on each 0-member company:

PATCH /hq/v1/accounts/{account_id}/companies/{company_id}

The app first tries to set `status: deleted` and rename the company to `removed at ... {company_id}`. If Autodesk rejects that, the app tries `status: inactive`, and then rename-only as a final fallback.

## Purge report

The Report tab shows:
- Total scanned
- Zero-member companies
- Already deleted
- Candidates patched
- Patched deleted
- Patched inactive
- Renamed only
- Failed

## Vercel settings

Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: client/dist
