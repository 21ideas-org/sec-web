---
"title": "Coinos adds round-coin check before signing Ark renewal forfeits and aligns dust rule with server version"
"description": "Per a Coinos commit, the renewal code did not check that the unlock hash of its forfeits matched the hash locking the new round coins. This is the same issue as upstream bark !2803, reported by MrHodl. Round coins are now checked before the leaf cosign and the forfeit: a hash-locked leaf with the expected unlock hash, anchored in this round's funding transaction, paid to the wallet's own output key, and worth at least the requested amount. On any mismatch nothing is signed and the reason is kept. Separately, sends now follow the server's dust rule. A server advertising ArkInfo field 23 (max_round_participation_outputs, new in 0.9.0) gets the new rule, which refuses a cosign whose checkpoint has an output under 330 sat unless the input itself is dust. Any other server gets the older 0.8.0 behavior. All arkoor builds (sends, Lightning HTLC sends, refunds, sweeps, claims) go through this logic."
"pubDate": "2026-11-25T15:41:24.904Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
  - "developers"
"product": "coinos"
"vendor": "Coinos"
"action": "If you deploy or build Coinos v3 code with Ark features, use a build that includes these fixes (the round-coin check before forfeit, and dust-rule selection by server version). Without them, renewals are signed without the hash check and sends may not match the server's rule. If you already run a build with these fixes, no action is needed. See the linked commit for details."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "coinos|product-fp:ca388a05bdce36f1"
"enPublishedAt": "2026-11-25T15:50:16.393Z"
"links":
  - "label": "git.coinos.io"
    "url": "https://git.coinos.io/coinosv3.git/commit/?id=b23b02bdaae233f51b543bc60fa38a025e07a743"
---
