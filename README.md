# Company Upload Vercel

Vercel-ready Autodesk ACC/BIM 360 company upload app.

## Deploy

1. Push this folder to GitHub.
2. Import repository in Vercel.
3. Add environment variables in Vercel Project Settings.
4. Set Autodesk APS callback URL to your deployed domain plus `/callback`.
5. Redeploy.

## Vercel build settings

Framework Preset: Other
Build Command: npm run build
Output Directory: client/dist
Install Command: npm install

## Local Vercel dev

npm install
npx vercel dev

## Environment variables

APS_CLIENT_ID
APS_CLIENT_SECRET
APS_CALLBACK_URL
SESSION_SECRET
