---
title: "start-registry 1.2.1 restores StartOS update installation on 0.4.0.3 servers"
description: "According to the release, version 1.2.0 did not serve pure Ed25519 signatures to StartOS 0.4.0.3 servers even though they support them: such updates appeared unsigned, and the interface refused to install them. In 1.2.1, these signatures are served, and 0.4.0.3 servers can once again update the OS to releases signed with keys in gpg. SHA-256 and BLAKE-3 checksums are provided for the amd64, arm64 and riscv64 package builds."
pubDate: "2026-10-27T07:30:36.875Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "start-registry"
vendor: "Start9 / StartOS"
action: "If you run your own start-registry 1.2.0 instance serving StartOS 0.4.0.3 servers, update it to 1.2.1 during the next maintenance window and then retry installing the OS update on those servers; until then, the UI will reject it as unsigned. Verify the downloaded package's checksums against the values in the release. Those who do not distribute updates through their own start-registry 1.2.0 require no action."
hijacked: false
incidentKey: "start-registry|fp:1ba7cff469d7e517"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/Start9Labs/start-technologies/releases/tag/start-registry/v1.2.1"}]
---
