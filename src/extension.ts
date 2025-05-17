import * as vscode from "vscode";
import { copyGitHubPermalink } from "./commands/copy-github-permalink";
import { openInGitHub } from "./commands/open-in-github";
import { openInGitHubMaster } from "./commands/open-in-github-master";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "open-in-github.copyGitHubPermalink",
      copyGitHubPermalink
    ),
    vscode.commands.registerCommand(
      "open-in-github.openInGitHub",
      openInGitHub
    ),
    vscode.commands.registerCommand(
      "open-in-github.openInGitHubMaster",
      openInGitHubMaster
    )
  );
}
