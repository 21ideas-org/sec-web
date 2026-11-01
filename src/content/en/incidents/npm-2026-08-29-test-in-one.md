---
title: "Malicious postinstall script found in npm package test-in-one, stealing cryptocurrency wallet files"
description: "GitHub Security Advisory reports that the test-in-one package pulls in a local dependency with a postinstall script that runs automatically when the package is installed through npm. The script traverses the home directory, Desktop, Documents, Projects and the current folder, collecting the contents of desktop cryptocurrency wallet directories. Those who installed this package and keep bitcoin wallet files on the same machine are at risk."
pubDate: "2026-08-29T03:51:31.000Z"
statusTags: ["exploitation_confirmed"]
audience: ["holders"]
product: "test-in-one (npm)"
vendor: "GitHub Advisory Database"
action: "If the test-in-one package is installed on your machine, remove it immediately, consider any wallet files on that machine compromised, and move funds to a new address from a clean device."
hijacked: false
incidentKey: "GHSA-34hr-xghx-cfj4"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/advisories/GHSA-34hr-xghx-cfj4"}]
---
