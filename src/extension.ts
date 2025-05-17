import * as vscode from "vscode";
import { copyGitHubPermalink } from "./commands/copy-github-permalink";
import { openInGitHub } from "./commands/open-in-github";
import { openInGitHubMaster } from "./commands/open-in-github-master";
import {
  copyGitHubPermalinkId,
  openInGitHubId,
  openInGitHubMasterId,
} from "./commands/ids";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(copyGitHubPermalinkId, copyGitHubPermalink),
    vscode.commands.registerCommand(openInGitHubId, openInGitHub),
    vscode.commands.registerCommand(openInGitHubMasterId, openInGitHubMaster)
  );
}
