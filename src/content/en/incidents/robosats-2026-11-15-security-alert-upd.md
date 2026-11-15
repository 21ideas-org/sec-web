---
"title": "RoboSats Android app: any co-installed app could steal the full robot identity"
"description": "Per the RoboSats advisory, the exported MainActivity in the Android app inserted the order_id Intent extra into JavaScript without escaping and executed it in a WebView. That WebView exposes a JS bridge to encrypted storage and to authenticated requests to the coordinator. Any other app installed on the same device, with no permissions, could call this activity and read garage_slots: the account token, the Nostr private key and PGP key material. That means full impersonation of the user and access to their trades. The author demonstrated the extraction in an emulator on the public v0.8.7-alpha build. Versions v0.8.7-alpha and earlier are affected; the fix is in v0.8.8-alpha."
"pubDate": "2026-11-15T11:30:45.439Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "robosats android app"
"vendor": "RoboSats"
"action": "If you use the RoboSats Android app v0.8.7-alpha or earlier, update to v0.8.8-alpha. The web version and installs that are already updated need no action. Because any app on the same device could have extracted the secrets, after updating create a new robot identity of your own in a trusted, unaffected environment. Save and verify its backup, complete or withdraw funds from your old trades and wait for confirmation, then stop using the old identity. See the advisory linked in the post for details."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "robosats|CVE-2026-118672"
"enPublishedAt": "2026-11-15T11:40:16.088Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/RoboSats/robosats/security/advisories/GHSA-3jxq-v3c4-6j49"
---
