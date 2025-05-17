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

// Note: There's a bit of reuse here:
//
// - The command palette displays the "editor" commands.
//   It makes sense to link to the file open in the primary editor at the time.
//
// - The editor title bar context menu uses the "explorer" commands.
//   This works because the interface is the same (they both get the URI from
//   the args array passed to the command). This avoids a lot of additional code
//   and means I don't need to disable extra commands in the command palette.

export function activate(ctx: vscode.ExtensionContext) {
  buildCommand(ctx, editorPermalink, "copy", "editor", "permalink");
  buildCommand(ctx, editorDefault, "open", "editor", "default");
  buildCommand(ctx, editorMaster, "open", "editor", "master");
  buildCommand(ctx, explorerPermalink, "copy", "explorer", "permalink");
  buildCommand(ctx, explorerDefault, "open", "explorer", "default");
  buildCommand(ctx, explorerMaster, "open", "explorer", "master");
}
