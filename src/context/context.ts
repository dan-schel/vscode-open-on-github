import * as vscode from "vscode";

export type SelectedPath = {
  uri: vscode.Uri;
  lines: { start: number; end: number } | null;
};
export type ContextError = "no-editor" | "explorer-nothing-selected";
export type ContextResult =
  | { selectedPath: SelectedPath }
  | { error: ContextError };

export abstract class Context {
  abstract getSelectedPath(args: any[]): Promise<ContextResult>;
}
