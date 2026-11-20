---
"title": "LNbits: reflected XSS in /lnurlwallet lets a single link or QR code run JavaScript in the instance's origin"
"description": "Per the vendor advisory, the unauthenticated /lnurlwallet endpoint places the bech32 human-readable prefix (HRP) from the lightning parameter into an error message that is rendered without escaping. A single click on a crafted link, or a scan of a QR code that looks like an ordinary \"claim your sats\" code, is enough. If the victim has an active LNbits session in the same browser, the injected script can make requests on their behalf. It can read wallet balances and payment history, create API keys and perform other authenticated actions, even though the session cookie is HttpOnly. Neither the password nor the wallet keys are needed. Versions up to and including 1.6.2-rc1 are affected; the input does not name a fixed version. The source does not report exploitation in the wild; only the author's proof of concept is confirmed."
"pubDate": "2026-11-20T10:10:31.770Z"
"statusTags": []
"audience":
  - "holders"
  - "node_operators"
"product": "lnbits"
"vendor": "LNBits"
"action": "If you use LNbits, your own or someone else's instance, on version 1.6.2-rc1 or earlier: do not open LNURL-withdraw links or scan QR codes from unverified sources until a fix is available. Until then, keep your LNbits session in a separate browser or profile and log out when you are not using the wallet. Open suspicious links only in a browser with no active LNbits session. Instance operators: follow the vendor advisory and check the API key list for unfamiliar entries that appeared without your involvement. No action is needed on builds that are already fixed."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "lnbits|CVE-2026-118671"
"enPublishedAt": "2026-11-20T10:20:17.684Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/lnbits/lnbits/security/advisories/GHSA-g7c6-hwmg-j9v8"
---
