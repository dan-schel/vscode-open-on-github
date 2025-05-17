import * as vscode from "vscode";

export type ErrorType = "unknown-scheme" | "not-github";

export type Result = { webUrl: string } | { error: ErrorType };

export function buildWebUrl(
  repoCloneUrl: string,
  repoUri: vscode.Uri,
  branch: string,
  uri: vscode.Uri
) {
  const repoNameQuery = extractRepoName(repoCloneUrl);
  if ("error" in repoNameQuery) return { error: repoNameQuery.error };

  return `https://github.com/${repoNameQuery.repoName}/blob/${branch}/${uri}`;
}

function extractRepoName(
  cloneUrl: string
): { repoName: string } | { error: ErrorType } {
  // git@github.com:dan-schel/train-disruptions.git
  // https://github.com/dan-schel/train-disruptions.git

  const http = /^https?:\/\/([^/]+)\/([^/]+)\/([^/]+)\.git$/g.exec(cloneUrl);

  if (http != null) {
    console.log(http);
  }

  return { error: "unknown-scheme" };
}
