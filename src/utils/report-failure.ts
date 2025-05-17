import * as vscode from "vscode";
import { ErrorType as SelectionErrorType } from "./get-selection";
import { ErrorType as RepoErrorType } from "./get-repo";

export const selectionQueryErrorMessages: Record<SelectionErrorType, string> = {
  "no-editor": "No editor open",
};

export const repoQueryErrorMessages: Record<RepoErrorType, string> = {
  "no-git": "Git extension not available",
  "no-repo": "No Git repository found",
  "multiple-repos": "Git repository is ambiguous (multiple repos found)",
  "no-remote": "Current Git repository is not published",
  "multiple-remotes": "Current Git repository is published to multiple remotes",
  "no-url": "Current Git repository has a remote, but no URL",
  "multiple-urls":
    "Current Git repository's remote URL is ambiguous (multiple URLs found)",
  "unknown-current-branch": "Unable to determine the current branch name",
  "unknown-default-branch": "No master/main branch found",
};

export function reportFailure(action: string, message: string) {
  vscode.window.showErrorMessage(`Failed to ${action}: ${message}`);
}
