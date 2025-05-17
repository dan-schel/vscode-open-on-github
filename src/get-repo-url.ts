import * as vscode from "vscode";
import { GitExtension } from "./types/git";

export type ErrorType =
  | "no-git"
  | "no-repo"
  | "multiple-repos"
  | "no-remote"
  | "multiple-remotes"
  | "no-url"
  | "multiple-urls";

export type Result = { url: string } | { error: ErrorType };

export function getRepoUrl(file: vscode.Uri): Result {
  const git = accessGitApi();
  if (!git) return { error: "no-git" };

  const repos = git.repositories.filter((r) =>
    file.fsPath.startsWith(r.rootUri.fsPath)
  );
  if (repos.length === 0) return { error: "no-repo" };
  if (repos.length > 1) return { error: "multiple-repos" };

  const remotes = repos[0].state.remotes;
  if (remotes.length === 0) return { error: "no-remote" };
  if (remotes.length > 1) return { error: "multiple-remotes" };

  const { fetchUrl, pushUrl } = remotes[0];
  const url = fetchUrl || pushUrl;
  if (!url) return { error: "no-url" };

  // Url will be fetchUrl if defined, so if pushUrl is also defined, is it the
  // same?
  if (!pushUrl && url !== pushUrl) return { error: "multiple-urls" };

  return { url };
}

function accessGitApi() {
  try {
    const gitExtension =
      vscode.extensions.getExtension<GitExtension>("vscode.git")?.exports;
    if (!gitExtension) return null;
    return gitExtension.getAPI(1);
  } catch {
    return null;
  }
}
