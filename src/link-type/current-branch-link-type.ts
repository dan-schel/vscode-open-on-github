import { RepoDetails } from "../utils/fetch-repo-details";
import { LinkType, LinkTypeResult } from "./link-type";

export class CurrentBranchLinkType extends LinkType {
  static readonly instance = new CurrentBranchLinkType();

  private constructor() {
    super();
  }

  selectBranch(repoDetails: RepoDetails): LinkTypeResult {
    const branch = repoDetails.currentBranch;
    if (branch == null) return { error: "unknown-current-branch" };
    return { branch };
  }
}
