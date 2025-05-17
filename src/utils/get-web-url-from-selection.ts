import {
  getSelection,
  ErrorType as SelectionErrorType,
} from "../utils/get-selection";
import {
  getWebUrl,
  ErrorType as GetWebUrlErrorType,
  Mode as GetWebUrlMode,
} from "../utils/get-web-url";

export type ErrorType = SelectionErrorType | GetWebUrlErrorType;

export type Result = { webUrl: string } | { error: ErrorType };

export async function getWebUrlFromSelection(
  mode: GetWebUrlMode
): Promise<Result> {
  const selectionQuery = getSelection();
  if ("error" in selectionQuery) return selectionQuery;

  const { uri, startLine, endLine } = selectionQuery.selection;
  const lines = { start: startLine, end: endLine };

  const getWebUrlQuery = await getWebUrl(mode, uri, lines);
  if ("error" in getWebUrlQuery) return getWebUrlQuery;

  return getWebUrlQuery;
}
