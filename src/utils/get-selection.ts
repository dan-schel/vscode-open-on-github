import * as vscode from "vscode";

export type Selection = {
  uri: vscode.Uri;
  file: string;
  startLine: number;
  endLine: number;
};

export type ErrorType = "no-editor";

export type Result = { selection: Selection } | { error: ErrorType };

export function getSelection(): Result {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return { error: "no-editor" };

  return {
    selection: {
      uri: editor.document.uri,
      file: editor.document.fileName,
      startLine: editor.selection.start.line + 1,
      endLine: editor.selection.end.line + 1,
    },
  };
}
