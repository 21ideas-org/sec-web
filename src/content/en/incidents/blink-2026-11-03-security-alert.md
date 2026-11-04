---
"title": "Blink 3.0.46: authenticator code now required to change email/phone or turn off 2FA; app lock and PIN fixes"
"description": "Blink 3.0.46 requires an authenticator code to add an email or phone number or to turn off two-factor authentication. 2FA is now suggested as a custodial balance grows and required above a set amount, with the option to move to self-custody instead. The release includes security fixes to the app lock, PIN lockout and PIN fallback, and blocks screen capture on cloud backup and restore, recovery phrase entry and authenticator setup. Self-custodial wallets now keep an encrypted recovery bundle, updated after every payment, with its last-update date shown in the app and verifiable even when Blink's services are unavailable."
"pubDate": "2026-11-03T16:00:08.947Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "blink wallet"
"vendor": "Blink Wallet"
"action": "If you hold funds in a custodial Blink balance: update the app to the release with these fixes, then set up an authenticator in security settings and keep an offline backup of the setup key, otherwise access cannot be recovered if you lose your phone. Check that changing email/phone and turning off 2FA ask for a code. For a self-custodial wallet, confirm in settings that the recovery backup date is recent and verify the backup. If these fixes are already installed and the authenticator is set up, no action is needed."
"hijacked": false
"incidentKey": "blink wallet|product-fp:fb294dd1544ae8ca"
"enPublishedAt": "2026-11-04T05:30:04.712Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/blinkbitcoin/blink-mobile/releases/tag/beta-3.0.46"
---
