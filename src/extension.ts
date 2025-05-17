import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension running!");

  const disposable = vscode.commands.registerCommand(
    "open-in-github.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello VS Code!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
