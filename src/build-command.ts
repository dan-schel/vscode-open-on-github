import * as vscode from "vscode";
import { CopyAction } from "./action/copy-action";
import { OpenAction } from "./action/open-action";
import { EditorContext } from "./context/editor-context";
import { ExplorerContext } from "./context/explorer-context";
import { DefaultLinkType } from "./link-type/default-link-type";
import { PermalinkLinkType } from "./link-type/permalink-link-type";
import { MasterLinkType } from "./link-type/master-link-type";
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
  default: DefaultLinkType.instance,
  permalink: PermalinkLinkType.instance,
  master: MasterLinkType.instance,
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
