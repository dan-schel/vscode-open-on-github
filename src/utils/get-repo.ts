import * as vscode from "vscode";
import { GitExtension, Ref } from "../types/git";

export type Repo = {
  cloneUrl: string;
  rootUri: vscode.Uri;
  currentBranch: string;
  defaultBranch: string;
};

export type ErrorType =
  | "no-git"
  | "no-repo"
  | "multiple-repos"
  | "no-remote"
  | "multiple-remotes"
  | "no-url"
  | "multiple-urls"
  | "unknown-current-branch"
  | "unknown-default-branch";

export type Result = { repo: Repo } | { error: ErrorType };

export async function getRepo(file: vscode.Uri): Promise<Result> {
  const git = accessGitApi();
  if (!git) return { error: "no-git" };

  const repos = git.repositories.filter((r) =>
    file.fsPath.startsWith(r.rootUri.fsPath)
  );
  if (repos.length === 0) return { error: "no-repo" };
  if (repos.length > 1) return { error: "multiple-repos" };

  const repo = repos[0];
  const rootUri = repo.rootUri;

  const currentBranch = repo.state.HEAD?.name || repo.state.HEAD?.commit;
  if (!currentBranch) return { error: "unknown-current-branch" };

  const branches = await repo.getBranches({ remote: false });
  const defaultBranch = determineDefaultBranch(branches);
  if (!defaultBranch) return { error: "unknown-default-branch" };

  const remotes = repo.state.remotes;
  if (remotes.length === 0) return { error: "no-remote" };
  if (remotes.length > 1) return { error: "multiple-remotes" };

  const { fetchUrl, pushUrl } = remotes[0];
  const cloneUrl = fetchUrl || pushUrl;
  if (!cloneUrl) return { error: "no-url" };

  // cloneUrl will be fetchUrl if defined, so if pushUrl is also defined, check
  // that it's the same.
  if (pushUrl && cloneUrl !== pushUrl) return { error: "multiple-urls" };

  return { repo: { cloneUrl, rootUri, currentBranch, defaultBranch } };
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

function determineDefaultBranch(branches: Ref[]): string | null {
  const defaultBranches = ["master", "main"];
  for (const { name } of branches) {
    if (!name) continue;
    if (defaultBranches.includes(name)) return name;
  }
  return null;
}
