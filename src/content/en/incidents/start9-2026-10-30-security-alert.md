---
title: "start-cli 2.6.0: backup and CIFS passwords are no longer passed as positional arguments"
description: "Start9 has released start-cli 2.6.0, in which the commands for mounting a backup, obtaining backup information, restoring a package and adding/editing a CIFS target read the password from a hidden prompt instead of a positional argument; automation must switch to the BACKUP_PASSWORD and CIFS_PASSWORD variables, while PASSWORD remains a separate credential for CLI authentication. In the same release, package installation and OS update operations on StartOS 0.4.1 and later require an enabled trusted signer by default, while the new --trust flag allows this to be overridden while retaining mandatory signature and integrity checks; the auth session kill command now accepts --pubkey and --token instead of positional session identifiers."
pubDate: "2026-10-30T23:10:19.904Z"
statusTags: ["patch_available"]
audience: ["node_operators"]
product: "start-cli"
vendor: "Start9 / StartOS"
action: "If you manage a StartOS node through start-cli and pass backup or CIFS passwords in command arguments, update to 2.6.0 and migrate scripts to BACKUP_PASSWORD and CIFS_PASSWORD; change any password that may have remained in command history or the process list. Also update auth session kill calls to use --pubkey/--token. If you use --trust to bypass signer trust, note that signature and integrity checks remain mandatory. Those who do not use start-cli require no action."
hijacked: false
incidentKey: "start-cli|fp:d57f697b25280d2e"
enPublishedAt: "2026-11-01T06:51:04.634Z"
links: [{"label":"github.com","url":"https://github.com/Start9Labs/start-technologies/releases/tag/start-cli/v2.6.0"}]
---
