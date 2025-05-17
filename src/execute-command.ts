import { Action } from "./action/action";
import { Context } from "./context/context";
import { LinkType } from "./link-type/link-type";
import { buildUrl } from "./utils/build-url";
import { fail } from "./utils/fail";
import { fetchRepoDetails } from "./utils/fetch-repo-details";

export async function executeCommand(
  action: Action,
  context: Context,
  linkType: LinkType
) {
  const errCtx = { action, context, linkType };

  try {
    const contextResult = await context.getSelectedPath();
    if ("error" in contextResult) return fail(contextResult, errCtx);
    const { selectedPath } = contextResult;

    const repoDetailsResult = await fetchRepoDetails(selectedPath.uri);
    if ("error" in repoDetailsResult) return fail(repoDetailsResult, errCtx);
    const { repoDetails } = repoDetailsResult;

    const linkTypeResult = linkType.selectBranch(repoDetails);
    if ("error" in linkTypeResult) return fail(linkTypeResult, errCtx);
    const { branch } = linkTypeResult;

    const urlResult = buildUrl(repoDetails, branch, selectedPath);
    if ("error" in urlResult) return fail(urlResult, errCtx);
    const { url } = urlResult;

    await action.perform(url);
  } catch {
    return fail({ error: "unknown" }, errCtx);
  }
}
