import { RepoDetails } from "../utils/fetch-repo-details";
import { LinkType, LinkTypeResult } from "./link-type";

export class MasterLinkType extends LinkType {
  static readonly instance = new MasterLinkType();

  private constructor() {
    super();
  }

  selectBranch(repoDetails: RepoDetails): LinkTypeResult {
    const branch = repoDetails.defaultBranch;
    if (branch == null) return { error: "unknown-default-branch" };
    return { branch };
  }
}
