---
title: "Wasabi Wallet v2.8.5: dependency security updates and strict transaction validation; workaround for corrupted passphrases to be removed soon"
description: "According to the developers, v2.8.5 updates dependencies to address disclosed vulnerabilities and adds stricter transaction validation to protect against malicious servers; verification of signatures on the wallet's own transactions and coinjoin stability fixes are also announced (amounts below 10,000 sats can no longer be queued for coinjoin payments). Sending BIP78 payjoin transactions has been removed — the feature will stop working. Separately, five years ago a clipboard bug in the macOS UI silently truncated and corrupted complex passphrases containing non-ASCII characters when pasted, and these wallets cannot be restored using standard BIP39 tools; the workaround for them will soon be removed."
pubDate: "2026-10-27T00:40:40.710Z"
statusTags: ["patch_available"]
audience: ["holders"]
product: "wasabi wallet"
vendor: "Wasabi Wallet"
action: "Wasabi users without these fixes should update to v2.8.5, verifying the package signature according to the vendor's instructions; users who have already updated need take no action. If you see a message when logging in that a compatibility passphrase was used, do not delay: create a new wallet in a trusted environment, record and check its backup, transfer the funds and wait for confirmation, then stop using the old wallet — otherwise access to it may be lost after the workaround is removed. Sending BIP78 payjoin is no longer available — replace this payment method."
hijacked: false
incidentKey: "wasabi wallet|product-fp:db691375072028f4"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/WalletWasabi/WalletWasabi/releases/tag/v2.8.5"}]
---
