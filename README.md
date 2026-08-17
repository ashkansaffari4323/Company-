# Company Upload Large Import

Vercel-ready Autodesk ACC/BIM 360 app.

## Fix for 504 on large Excel files

The client imports large Excel files in batches of 50 companies by calling `/api/companies/import-batch` once per batch. A 10,300-row file becomes 206 small API calls instead of one long-running Vercel function.

## Features

- Autodesk sign-in and hub selection
- Large Excel import with progress, 50-company API batches, and downloadable report
- Company list filters
- Company image upload
- Patch purge for zero-member companies, with report tab
