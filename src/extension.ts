import * as vscode from "vscode";
import { editorCopyGitHubPermalink } from "./commands/editor-copy-github-permalink";
import { editorOpenInGitHub } from "./commands/editor-open-in-github";
import { editorOpenInGitHubMaster } from "./commands/editor-open-in-github-master";
import {
  editorCopyGitHubPermalinkId,
  editorOpenInGitHubId,
  editorOpenInGitHubMasterId,
  explorerCopyGitHubPermalinkId,
} from "./commands/ids";
import { explorerCopyGitHubPermalink } from "./commands/explorer-copy-github-permalink";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      editorCopyGitHubPermalinkId,
      editorCopyGitHubPermalink
    ),
    vscode.commands.registerCommand(editorOpenInGitHubId, editorOpenInGitHub),
    vscode.commands.registerCommand(
      editorOpenInGitHubMasterId,
      editorOpenInGitHubMaster
    ),
    vscode.commands.registerCommand(
      explorerCopyGitHubPermalinkId,
      explorerCopyGitHubPermalink
    )
  );
}
