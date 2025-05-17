// Note: If updating here, you also need to update in package.json.
export const extensionId = "open-in-github";
export const editorCopyGitHubPermalinkId = `${extensionId}.editorCopyGitHubPermalink`;
export const editorOpenInGitHubId = `${extensionId}.editorOpenInGitHub`;
export const editorOpenInGitHubMasterId = `${extensionId}.editorOpenInGitHubMaster`;
export const explorerCopyGitHubPermalinkId = `${extensionId}.explorerCopyGitHubPermalink`;

export const commandIds = [
  editorCopyGitHubPermalinkId,
  editorOpenInGitHubId,
  editorOpenInGitHubMasterId,
  explorerCopyGitHubPermalinkId,
] as const;

export type CommandId = (typeof commandIds)[number];
