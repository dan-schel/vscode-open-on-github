import * as vscode from "vscode";
import { GitExtension, Ref, Repository } from "./git";

export type RepoDetails = {
  cloneUrl: string;
  rootUri: vscode.Uri;
  currentCommit: string | null;
  currentBranch: string | null;
  defaultBranch: string | null;
};

export type RepoFetchError =
  | "no-git"
  | "no-repo"
  | "multiple-repos"
  | "no-remote"
  | "multiple-remotes"
  | "no-url"
  | "multiple-urls";

export type RepoFetchResult =
  | { repoDetails: RepoDetails }
  | { error: RepoFetchError };

export async function fetchRepoDetails(
  uri: vscode.Uri
): Promise<RepoFetchResult> {
  const git = accessGitApi();
  if (git == null) return { error: "no-git" };

  // Fetch the list of repos, and assert that there's exactly 1.
  const repos = git.repositories.filter((r) =>
    uri.fsPath.startsWith(r.rootUri.fsPath)
  );
  if (repos.length === 0) return { error: "no-repo" };
  if (repos.length > 1) return { error: "multiple-repos" };

  // Fetch the list of remotes for this repo, and assert that there's exactly 1.
  const repo = repos[0];
  const remotes = repo.state.remotes;
  if (remotes.length === 0) return { error: "no-remote" };
  if (remotes.length > 1) return { error: "multiple-remotes" };

  // Fetch the URLs associated to the remote, and assert that there's exactly 1.
  const { fetchUrl, pushUrl } = remotes[0];
  if (fetchUrl != null && pushUrl != null && fetchUrl !== pushUrl) {
    return { error: "multiple-urls" };
  }
  const cloneUrl = fetchUrl || pushUrl;
  if (cloneUrl == null) return { error: "no-url" };

  return {
    repoDetails: {
      cloneUrl,
      rootUri: repo.rootUri,
      currentCommit: repo.state.HEAD?.commit ?? null,
      currentBranch: repo.state.HEAD?.name ?? repo.state.HEAD?.commit ?? null,
      defaultBranch: await determineDefaultBranch(repo),
    },
  };
}

function accessGitApi() {
  try {
    const gitExtension =
      vscode.extensions.getExtension<GitExtension>("vscode.git")?.exports;
    if (gitExtension == null) return null;
    return gitExtension.getAPI(1);
  } catch {
    return null;
  }
}

async function determineDefaultBranch(
  repo: Repository
): Promise<string | null> {
  const branches = await repo.getBranches({ remote: false });
  const defaultBranches = ["master", "main"];

  for (const { name } of branches) {
    if (name == null) continue;
    if (defaultBranches.includes(name)) return name;
  }
  return null;
}
