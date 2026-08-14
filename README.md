# Company Import Final

## Run

1. Delete old folder: `C:\Users\Saffa\Company Import`
2. Extract this ZIP.
3. Rename extracted folder to `Company Import` if needed.
4. Edit `server\.env` and paste your APS Client Secret.
5. Run:

```cmd
cd "C:\Users\Saffa\Company Import"
npm install
npm run dev
```

Open: http://localhost:8080

Backend health: http://localhost:3001/api/health

Autodesk callback must be exactly: http://localhost:8080/callback

## Required server files

```text
server
├── .env
├── .env.example
├── package.json
└── src
    └── server.js
```


## Important token behaviour

- Hub selection uses Autodesk 3-legged OAuth because the signed-in user must authorize access to hubs.
- Company creation uses Autodesk 2-legged OAuth because the BIM 360 `/hq/v1/accounts/{account_id}/companies` endpoint can reject 3-legged tokens with code `1003` and message `Only support 2 legged access token.`
- The APS app Client ID must still be added to the ACC/BIM 360 account integration with Account Admin access.


## State fix

The server automatically converts Australian state abbreviations before sending to Autodesk:

- SA -> South Australia
- NSW -> New South Wales
- VIC -> Victoria
- QLD -> Queensland
- WA -> Western Australia
- TAS -> Tasmania
- NT -> Northern Territory
- ACT -> Australian Capital Territory

This avoids Autodesk error code 1001: `The state doesn't exist in the country.`


## Updated ACC template columns

The downloaded Excel template now matches the ACC Add Company form more closely:

```text
Name
Trade
Website
Country
Address
City
State or Province
Postal Code
Phone
ERP Partner Company ID
Tax ID
Description
```

Example address row:

```text
Name: ACOR Building Services
Website: http://www.acor.com.au
Trade: Building Services
Country: Australia
Address: 169 Gladstone Street
City: Canberra
State or Province: Australian Capital Territory
Postal Code: 2609
Phone: +61 2 6240 2900
Description: Building Services
```

The backend still sends the correct Autodesk API fields: `address_line_1`, `city`, `state_or_province`, `postal_code`, `country`, and `phone`.
