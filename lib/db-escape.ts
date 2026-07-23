/**
 * Escape PostgreSQL LIKE/ILIKE metacharacters (`%`, `_`, `\`) so a value used
 * as an ilike pattern matches literally. supabase-js passes the pattern RAW, so
 * without this, `_`/`%` in user- or session-derived input act as wildcards —
 * turning a lookup/ownership check into an over-broad match. Use whenever an
 * ilike pattern isn't a hardcoded `%…%` search string.
 */
export function escapeLike(value: string): string {
  return value.replace(/([\\%_])/g, "\\$1");
}
