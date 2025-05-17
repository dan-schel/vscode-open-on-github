import * as vscode from "vscode";
import { Context, ContextResult } from "./context";

export class ExplorerContext extends Context {
  static readonly instance = new ExplorerContext();

  private constructor() {
    super();
  }

  async getSelectedPath(args: any[]): Promise<ContextResult> {
    if (args.length > 0 && args[0] instanceof vscode.Uri) {
      return { selectedPath: { uri: args[0], lines: null } };
    } else {
      return { error: "explorer-nothing-selected" };
    }
  }
}
