import * as vscode from "vscode";
import { Action } from "./action";

export class CopyAction extends Action {
  static readonly instance = new CopyAction();

  private constructor() {
    super();
  }

  async perform(url: string): Promise<void> {
    await vscode.env.clipboard.writeText(url);

    const response = await vscode.window.showInformationMessage(
      "Copied link to clipboard.",
      "Open in browser"
    );

    if (response === "Open in browser") {
      await vscode.env.openExternal(vscode.Uri.parse(url));
    }
  }
}
