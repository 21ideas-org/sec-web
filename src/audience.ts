export const AUDIENCE_IDS = [
  'holders',
  'node_operators',
  'developers',
  'merchant_infra',
] as const;

export type AudienceId = (typeof AUDIENCE_IDS)[number];

export interface AudienceDisplay {
  /** Null means legacy/unrecognized input, never a canonical classification. */
  id: AudienceId | null;
  label: string;
}

const LABELS: Record<AudienceId, string> = {
  holders: 'Ходлеры',
  node_operators: 'Операторы нод',
  developers: 'Разработчики',
  merchant_infra: 'Мерчанты',
};

const ALIASES = new Map<string, AudienceId>([
  ['holders', 'holders'],
  ['держатели', 'holders'],
  ['ходлеры', 'holders'],
  ['node_operators', 'node_operators'],
  ['операторы нод', 'node_operators'],
  ['developers', 'developers'],
  ['разработчики', 'developers'],
  ['merchant_infra', 'merchant_infra'],
  ['мерчанты-инфра', 'merchant_infra'],
  ['мерчанты', 'merchant_infra'],
]);

const BROAD = new Set(['all', 'все', 'всем']);
const BROAD_LABEL = 'Все — старая категория';

/**
 * Website reader boundary for canonical IDs and explicit historical aliases.
 * Unknown values remain literal; callers must render the returned strings escaped.
 */
export function displayAudience(values: readonly string[]): AudienceDisplay[] {
  const known = new Set<AudienceId>();
  const neutral: AudienceDisplay[] = [];
  const neutralLabels = new Set<string>();

  for (const value of values) {
    const id = ALIASES.get(value);
    if (id) {
      known.add(id);
      continue;
    }

    const label = BROAD.has(value) ? BROAD_LABEL : value;
    if (!neutralLabels.has(label)) {
      neutral.push({ id: null, label });
      neutralLabels.add(label);
    }
  }

  return [
    ...AUDIENCE_IDS.filter((id) => known.has(id)).map((id) => ({ id, label: LABELS[id] })),
    ...neutral,
  ];
}
