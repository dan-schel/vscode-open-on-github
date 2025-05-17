export type ErrorType = "unknown-scheme" | "not-github";

export type Result = { webUrl: string } | { error: ErrorType };

export function buildWebUrl() {}
