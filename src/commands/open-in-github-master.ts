import * as vscode from "vscode";
import { getSelection } from "../utils/get-selection";
import { getWebUrl } from "../utils/get-web-url";
import { buildFailReporter } from "../utils/report-failure";
import { openInGitHubMasterId } from "./ids";

export async function openInGitHubMaster() {
  const { fail } = buildFailReporter(openInGitHubMasterId);

  const selectionQuery = getSelection();
  if ("error" in selectionQuery) return fail(selectionQuery.error);
  const { uri, startLine, endLine } = selectionQuery.selection;

  const lines = { start: startLine, end: endLine };
  const getWebUrlQuery = await getWebUrl("default-branch", uri, lines);
  if ("error" in getWebUrlQuery) return fail(getWebUrlQuery.error);
  const { webUrl } = getWebUrlQuery;

  await vscode.env.openExternal(vscode.Uri.parse(webUrl));
}
