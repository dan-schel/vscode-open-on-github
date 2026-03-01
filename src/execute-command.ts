import { Action } from "./action/action";
import { Context } from "./context/context";
import { LinkType } from "./link-type/link-type";
import { buildUrl } from "./utils/build-url";
import { DebugOutput } from "./utils/debug-output";
import { fail } from "./utils/fail";
import { fetchRepoDetails } from "./utils/fetch-repo-details";

export async function executeCommand(
  action: Action,
  context: Context,
  linkType: LinkType,
  args: any[],
) {
  const errCtx = { action, context, linkType };
  DebugOutput.log("");
  DebugOutput.log("---");
  DebugOutput.log("");
  DebugOutput.log(`Executing command: ${JSON.stringify(errCtx, null, 2)}`);

  try {
    const contextResult = await context.getSelectedPath(args);
    if ("error" in contextResult) return fail(contextResult, errCtx);
    const { selectedPath } = contextResult;

    const repoDetailsResult = await fetchRepoDetails(selectedPath.uri);
    if ("error" in repoDetailsResult) return fail(repoDetailsResult, errCtx);
    const { repoDetails } = repoDetailsResult;

    DebugOutput.log(`Repo details: ${JSON.stringify(repoDetails, null, 2)}`);

    const linkTypeResult = linkType.selectBranch(repoDetails);
    if ("error" in linkTypeResult) return fail(linkTypeResult, errCtx);
    const { branch } = linkTypeResult;

    const urlResult = buildUrl(repoDetails, branch, selectedPath);
    if ("error" in urlResult) return fail(urlResult, errCtx);
    const { url } = urlResult;

    await action.perform(url);
  } catch (err) {
    DebugOutput.log(`Unexpected error: ${err}`);
    return fail({ error: "unknown" }, errCtx);
  }
}
