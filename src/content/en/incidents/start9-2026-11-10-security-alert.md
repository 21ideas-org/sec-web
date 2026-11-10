---
"title": "StartTunnel 1.5.1: tunnel database and WireGuard configuration with server keys now readable only by root"
"description": "Start9 lists two security fixes in StartTunnel 1.5.1. First, only root can now read the tunnel database and the WireGuard configuration, which hold the server's keys; existing installs are tightened when the service starts. Second, publishing to the Start9 apt repository now refuses to sign any package that the repository's existing signed index does not list. According to the release notes, dritzps reported both issues. The source does not describe the previous file permissions in detail and does not say whether either issue was exploited."
"pubDate": "2026-11-10T01:31:26.190Z"
"statusTags":
  - "patch_available"
"audience":
  - "node_operators"
"product": "starttunnel"
"vendor": "Start9 / StartOS"
"action": "If you run StartTunnel on your own server, update to 1.5.1 and restart the service, because the permissions on the tunnel database and WireGuard configuration are tightened at startup. Until the restart, treat the server keys as possibly readable by non-root local users and processes on that machine. If you suspect such access, regenerate the tunnel/WireGuard keys and update the client configurations. If you are already on 1.5.1 and the service has been restarted, no action is needed. See the release notes for details."
"hijacked": false
"incidentKey": "starttunnel|fp:a605a07fba298b38"
"enPublishedAt": "2026-11-10T01:50:04.085Z"
"links":
  - "label": "github.com"
    "url": "https://github.com/Start9Labs/start-technologies/releases/tag/start-tunnel/v1.5.1"
---
