import * as vscode from "vscode";
import { buildCommand } from "./build-command";

// Note: If updating here, you also need to update in package.json.
export const extensionId = "open-in-github";
export const editorPermalink = `${extensionId}.editorCopyGitHubPermalink`;
export const editorDefault = `${extensionId}.editorOpenInGitHub`;
export const editorMaster = `${extensionId}.editorOpenInGitHubMaster`;
export const explorerPermalink = `${extensionId}.explorerCopyGitHubPermalink`;

export function activate(ctx: vscode.ExtensionContext) {
  buildCommand(ctx, editorPermalink, "copy", "editor", "current-commit");
  buildCommand(ctx, editorDefault, "open", "editor", "current-branch");
  buildCommand(ctx, editorMaster, "open", "editor", "default-branch");
  buildCommand(ctx, explorerPermalink, "copy", "editor", "current-commit");
}
