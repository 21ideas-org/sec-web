---
"title": "Bisq 1.10.12 updates bundled Java 21 runtime to fix Java4Shell (CVE-2026-114938)"
"description": "According to the Bisq release notes, version 1.10.12 updates the Java 21 runtime bundled with the application to fix Java4Shell (CVE-2026-114938), which the vendor describes as a serious vulnerability that could allow an attacker to run code on affected systems. The release also includes the latest Tor security release. The vendor also lists stricter handling of network data: incoming messages are size-checked before they are read, and malformed network data, offers, trade statistics, alerts and mailbox entries are rejected. Alerts now require a signature over all their fields, and alerts from earlier versions are ignored. The data directory is owner-only on Linux and macOS, and the daemon requires an API password and listens only on the local address unless configured otherwise. The vendor states that updating is required to continue trading."
"pubDate": "2026-11-20T03:11:28.349Z"
"statusTags":
  - "patch_available"
"audience":
  - "holders"
"product": "bisq"
"vendor": "Bisq"
"action": "If you have Bisq installed, update to 1.10.12 as soon as possible, even if you are not currently trading, as the vendor advises; per the vendor, trading will not continue without the update. Verify the downloaded build by following the vendor's verification and installation instructions. If you are already on 1.10.12, no action is needed."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "bisq|CVE-2026-114938"
"enPublishedAt": "2026-11-20T03:20:14.688Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/bisq-network/bisq/releases/tag/v1.10.12"
---
