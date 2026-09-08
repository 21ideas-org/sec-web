export interface StatusPresentationInput {
  statusTags?: readonly string[];
  urgency?: readonly string[];
  exploitationStatus?: string;
  fixStatus?: string;
  updateSufficiency?: string;
  actionTiming?: string;
}

const FACTS = [
  { id: 'exploitation_confirmed', label: 'Эксплуатация подтверждена', className: 'u-crit', accent: 'var(--crit-fg)', og: '/og/critical.png' },
  { id: 'patch_unavailable', label: 'Патча нет', className: 'u-warn', accent: 'var(--warn-fg)', og: '/og/unpatched.png' },
  { id: 'patch_available', label: 'Патч есть', className: 'u-ok', accent: 'var(--ok-fg)', og: '/og/patched.png' },
] as const;

/** Presence, including [], owns all facts. Legacy precedence remains per axis. */
function recordedTags(input: StatusPresentationInput): readonly string[] {
  if (input.statusTags !== undefined) return input.statusTags;
  const legacy = input.urgency ?? [];
  const tags: string[] = [];
  if (input.exploitationStatus === undefined
    ? legacy.includes('#эксплуатируется')
    : ['active', 'observed'].includes(input.exploitationStatus)) {
    tags.push('exploitation_confirmed');
  }
  if (input.fixStatus === undefined) {
    if (legacy.includes('#патча_нет')) tags.push('patch_unavailable');
    if (legacy.includes('#патч_есть')) tags.push('patch_available');
  } else {
    if (input.fixStatus === 'unavailable') tags.push('patch_unavailable');
    if (input.fixStatus === 'available') tags.push('patch_available');
  }
  return tags;
}

/** Safe build-only diagnostic: never echo untrusted values into public output. */
export function statusDiagnostic(input: StatusPresentationInput): string | undefined {
  const tags = recordedTags(input);
  if (tags.includes('patch_available') && tags.includes('patch_unavailable')) {
    return 'Conflicting patch status tags: both patch claims omitted.';
  }
}

/** Trusted labels, deduplicated in accent priority order; unknown IDs are non-semantic. */
export function displayUrgency(input: StatusPresentationInput): string[] {
  const tags = recordedTags(input);
  const conflict = statusDiagnostic(input) !== undefined;
  return FACTS.filter(({ id }) => tags.includes(id) && (!conflict || id === 'exploitation_confirmed'))
    .map(({ label }) => label);
}

export function urgencyClass(label: string): string {
  return FACTS.find((fact) => fact.label === label)?.className ?? 'u-neutral';
}

/** Green means only a released patch, never safety or absence of exploitation. */
export function urgencyAccent(labels: readonly string[] = []): string {
  return FACTS.find((fact) => labels.includes(fact.label))?.accent ?? 'var(--dim)';
}

export function ogFor(labels: readonly string[] = []): string {
  return FACTS.find((fact) => labels.includes(fact.label))?.og ?? '/og/default.png';
}
