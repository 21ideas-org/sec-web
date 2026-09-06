---
title: "Docker-образы Core Lightning не содержали заявленного фикса — StartOS переходит на сборку из подписанных tarball"
description: "Вендор сообщает, что Docker-образы релиза, вышедшие 28 августа, фактически не включали объявленные исправления безопасности — об этом стало известно только сейчас, тихой правкой страницы релиза, без отдельного анонса. Это значит, что операторы, обновившиеся через Docker (в том числе через BTCPay Server), всё это время оставались…"
pubDate: 2026-09-01T15:00:43.093Z
urgency: ["#патч_частичный"]
audience: ["операторы нод"]
product: "Core Lightning"
vendor: "Start9 / StartOS"
action: "Операторам, развернувшим Core Lightning через Docker, срочно обновиться до версии 26.6.7:2, собранной из подписанных tarball, а не полагаться на прежний Docker-образ."
exploitationStatus: "unknown"
fixStatus: "partial"
updateSufficiency: "sufficient"
actionTiming: "now"
hijacked: false
incidentKey: "core lightning|fp:6a454705c103c7fd"
parent: "start9-2026-08-26-cln-update"
links:
  - label: "x.com"
    url: "https://x.com/start9labs/status/2094801551722533262"
  - label: "twitter.com"
    url: "https://twitter.com/Core_LN/status/2093376708451635607"
---
