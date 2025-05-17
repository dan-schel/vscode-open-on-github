import { SelectedPath } from "../context/context";
import { RepoDetails } from "./fetch-repo-details";

export type BuildUrlError =
  | "unknown-scheme"
  | "not-github"
  | "uri-outside-repo";
export type BuildUrlResult = { url: string } | { error: BuildUrlError };

export function buildUrl(
  repoDetails: RepoDetails,
  branch: string,
  selectedPath: SelectedPath
): BuildUrlResult {
  const repoNameQuery = extractRepoName(repoDetails.cloneUrl);
  if ("error" in repoNameQuery) return repoNameQuery;
  const { repoName } = repoNameQuery;

  const path = normalize(selectedPath.uri.fsPath);
  const repoPath = normalize(repoDetails.rootUri.fsPath);
  if (!path.startsWith(repoPath)) return { error: "uri-outside-repo" };

  const relativePath = path.slice(repoPath.length + 1);
  const lineNumbers = createLineNumbersSuffix(selectedPath.lines);
  const url = `https://github.com/${repoName}/blob/${branch}/${relativePath}${lineNumbers}`;
  return { url };
}

function extractRepoName(
  cloneUrl: string
): { repoName: string } | { error: BuildUrlError } {
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
  lines: { start: number; end: number } | null
): string {
  if (lines == null) return "";
  if (lines.start === lines.end) return `#L${lines.start}`;
  return `#L${lines.start}-L${lines.end}`;
}

function normalize(path: string): string {
  return path.replace(/\/$/g, "");
}
