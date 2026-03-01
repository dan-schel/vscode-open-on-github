import { SelectedPath } from "../context/context";
import { DebugOutput } from "./debug-output";
import { RepoDetails } from "./fetch-repo-details";

export type BuildUrlError =
  | "unknown-scheme"
  | "not-github"
  | "uri-outside-repo";
export type BuildUrlResult = { url: string } | { error: BuildUrlError };

export function buildUrl(
  repoDetails: RepoDetails,
  branch: string,
  selectedPath: SelectedPath,
): BuildUrlResult {
  const repoNameQuery = extractRepoName(repoDetails.cloneUrl);
  if ("error" in repoNameQuery) {
    DebugOutput.log(`Strange clone URL: ${repoDetails.cloneUrl}`);
    return repoNameQuery;
  }
  const { repoName } = repoNameQuery;

  const path = normalize(selectedPath.uri.fsPath);
  const repoPath = normalize(repoDetails.rootUri.fsPath);
  if (!path.startsWith(repoPath)) {
    DebugOutput.log(`URI outside repo (repoPath: ${repoPath}, path: ${path})`);
    return { error: "uri-outside-repo" };
  }

  const relativePath = path.slice(repoPath.length + 1);
  const lineNumbers = createLineNumbersSuffix(selectedPath.lines);
  const pageType = isFolder(path) ? "tree" : "blob";

  const url = `https://github.com/${repoName}/${pageType}/${branch}/${relativePath}${lineNumbers}`;
  return { url };
}

function extractRepoName(
  cloneUrl: string,
): { repoName: string } | { error: BuildUrlError } {
  // HTTP: https://github.com/username/repo[.git]
  const httpRegex = /^https?:\/\/([^/]+)\/([^/]+)\/([^/]+?)(\.git)?$/gi;
  const http = httpRegex.exec(cloneUrl);
  if (http != null) {
    if (!http[1].endsWith("github.com")) return { error: "not-github" };
    return { repoName: `${http[2]}/${http[3]}` };
  }

  // SSH: git@github.com:username/repo[.git]
  const sshRegex = /^([^@]+)@([^:]+):([^/]+)\/([^/]+?)(\.git)?$/gi;
  const ssh = sshRegex.exec(cloneUrl);
  if (ssh != null) {
    if (!ssh[2].endsWith("github.com")) return { error: "not-github" };
    return { repoName: `${ssh[3]}/${ssh[4]}` };
  }

  return { error: "unknown-scheme" };
}

function createLineNumbersSuffix(
  lines: { start: number; end: number } | null,
): string {
  if (lines == null) return "";
  if (lines.start === lines.end) return `#L${lines.start}`;
  return `#L${lines.start}-L${lines.end}`;
}

function normalize(path: string): string {
  return path.replace(/\\/g, "/").replace(/\/$/g, "");
}

function isFolder(path: string): boolean {
  return path.split("/").at(-1)?.includes(".") === false;
}
