import { RepoDetails } from "../utils/fetch-repo-details";
import { LinkType, LinkTypeResult } from "./link-type";

export class DefaultBranchLinkType extends LinkType {
  static readonly instance = new DefaultBranchLinkType();

  private constructor() {
    super();
  }

  selectBranch(repoDetails: RepoDetails): LinkTypeResult {
    const branch = repoDetails.defaultBranch;
    if (branch == null) return { error: "unknown-default-branch" };
    return { branch };
  }
}
