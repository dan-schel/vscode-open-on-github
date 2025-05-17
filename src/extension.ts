import * as vscode from "vscode";
import { ErrorType as SelectionErrorType, getSelection } from "./get-selection";
import { ErrorType as RepoErrorType, getRepoUrl } from "./get-repo-url";

const selectionQueryErrorMessages: Record<SelectionErrorType, string> = {
  "no-editor": "No editor open",
};

const repoQueryErrorMessages: Record<RepoErrorType, string> = {
  "no-git": "Git extension not available",
  "no-repo": "No Git repository found",
  "multiple-repos": "Git repository is ambiguous (multiple repos found)",
  "no-remote": "Current Git repository is not published",
  "multiple-remotes": "Current Git repository is published to multiple remotes",
  "no-url": "Current Git repository has a remote, but no URL",
  "multiple-urls":
    "Current Git repository remote URL is ambiguous (multiple URLs found)",
};

function reportFailure(action: string, message: string) {
  vscode.window.showErrorMessage(`Failed to ${action}: ${message}`);
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension running!");

  const copyGitHubPermalink = vscode.commands.registerCommand(
    "open-in-github.copyGitHubPermalink",
    () => {
      const selectionQuery = getSelection();

      if ("error" in selectionQuery) {
        const errorMessage = selectionQueryErrorMessages[selectionQuery.error];
        reportFailure("copy permalink", errorMessage);
        return;
      }

      const repoQuery = getRepoUrl(selectionQuery.selection.uri);

      if ("error" in repoQuery) {
        const errorMessage = repoQueryErrorMessages[repoQuery.error];
        reportFailure("copy permalink", errorMessage);
        return;
      }

      vscode.window.showInformationMessage(
        `file: ${selectionQuery.selection.file}, repo: ${repoQuery.url}`
      );
    }
  );

  const openInGithub = vscode.commands.registerCommand(
    "open-in-github.openInGitHub",
    () => {
      vscode.window.showInformationMessage("Hello VS Code!");
    }
  );

  const openInGitHubMaster = vscode.commands.registerCommand(
    "open-in-github.openInGitHubMaster",
    () => {
      vscode.window.showInformationMessage("Hello VS Code!");
    }
  );

  context.subscriptions.push(
    copyGitHubPermalink,
    openInGithub,
    openInGitHubMaster
  );
}

export function deactivate() {}
