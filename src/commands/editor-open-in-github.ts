import * as vscode from "vscode";
import { buildFailReporter } from "../utils/report-failure";
import { editorOpenInGitHubId } from "./ids";
import { getWebUrlFromSelection } from "../utils/get-web-url-from-selection";

export async function editorOpenInGitHub() {
  const { fail } = buildFailReporter(editorOpenInGitHubId);

  try {
    const getWebUrlQuery = await getWebUrlFromSelection("current-branch");
    if ("error" in getWebUrlQuery) return fail(getWebUrlQuery.error);

    const { webUrl } = getWebUrlQuery;
    await vscode.env.openExternal(vscode.Uri.parse(webUrl));
  } catch {
    fail("unknown");
  }
}
