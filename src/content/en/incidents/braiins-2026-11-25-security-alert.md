---
"title": "ckpool developer: mining hijacking via stratum v1 interception between miners and pools"
"description": "In a post retweeted by Braiins (not a Braiins statement), the ckpool developer describes mining hijacking attacks. Stratum v1 traffic is intercepted in internet infrastructure between miners and pools, and neither the mining hardware nor the pool needs to be compromised. According to the author, clustered hashrate such as large farms and infrastructure is most at risk. Distributed, low-hashrate miners are a less likely target. The author says that if your hashrate still appears at the pool, you are not currently compromised. Stratum V2 protects against this specific attack, while encrypted stratum v1 is described only as relatively safe."
"pubDate": "2026-11-25T21:30:47.125Z"
"statusTags": []
"audience":
  - "node_operators"
"product": "stratum v1"
"vendor": "Braiins"
"action": "If you mine over stratum v1, especially with large clustered hashrate, check that your hashrate still appears at the pool. According to the author, if it does, you are not currently compromised. If your hardware supports Stratum V2, switch now. Otherwise, run a Stratum V2 proxy such as ckproxy on the local network of your miners. Minimise the number of hops between your miners and the pool. On solo ckpool, the pool address given in the post always selects the closest pool node. Do not rely on encrypted stratum v1, because some firmware does not check signatures. The strongest protection is running your own local solo mining setup, and the post links to solo ckpool installation instructions."
"hijacked": false
"unsafeInstruction": false
"incidentKey": "stratum v1|fp:3414372b8667a38a"
"enPublishedAt": "2026-11-25T21:40:16.455Z"
"links":
  - "label": "x.com - Braiins"
    "url": "https://x.com/Braiins/status/2125701593790341327"
  - "label": "bitbucket.org"
    "url": "https://bitbucket.org/ckolivas/ckpool/src/master/README-SOLOMINING.md"
---
