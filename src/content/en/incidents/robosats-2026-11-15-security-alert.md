---
"title": "RoboSats: race between confirm_fiat() and open_dispute() can leave a settled order marked as in dispute; fixed in v0.8.8-alpha"
"description": "A RoboSats advisory says confirm_fiat() and open_dispute() read and write order status without a row lock or atomic transaction. If the \"in dispute\" write lands after the \"sending satoshis\" write, the order stays in dispute even though the escrow is already settled and the buyer's payout is irreversibly in flight; the background payout job does not check order status. The author rates severity Low-Medium and did not demonstrate net fund loss, but either party can reliably create an inconsistent state that hides the trade from normal dispute review. The proof of concept ran against the real code with LND network calls mocked. Per the advisory, versions up to and including v0.8.7-alpha are affected; the fix is in v0.8.8-alpha."
"pubDate": "2026-11-15T11:20:12.892Z"
"statusTags":
  - "patch_available"
"audience":
  - "merchant_infra"
"product": "robosats"
"vendor": "RoboSats"
"action": "If you run your own RoboSats coordinator or instance on v0.8.7-alpha or earlier, update to v0.8.8-alpha during normal maintenance. No action is needed on v0.8.8-alpha. See the advisory linked in the post for details."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "robosats|GHSA-9349-M8RP-P7WV"
"enPublishedAt": "2026-11-15T11:30:14.260Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/RoboSats/robosats/security/advisories/GHSA-9349-m8rp-p7wv"
---
