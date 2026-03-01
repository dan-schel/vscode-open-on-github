import * as vscode from "vscode";
import { extensionDisplayName } from "../extension";

export class DebugOutput {
  private static _instance: DebugOutput | null = null;
  private outputLog: vscode.OutputChannel;

  private constructor() {
    this.outputLog = vscode.window.createOutputChannel(extensionDisplayName);
  }

  log(value: string) {
    this.outputLog.appendLine(value);
  }

  public static get instance(): DebugOutput {
    if (!this._instance) {
      this._instance = new DebugOutput();
    }
    return this._instance;
  }

  static log(value: string) {
    DebugOutput.instance.log(value);
  }
}
