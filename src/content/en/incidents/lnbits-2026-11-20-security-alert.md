---
"title": "LNbits: callback allowlist bypass allows unauthenticated server-side request forgery (SSRF)"
"description": "The LNbits advisory says the callback URL check (check_callback_url) is both bypassable and ignored. An address of the form allowed-host@internal-address is accepted because only the part before the \"@\" is read. When a callback is rejected, LNbits logs \"Callback not allowed\" and sends the request anyway. According to the source, an unauthenticated caller can create a wallet, create an invoice with a webhook pointing at an internal address, and pay it themselves. The response status (200 vs 404) then lets them map the host's internal network, open ports and HTTP paths. Through the cloud metadata endpoint they can also learn the instance's IAM role name. Each request carries an attacker-controlled POST body (the invoice memo) and is sent twice. The source notes the bypass affects every caller of check_callback_url, including api_perform_lnurlauth, the callback that CVE-2025-32013 was filed to fix. The fix is released in 1.6.0 (pip package lnbits)."
"pubDate": "2026-11-20T09:50:17.107Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
  - "merchant_infra"
"product": "lnbits"
"vendor": "LNBits"
"action": "If you run your own LNbits instance (especially in the cloud or on a network where internal services are reachable) and it does not have this fix, update to 1.6.0 as soon as possible. Do not rely on the callback allowlist as a protection. Installations that already include the fix need no action. See the advisory linked in the post for details."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "lnbits|CVE-2026-115564"
"enPublishedAt": "2026-11-20T10:00:11.831Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/lnbits/lnbits/security/advisories/GHSA-qjqm-577g-5q7x"
---
