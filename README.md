# Company Upload Optional Fields

This version makes State, Phone, and Tax ID / ABN optional.

Values like `0`, `N/A`, `NA`, `null`, `undefined`, `-`, and blank are cleaned before sending to Autodesk.

Only `Name` and `Trade` are required by the app validation.

Large Excel files are still imported in browser-controlled batches of 50 companies to avoid Vercel 504 timeout.
