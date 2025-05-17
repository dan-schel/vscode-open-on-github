import * as vscode from "vscode";
import { getRepo, ErrorType as RepoErrorType } from "./get-repo";
import {
  ErrorType as BuildUrlErrorType,
  buildWebUrl,
  Lines,
} from "./build-web-url";

export type ErrorType = RepoErrorType | BuildUrlErrorType;

export type Mode = "permalink" | "current-branch" | "default-branch";

export type Result = { webUrl: string } | { error: ErrorType };

export async function getWebUrl(
  mode: Mode,
  uri: vscode.Uri,
  lines: Lines | null = null
): Promise<Result> {
  const repoQuery = await getRepo(uri);
  if ("error" in repoQuery) return repoQuery;

  const { cloneUrl, rootUri, currentBranch, currentCommit, defaultBranch } =
    repoQuery.repo;

  const branch = {
    permalink: currentCommit,
    "current-branch": currentBranch,
    "default-branch": defaultBranch,
  }[mode];

  const webUrlQuery = buildWebUrl(cloneUrl, rootUri, branch, uri, lines);
  if ("error" in webUrlQuery) return webUrlQuery;

  return webUrlQuery;
}
