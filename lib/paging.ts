// "?page=3" → 3. Anything missing or invalid → page 1.
export const parsePage = (value: string | string[] | undefined): number => {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
};