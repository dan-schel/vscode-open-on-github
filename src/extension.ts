import * as vscode from "vscode";
import { buildCommand } from "./build-command";

// Note: If updating here, you also need to update in package.json.
export const extensionId = "open-on-github";
export const editorPermalink = `${extensionId}.editor.permalink`;
export const editorDefault = `${extensionId}.editor.default`;
export const editorMaster = `${extensionId}.editor.master`;
export const explorerPermalink = `${extensionId}.explorer.permalink`;
export const explorerDefault = `${extensionId}.explorer.default`;
export const explorerMaster = `${extensionId}.explorer.master`;

export function activate(ctx: vscode.ExtensionContext) {
  buildCommand(ctx, editorPermalink, "copy", "editor", "permalink");
  buildCommand(ctx, editorDefault, "open", "editor", "default");
  buildCommand(ctx, editorMaster, "open", "editor", "master");
  buildCommand(ctx, explorerPermalink, "copy", "explorer", "permalink");
  buildCommand(ctx, explorerDefault, "open", "explorer", "default");
  buildCommand(ctx, explorerMaster, "open", "explorer", "master");
}
