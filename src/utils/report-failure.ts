import * as vscode from "vscode";
import { ErrorType as SelectionErrorType } from "./get-selection";
import { ErrorType as RepoErrorType } from "./get-repo";
import { ErrorType as BuildUrlErrorType } from "./build-web-url";

export const selectionQueryErrorMessages: Record<SelectionErrorType, string> = {
  "no-editor": "No editor open",
};

export const repoQueryErrorMessages: Record<RepoErrorType, string> = {
  "no-git": "Git extension not available",
  "no-repo": "No Git repo found",
  "multiple-repos": "Git repo is ambiguous (multiple repos found)",
  "no-remote": "Current Git repo is not published",
  "multiple-remotes": "Current Git repo is published to multiple remotes",
  "no-url": "Current Git repo has a remote, but no URL",
  "multiple-urls":
    "Current Git repo's remote URL is ambiguous (multiple URLs found)",
  "unknown-current-branch": "Unable to determine the current branch name",
  "unknown-current-commit": "Unable to determine the current commit hash",
  "unknown-default-branch": "No master/main branch found",
};

export const webUrlQueryErrorMessages: Record<BuildUrlErrorType, string> = {
  "unknown-scheme":
    "Current Git repo's remote URL scheme is not supported (expecting HTTP or SSH)",
  "not-github": "Current Git repo is published remotely, but not on GitHub",
  "uri-outside-repo":
    "Current Git repo doesn't contain the selected file/folder",
};

export function reportFailure(action: string, message: string) {
  vscode.window.showErrorMessage(`Failed to ${action}: ${message}`);
}
