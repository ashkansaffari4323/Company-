$files = Get-ChildItem ".\client\src" -Recurse -File -Include "*.jsx","*.js"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Remove the exact minified validation clause used in the current app.
    $content = $content.Replace("else if(!r.trade){status='Missing required field';reason='Missing trade';missing++}", "")
    $content = $content.Replace('else if(!r.trade){status="Missing required field";reason="Missing trade";missing++}', '')

    # Remove more spaced variants if the file was formatted.
    $content = [regex]::Replace($content, "else\s+if\s*\(\s*!r\.trade\s*\)\s*\{\s*status\s*=\s*['\"]Missing required field['\"]\s*;\s*reason\s*=\s*['\"]Missing trade['\"]\s*;\s*missing\+\+\s*;?\s*\}", "")

    # Update visible UI copy where present.
    $content = $content.Replace("State, phone, and Tax ID/ABN are optional and cleaned if blank or 0.", "Only Name is required. Trade is optional and defaults automatically. State, country, phone, ABN, ERP and address are not sent during import.")
    $content = $content.Replace("State, phone, and ABN/Tax ID are optional. Blank or 0 values are omitted.", "Only Name is required. Trade is optional and defaults automatically. Optional fields are not sent during import.")
    $content = $content.Replace("State, phone, and ABN/Tax ID are optional", "Only Name is required. Trade is optional")

    [System.IO.File]::WriteAllText($file.FullName, $content)
}

Write-Host "Frontend validation updated: Trade is now optional."
