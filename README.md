# Name-only import patch

Copy these files into your existing app repository and replace the same paths:

- api/_lib.js
- api/companies/import.js
- api/companies/import-batch.js

What this fixes:

- Only `name` is treated as mandatory by the import backend.
- `trade` is optional from Excel. If trade is blank, `0`, `N/A`, etc., the backend uses a default trade.
- `state_or_province`, `phone`, `tax_id` / ABN, country, address, website, and description are optional.
- Placeholder values such as `0`, `0.0`, `N/A`, `NA`, `null`, `undefined`, `none`, `-`, `--`, and `#N/A` are removed before sending to Autodesk.
- Both old and new import routes are patched:
  - `/api/companies/import`
  - `/api/companies/import-batch`

Optional Vercel environment variable:

DEFAULT_TRADE=Corporate & Professional Services

If DEFAULT_TRADE is not set, the backend uses `Corporate & Professional Services`.
