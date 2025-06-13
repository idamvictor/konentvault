export function formatTimestamp(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString();
}
