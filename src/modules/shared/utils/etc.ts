export function toTitleCase(str: string | undefined) {
  if (!str) return;

  return str.replace(
    /\b\w+('\w{1})?/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}
