import {
  AUDIENCE_IDS,
  AUDIENCE_LABELS,
  normalizeAudience,
  type AudienceId,
} from './audience.ts';

/**
 * URL state is the shareable source of truth for the audience filter.
 *
 * ⚠️ There is no audience dictionary here. Stored post values and query values both
 * go through `normalizeAudience` (`src/audience.ts`). A second parser would let the
 * site disagree with itself about what `держатели` means, and a badge link would
 * stop selecting the posts that carry that badge.
 */
export const AUDIENCE_QUERY_KEY = 'audience';
export const FEED_PATH = '/feed';

/** An empty draft cannot be confirmed; the applied selection stays untouched. */
export const EMPTY_DRAFT_MESSAGE = 'Выберите хотя бы одну аудиторию';
export const APPLY_LABEL = 'Выбрать';
export const SELECT_ALL_LABEL = 'Все';
export const FILTER_ACCESSIBLE_NAME = 'Фильтр по аудитории';
export const ALL_AUDIENCES_LABEL = 'Все аудитории';
export const RESET_LABEL = 'Показать все публикации';
export const EMPTY_RESULT_MESSAGE = 'Для выбранных аудиторий публикаций нет.';
/** An unknown filter must look like an error, not like a successfully filtered feed. */
export const INVALID_QUERY_MESSAGE =
  'Фильтр из адреса не распознан и не применён: показаны все публикации.';
export const NO_JS_MESSAGE =
  'Без JavaScript фильтр по аудитории не работает: показан полный список публикаций.';
/** Historical classification is incomplete; it is not a map of real exposure. */
export const HISTORY_LIMITATION_MESSAGE =
  'Старые публикации помечались одной широкой категорией, и задним числом их не переразмечали: ' +
  'фильтр показывает проставленные аудитории, а не полный охват затронутых.';

export interface AudienceQuery {
  /** Canonical order without duplicates; an empty list is the unfiltered feed. */
  selected: AudienceId[];
  /** The URL held an unrecognized value: show the invalid state with a reset. */
  invalid: boolean;
  /** Canonical search string (`''` for the unfiltered feed). */
  search: string;
}

export type SelectAllState = 'none' | 'partial' | 'all';

export const AUDIENCE_OPTIONS = AUDIENCE_IDS.map((id) => ({
  id,
  label: AUDIENCE_LABELS[id],
  href: `${FEED_PATH}?${AUDIENCE_QUERY_KEY}=${id}`,
}));

const ordered = (values: Iterable<AudienceId>): AudienceId[] => {
  const set = new Set(values);
  return AUDIENCE_IDS.filter((id) => set.has(id));
};

/**
 * Selecting all four audiences is the unfiltered feed.
 *
 * ⚠️ Collapsed here rather than in the markup: otherwise a URL listing all four IDs
 * would stay a "filter" that legacy posts with a broad `all` fall out of, and the
 * complete list would quietly stop being complete.
 */
export function canonicalSelection(values: readonly AudienceId[]): AudienceId[] {
  const list = ordered(values);
  return list.length === AUDIENCE_IDS.length ? [] : list;
}

export function serializeAudienceQuery(values: readonly AudienceId[]): string {
  const selected = canonicalSelection(values);
  if (selected.length === 0) return '';
  return `?${new URLSearchParams(selected.map((id) => [AUDIENCE_QUERY_KEY, id])).toString()}`;
}

export function audienceHref(id: AudienceId): string {
  return `${FEED_PATH}${serializeAudienceQuery([id])}`;
}

/**
 * Read the shared URL state.
 *
 * ⚠️ ANY unrecognized value invalidates the whole query instead of being dropped.
 * `?audience=holders&audience=bogus` with `bogus` silently ignored would look like a
 * successfully applied "Ходлеры" filter, and the reader would never learn that the
 * link they were sent is stale.
 */
export function parseAudienceQuery(search: string | URLSearchParams): AudienceQuery {
  const params =
    typeof search === 'string' ? new URLSearchParams(search.replace(/^\?/, '')) : search;
  const raw = params.getAll(AUDIENCE_QUERY_KEY);
  if (raw.length === 0) return { selected: [], invalid: false, search: '' };

  const ids: AudienceId[] = [];
  for (const value of raw) {
    const id = normalizeAudience(value);
    if (!id) return { selected: [], invalid: true, search: '' };
    ids.push(id);
  }
  const selected = canonicalSelection(ids);
  return { selected, invalid: false, search: serializeAudienceQuery(selected) };
}

/** The post's own canonical IDs; legacy and unknown values never appear here. */
export function postAudienceIds(values: readonly string[]): AudienceId[] {
  return ordered(
    values.map(normalizeAudience).filter((id): id is AudienceId => id !== null),
  );
}

/**
 * Match on ANY selected audience.
 *
 * ⚠️ A post is filtered by its own stored audiences: threads are not unioned and an
 * update does not borrow its root. Broad legacy (`all`), empty and unknown values get
 * no invented membership and stay visible only in the unfiltered feed.
 */
export function matchesAudience(
  values: readonly string[],
  selected: readonly AudienceId[],
): boolean {
  const active = canonicalSelection(selected);
  if (active.length === 0) return true;
  const ids = postAudienceIds(values);
  return active.some((id) => ids.includes(id));
}

/** Source order is preserved, and OR matching never lists a post twice. */
export function filterByAudience<T extends { audience: readonly string[] }>(
  items: readonly T[],
  selected: readonly AudienceId[],
): T[] {
  return items.filter((item) => matchesAudience(item.audience, selected));
}

export function triggerLabel(values: readonly AudienceId[]): string {
  const selected = canonicalSelection(values);
  if (selected.length === 0) return ALL_AUDIENCES_LABEL;
  if (selected.length === 1) return AUDIENCE_LABELS[selected[0]!];
  return `Аудитории: ${selected.length}`;
}

/** Draft edits live inside the open panel until they are confirmed. */
export function toggleDraft(
  draft: readonly AudienceId[],
  id: AudienceId,
  checked: boolean,
): AudienceId[] {
  const set = new Set(draft);
  if (checked) set.add(id);
  else set.delete(id);
  return ordered(set);
}

/** `Все` is a select-all control, not a fifth publication audience. */
export function toggleSelectAll(
  _draft: readonly AudienceId[],
  checked: boolean,
): AudienceId[] {
  return checked ? [...AUDIENCE_IDS] : [];
}

export function selectAllState(draft: readonly AudienceId[]): SelectAllState {
  const size = new Set(draft).size;
  if (size === 0) return 'none';
  return size === AUDIENCE_IDS.length ? 'all' : 'partial';
}

export function canApplyDraft(draft: readonly AudienceId[]): boolean {
  return new Set(draft).size > 0;
}
