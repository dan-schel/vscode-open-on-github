import * as vscode from "vscode";
import { buildFailReporter } from "../utils/report-failure";
import { explorerCopyGitHubPermalinkId } from "./ids";
import { getWebUrlFromSelection } from "../utils/get-web-url-from-selection";

export async function explorerCopyGitHubPermalink() {
  const { fail } = buildFailReporter(explorerCopyGitHubPermalinkId);
  fail("unknown");
}
