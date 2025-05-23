import { RepoDetails } from "../utils/fetch-repo-details";
import { LinkType, LinkTypeResult } from "./link-type";

export class PermalinkLinkType extends LinkType {
  static readonly instance = new PermalinkLinkType();

  private constructor() {
    super();
  }

  selectBranch(repoDetails: RepoDetails): LinkTypeResult {
    const branch = repoDetails.currentCommit;
    if (branch == null) return { error: "unknown-current-commit" };
    return { branch };
  }
}
