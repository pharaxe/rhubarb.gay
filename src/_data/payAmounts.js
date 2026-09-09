// Pre-built dollar amounts so /pay/<n>/ resolves to a real, server-rendered page.
// Decimals or amounts above this range fall back to /pay/?amount=<n> (handled client-side).
export default function () {
  const amounts = [];
  for (let i = 1; i <= 1000; i++) amounts.push(i);
  return amounts;
}
