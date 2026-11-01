---
title: "Sparrow Wallet 2.5.6 adds signature verification for unconfirmed transactions and block checks during reorganizations"
description: "In release 2.5.6, Sparrow verifies the signatures of its own inputs before adding an unconfirmed transaction to the wallet history — the fix was ported from Electrum following its security advisory (the release is linked in the post). Other additions include: verifying recipient input signatures in payjoin before checking the proposal fee, comparing saved block hashes with the header store on the wallet's first load and re-querying the script hash during a reorganization, marking a confirmation as unverified if its block has been replaced, rejecting output descriptors without extended public keys (including addr()), checking the claimed number of cosigners when importing Electrum multisig wallets, extending the wallet lock to label imports, sweep, message signing and password requests, deleting a backup only after saving a password change, and additional checks for Satscard, Tapsigner and Satschip operations. Separately, the bundled Tor has been updated to meet network requirements, and eMudhra root certificates have been removed from the bundled Java trust store."
pubDate: "2026-10-29T13:31:04.421Z"
statusTags: ["patch_available"]
audience: ["holders"]
product: "sparrow wallet"
vendor: "Sparrow Wallet"
action: "If you use Sparrow Wallet without these fixes, update to 2.5.6 at the next opportunity, downloading the build only from the official release and verifying signatures; the bundled Tor update is also needed to connect to the Tor network under its current requirements. If you use Bitcoin Core v32.1 or newer and the RPC connection closes, check the rpcallowip setting on the node — updating the wallet does not replace that. Installations that already contain these fixes need no action; this release does not require replacing the seed or moving funds."
hijacked: false
incidentKey: "sparrow wallet|GHSA-6JP4-8V48-CC5V"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/sparrowwallet/sparrow/releases/tag/2.5.6"}]
---
