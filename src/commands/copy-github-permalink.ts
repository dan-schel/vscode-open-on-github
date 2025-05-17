import * as vscode from "vscode";
import { getSelection } from "../utils/get-selection";
import { getWebUrl } from "../utils/get-web-url";
import { buildFailReporter } from "../utils/report-failure";
import { copyGitHubPermalinkId } from "./ids";

export async function copyGitHubPermalink() {
  const { fail } = buildFailReporter(copyGitHubPermalinkId);

  const selectionQuery = getSelection();
  if ("error" in selectionQuery) return fail(selectionQuery.error);
  const { uri, startLine, endLine } = selectionQuery.selection;

  const lines = { start: startLine, end: endLine };
  const getWebUrlQuery = await getWebUrl("permalink", uri, lines);
  if ("error" in getWebUrlQuery) return fail(getWebUrlQuery.error);
  const { webUrl } = getWebUrlQuery;

  await vscode.env.clipboard.writeText(webUrl);

  const response = await vscode.window.showInformationMessage(
    "Copied link to clipboard.",
    "Open in browser"
  );

  if (response === "Open in browser") {
    await vscode.env.openExternal(vscode.Uri.parse(webUrl));
  }
}
