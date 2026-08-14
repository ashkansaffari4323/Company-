# Company Upload Tabs

Vercel-ready Autodesk ACC/BIM 360 company upload app.

## Tabs

- Import Companies: upload Excel and create account companies.
- Hub Administration: view hub companies, view projects, select one or more companies, select one or more projects, and check whether the selected companies are already on selected projects.

## Important Autodesk limitation

Autodesk currently does not support directly adding companies to BIM 360 projects without adding a member from that company. The app includes the selection workflow and project company checks, but direct push returns a clear limitation message. To truly attach a company to a project, add a user/member from that company to the project.

## Vercel settings

Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: client/dist

## Environment variables

APS_CLIENT_ID
APS_CLIENT_SECRET
APS_CALLBACK_URL
SESSION_SECRET
ACC_ACCOUNT_ID optional fallback when Data Management hubs return empty
ACC_ACCOUNT_NAME optional fallback display name
