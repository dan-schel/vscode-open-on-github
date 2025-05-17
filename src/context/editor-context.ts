import * as vscode from "vscode";
import { Context, ContextResult } from "./context";

export class EditorContext extends Context {
  static readonly instance = new EditorContext();

  private constructor() {
    super();
  }

  async getSelectedPath(args: any[]): Promise<ContextResult> {
    const editor = vscode.window.activeTextEditor;
    if (editor == null) return { error: "no-editor" };

    return {
      selectedPath: {
        uri: editor.document.uri,
        lines: {
          start: editor.selection.start.line + 1,
          end: editor.selection.end.line + 1,
        },
      },
    };
  }
}
