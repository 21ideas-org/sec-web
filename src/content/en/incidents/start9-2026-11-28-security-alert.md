---
"title": "StartOS 0.4.3-rc.4 fixes Linux kernel flaws, a kill-switch bypass and local-network access to the data drive"
"description": "Start9 released StartOS 0.4.3-rc.4 with security fixes. On x86 and generic ARM servers, updating to Debian-signed Linux 7.3.4 fixes CVE-2026-99284 and CVE-2026-99288. The Raspberry Pi kernel is updated to fix CVE-2026-98432, a flaw in TCP connection handling. Routes pushed by the local network, such as DHCP option 121 routes in the TunnelVision attack (CVE-2024-3661), no longer bypass a selected outbound gateway or its kill switch for public destinations. Other devices on the local network can no longer forget or repair the data drive while the server starts, and the server password is now required to forget or repair the drive, rebuild, or update from Diagnostic Mode (reported by EZO Labs Security). Registry requests relayed through the server now require authentication; previously anyone who could reach its interface could direct it to connect to hosts on its own network. Forged client-address headers are blocked, cross-site WebSocket and state-changing requests to service interfaces protected by HTTP Basic authentication are refused, and JSON-RPC request bodies and registry error replies are size-limited."
"pubDate": "2026-11-28T02:50:44.654Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "startos"
"vendor": "Start9 / StartOS"
"action": "StartOS operators: update to 0.4.3-rc.4 to get these fixes; if you have already updated, no action is needed. On Server Pure, the first start after the update also updates the server's firmware. The server will be offline for up to 5 minutes; do not unplug or power it off, as an interrupted firmware update can leave it unable to start. Progress is shown only at the server's local network address over http (not https); over https, a public domain or Tor, the server is unreachable until the firmware update finishes. When upgrading from a version before 0.4.2, check your services' public domains and turn back on any you want to use."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "start9 / startos|CVE-2026-99284"
"enPublishedAt": "2026-11-28T03:00:21.944Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/Start9Labs/start-technologies/releases/tag/start-os/v0.4.3-rc.4"
---
