import * as vscode from "vscode";

export type ErrorType = "unknown-scheme" | "not-github" | "uri-outside-repo";

export type Result = { webUrl: string } | { error: ErrorType };

export function buildWebUrl(
  repoCloneUrl: string,
  repoUri: vscode.Uri,
  branch: string,
  uri: vscode.Uri,
  lines?: { start: number; end: number }
): Result {
  const repoNameQuery = extractRepoName(repoCloneUrl);
  if ("error" in repoNameQuery) return { error: repoNameQuery.error };
  const { repoName } = repoNameQuery;

  const path = normalize(uri.fsPath);
  const repoPath = normalize(repoUri.fsPath);
  if (!path.startsWith(repoPath)) return { error: "uri-outside-repo" };

  const relativePath = path.slice(repoPath.length + 1);
  const lineNumbers = createLineNumbersSuffix(lines);
  const webUrl = `https://github.com/${repoName}/blob/${branch}/${relativePath}${lineNumbers}`;
  return { webUrl };
}

function extractRepoName(
  cloneUrl: string
): { repoName: string } | { error: ErrorType } {
  // HTTP: https://github.com/username/repo.git
  const http = /^https?:\/\/([^/]+)\/([^/]+)\/([^/]+)\.git$/gi.exec(cloneUrl);
  if (http != null) {
    if (!http[1].endsWith("github.com")) return { error: "not-github" };
    return { repoName: `${http[2]}/${http[3]}` };
  }

  // SSH: git@github.com:username/repo.git
  const ssh = /^([^@]+)@([^:]+):([^/]+)\/([^/]+)\.git$/gi.exec(cloneUrl);
  if (ssh != null) {
    if (!ssh[2].endsWith("github.com")) return { error: "not-github" };
    return { repoName: `${ssh[3]}/${ssh[4]}` };
  }

  return { error: "unknown-scheme" };
}

function createLineNumbersSuffix(
  lines: { start: number; end: number } | undefined
): string {
  if (lines == null) return "";
  if (lines.start === lines.end) return `#L${lines.start}`;
  return `#L${lines.start}-L${lines.end}`;
}

function normalize(path: string): string {
  return path.replace(/\/$/g, "");
}
