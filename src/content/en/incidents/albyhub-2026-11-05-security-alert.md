---
"title": "Alby Hub 1.24.6: patch with security fixes, swap address and app key validation"
"description": "Alby Hub v1.24.6 is described as a patch with bug fixes and security updates. Changes include validating swap-out and refund addresses against the hub's network, rejecting app public keys that are not valid points on the curve, disabling MPTCP by default in Hub binaries, and no longer reusing IDs of deleted rows after a database migration. The source gives no details of the underlying vulnerabilities and no signs of exploitation."
"pubDate": "2026-11-05T09:50:28.512Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
  - "node_operators"
"product": "alby hub"
"vendor": "Alby Hub"
"action": "If you hold funds in your own Alby Hub and do not yet have these fixes, update to the released version soon, then check that your connected apps still work. The release is signed: import the signing key from the project's scripts, verify the manifest signature with gpg --verify, and confirm the archive's sha256 matches the manifest before running it. If you already run a build with these fixes, no action is needed."
"hijacked": false
"incidentKey": "alby hub|product-fp:fa54157a849e7a9b"
"enPublishedAt": "2026-11-05T10:10:06.505Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/getAlby/hub/releases/tag/v1.24.6"
---
