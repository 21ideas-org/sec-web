---
title: "Core Lightning: currencyrate plugin trusts compromised certificates, enabling possible HTTPS MITM (RUSTSEC-2026-0381)"
description: "The Core Lightning project reports on its channel that older versions of the webpki-roots dependency continue to trust compromised emSign intermediate certificates, which may expose HTTPS requests to MITM attacks. CLN's own code and the Lightning protocol are not affected: the issue is limited to the currencyrate plugin, which is enabled by default. The risk arises when using this plugin's commands and when configuring currency conversion for the bookkeeper plugin. The BIP353 plugin is not affected in practice because it relies on DNS and ignores the vulnerable certificate verification path."
pubDate: "2026-10-22T13:30:08.724Z"
statusTags: []
audience: ["node_operators"]
product: "core lightning"
vendor: "Core Lightning (CLN)"
action: "If you do not need currencyrate functionality, disable the plugin now by adding disable-plugin=cln-currencyrate to the CLN configuration. A fix has not yet been released: it is waiting for a dependency update and the next CLN release, so until then rely on disabling the plugin rather than updating."
hijacked: false
incidentKey: "core lightning|fp:5a90bc87fa079831"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"x.com - Core_LN","url":"https://x.com/Core_LN/status/2113259577789575352"}]
---
