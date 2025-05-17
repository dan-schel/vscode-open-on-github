import { RepoDetails } from "../utils/fetch-repo-details";

export type LinkTypeError =
  | "unknown-current-commit"
  | "unknown-current-branch"
  | "unknown-default-branch";
export type LinkTypeResult = { branch: string } | { error: LinkTypeError };

export abstract class LinkType {
  abstract selectBranch(repoDetails: RepoDetails): LinkTypeResult;
}
