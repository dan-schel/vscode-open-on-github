import * as vscode from "vscode";
import { Action } from "../action/action";
import { Context, ContextError } from "../context/context";
import { LinkType, LinkTypeError } from "../link-type/link-type";
import { CopyAction } from "../action/copy-action";
import { OpenAction } from "../action/open-action";
import { PermalinkLinkType } from "../link-type/permalink-link-type";
import { RepoFetchError } from "./fetch-repo-details";
import { BuildUrlError } from "./build-url";

type ErrorType =
  | ContextError
  | LinkTypeError
  | RepoFetchError
  | BuildUrlError
  | "unknown";

type ErrorResult = {
  error: ErrorType;
};

type ErrorContext = {
  action: Action;
  context: Context;
  linkType: LinkType;
};

const messages: Record<ErrorType, string> = {
  // ContextError
  "no-editor": "No editor open",
  "explorer-nothing-selected": "No file/folder selected in explorer",

  // LinkTypeError
  "unknown-current-commit": "Unable to determine the current commit hash",
  "unknown-current-branch": "Unable to determine the current branch name",
  "unknown-default-branch": "No master/main branch found",

  // RepoFetchError
  "no-git": "Git extension not available",
  "no-repo": "No Git repo found",
  "multiple-repos": "Git repo is ambiguous (multiple repos found)",
  "no-remote": "Current Git repo is not published",
  "multiple-remotes": "Current Git repo is published to multiple remotes",
  "no-url": "Current Git repo has a remote, but no URL",
  "multiple-urls":
    "Current Git repo's remote URL is ambiguous (multiple URLs found)",

  // BuildUrlError
  "unknown-scheme":
    "Current Git repo's remote URL scheme is not supported (expecting HTTP or SSH)",
  "not-github": "Current Git repo is published remotely, but not on GitHub",
  "uri-outside-repo":
    "Current Git repo doesn't contain the selected file/folder",

  unknown: "Something went wrong",
};

export function fail(result: ErrorResult, errCtx: ErrorContext): void {
  const failure = determineFailure(errCtx);
  const message = messages[result.error];
  vscode.window.showErrorMessage(`${failure}: ${message}`);
}

function determineFailure(errCtx: ErrorContext) {
  if (errCtx.action instanceof CopyAction) {
    const isPermalink = errCtx.linkType instanceof PermalinkLinkType;
    return `Failed to copy ${isPermalink ? "permalink" : "link"}`;
  } else if (errCtx.action instanceof OpenAction) {
    return "Failed to open on GitHub";
  } else {
    return "Command failed";
  }
}
