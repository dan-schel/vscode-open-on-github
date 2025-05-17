import * as vscode from "vscode";
import { buildFailReporter } from "../utils/report-failure";
import { editorOpenInGitHubMasterId } from "./ids";
import { getWebUrlFromSelection } from "../utils/get-web-url-from-selection";

export async function editorOpenInGitHubMaster() {
  const { fail } = buildFailReporter(editorOpenInGitHubMasterId);

  try {
    const getWebUrlQuery = await getWebUrlFromSelection("default-branch");
    if ("error" in getWebUrlQuery) return fail(getWebUrlQuery.error);

    const { webUrl } = getWebUrlQuery;
    await vscode.env.openExternal(vscode.Uri.parse(webUrl));
  } catch {
    fail("unknown");
  }
}
