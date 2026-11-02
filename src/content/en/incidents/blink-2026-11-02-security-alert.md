---
"title": "Blink Wallet: mobile prerelease restores PIN lockout and seed-phrase screen protections"
"description": "Release notes for the Blink mobile wallet prerelease 3.0.44 list changes to access protection. The app lock is now kept in place through the logout it triggers. The escalating delay after incorrect PIN entries is back and keeps growing after the attempt limit is used up. Seed-phrase screens are now gated by the screen guard and fail closed. This implies that earlier builds could let the lock be interrupted during logout, had no escalating PIN lockout, and did not reliably protect seed-phrase screens with the screen guard. The release also adds Enhanced-mode telemetry behind an Incognito privacy gate. The source describes this as a prerelease and gives no exploitation details or deadlines."
"pubDate": "2026-11-02T16:20:49.846Z"
"statusTags": []
"audience":
  - "holders"
"product": "blink mobile wallet"
"vendor": "Blink Wallet"
"action": "If you hold funds in the Blink mobile app and rely on the PIN or app lock while other people may have physical access to your phone, do not treat the PIN as your only barrier until you are on a build with these changes. Turn on the operating system screen lock, keep your seed backup offline, and do not open seed-phrase screens while the screen is being recorded or shared. Update to a build with these fixes once it is available in your installation channel. If your build already includes them, no action is needed. Enable Enhanced-mode telemetry only deliberately."
"hijacked": false
"incidentKey": "blink mobile wallet|fp:fb313ec50d6a61db"
"enPublishedAt": "2026-11-02T16:40:04.176Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/blinkbitcoin/blink-mobile/releases/tag/3.0.44"
---
