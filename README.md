# Clean Fields Patch

Copy these files into your existing app repository, replacing the same paths.

This patch fixes imports where State, Phone, and Tax ID / ABN contain invalid placeholder values such as `0`, `N/A`, `NA`, `null`, `undefined`, `none`, `-`, or `--`.

It updates both import routes:

- api/companies/import-batch.js
- api/companies/import.js

This matters because your failed result was still using the old bulk import route `/api/companies/import`, not only the new batch route.
