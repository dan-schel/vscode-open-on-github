import * as vscode from "vscode";
import { Action } from "./action";

export class OpenAction extends Action {
  static readonly instance = new OpenAction();

  private constructor() {
    super();
  }

  async perform(url: string): Promise<void> {
    await vscode.env.openExternal(vscode.Uri.parse(url));
  }
}
