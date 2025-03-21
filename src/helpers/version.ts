export function getCurrentVersionInNumber(): number {
  return +String(getCurrentVersion()).substring(0, 3);
}
export function getCurrentVersion(): string {
  return process.env.version || "0.1.0v";
}
