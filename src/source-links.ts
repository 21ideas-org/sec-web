export interface SourceLink {
  label: string;
  url: string;
}

interface XStatusLink extends SourceLink {
  statusId: string;
}

function xStatusLink(link: SourceLink): XStatusLink | null {
  let parsed: URL;
  try {
    parsed = new URL(link.url);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
  if (parsed.username || parsed.password || parsed.port) return null;
  if (parsed.hostname !== 'x.com' && parsed.hostname !== 'twitter.com') return null;

  const match = parsed.pathname.match(/^\/([A-Za-z0-9_]+)\/status\/([0-9]+)$/);
  if (!match) return null;
  const [, handle, statusId] = match;
  return {
    label: `x.com - ${handle}`,
    url: `https://x.com/${handle}/status/${statusId}`,
    statusId,
  };
}

/** Build-only presentation projection; stored source links remain immutable. */
export function displaySourceLinks(links: readonly SourceLink[]): SourceLink[] {
  const seenStatusIds = new Set<string>();
  const display: SourceLink[] = [];

  for (const link of links) {
    const xStatus = xStatusLink(link);
    if (!xStatus) {
      display.push({ label: link.label, url: link.url });
      continue;
    }
    if (seenStatusIds.has(xStatus.statusId)) continue;
    seenStatusIds.add(xStatus.statusId);
    display.push({ label: xStatus.label, url: xStatus.url });
  }

  return display;
}
