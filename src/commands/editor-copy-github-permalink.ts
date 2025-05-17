import * as vscode from "vscode";
import { buildFailReporter } from "../utils/report-failure";
import { editorCopyGitHubPermalinkId } from "./ids";
import { getWebUrlFromSelection } from "../utils/get-web-url-from-selection";

export async function editorCopyGitHubPermalink() {
  const { fail } = buildFailReporter(editorCopyGitHubPermalinkId);

  try {
    const getWebUrlQuery = await getWebUrlFromSelection("permalink");
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
  } catch {
    fail("unknown");
  }
}
