import * as vscode from "vscode";
import { getSelection } from "../utils/get-selection";
import { getRepo } from "../utils/get-repo";
import {
  repoQueryErrorMessages,
  reportFailure,
  selectionQueryErrorMessages,
  webUrlQueryErrorMessages,
} from "../utils/report-failure";
import { buildWebUrl } from "../utils/build-web-url";

export async function copyGitHubPermalink() {
  const selectionQuery = getSelection();
  if ("error" in selectionQuery) {
    const errorMessage = selectionQueryErrorMessages[selectionQuery.error];
    reportFailure("copy permalink", errorMessage);
    return;
  }
  const { uri, startLine, endLine } = selectionQuery.selection;

  const repoQuery = await getRepo(selectionQuery.selection.uri);
  if ("error" in repoQuery) {
    const errorMessage = repoQueryErrorMessages[repoQuery.error];
    reportFailure("copy permalink", errorMessage);
    return;
  }
  const { cloneUrl, rootUri, currentCommit } = repoQuery.repo;

  const lines = { start: startLine, end: endLine };
  const webUrlQuery = buildWebUrl(cloneUrl, rootUri, currentCommit, uri, lines);
  if ("error" in webUrlQuery) {
    const errorMessage = webUrlQueryErrorMessages[webUrlQuery.error];
    reportFailure("copy permalink", errorMessage);
    return;
  }
  const { webUrl } = webUrlQuery;

  await vscode.env.clipboard.writeText(webUrl);
  const response = await vscode.window.showInformationMessage(
    "Copied to clipboard.",
    "Open in browser"
  );

  if (response === "Open in browser") {
    await vscode.env.openExternal(vscode.Uri.parse(webUrl));
  }
}
