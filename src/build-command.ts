import * as vscode from "vscode";
import { CopyAction } from "./action/copy-action";
import { OpenAction } from "./action/open-action";
import { EditorContext } from "./context/editor-context";
import { ExplorerContext } from "./context/explorer-context";
import { CurrentBranchLinkType } from "./link-type/current-branch-link-type";
import { CurrentCommitLinkType } from "./link-type/current-commit-link-type";
import { DefaultBranchLinkType } from "./link-type/default-branch-link-type";
import { executeCommand } from "./execute-command";

const actions = {
  copy: CopyAction.instance,
  open: OpenAction.instance,
};

const contexts = {
  editor: EditorContext.instance,
  explorer: ExplorerContext.instance,
};

const linkTypes = {
  "current-branch": CurrentBranchLinkType.instance,
  "current-commit": CurrentCommitLinkType.instance,
  "default-branch": DefaultBranchLinkType.instance,
};

export function buildCommand(
  ctx: vscode.ExtensionContext,
  id: string,
  action: keyof typeof actions,
  context: keyof typeof contexts,
  linkType: keyof typeof linkTypes
) {
  ctx.subscriptions.push(
    vscode.commands.registerCommand(id, () =>
      executeCommand(actions[action], contexts[context], linkTypes[linkType])
    )
  );
}
