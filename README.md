# Company Upload Validate

Vercel-ready Autodesk ACC/BIM 360 app.

## New feature

Before import, click **Validate Excel**. The app checks:

- Duplicate names inside the Excel file
- Companies already existing in the selected hub
- Missing required fields

Only rows marked **Ready** are imported. Existing and duplicate rows are skipped and shown in the validation report.

## Large files

A single Excel file can contain thousands of companies. Import is sent from the browser in batches of 50 companies per API call to avoid Vercel 504 timeouts.

## Vercel settings

Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: client/dist
