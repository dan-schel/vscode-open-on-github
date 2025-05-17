import * as vscode from "vscode";
import { getSelection } from "../utils/get-selection";
import { getRepo } from "../utils/get-repo";
import {
  repoQueryErrorMessages,
  reportFailure,
  selectionQueryErrorMessages,
} from "../utils/report-failure";

export async function copyGitHubPermalink() {
  const selectionQuery = getSelection();

  if ("error" in selectionQuery) {
    const errorMessage = selectionQueryErrorMessages[selectionQuery.error];
    reportFailure("copy permalink", errorMessage);
    return;
  }

  const repoQuery = await getRepo(selectionQuery.selection.uri);

  if ("error" in repoQuery) {
    const errorMessage = repoQueryErrorMessages[repoQuery.error];
    reportFailure("copy permalink", errorMessage);
    return;
  }

  console.log(selectionQuery.selection, repoQuery.repo);

  vscode.window.showInformationMessage("Copied URL to clipboard.");
}
