// Note: If updating here, you also need to update in package.json.
export const extensionId = "open-in-github";
export const copyGitHubPermalinkId = `${extensionId}.copyGitHubPermalink`;
export const openInGitHubId = `${extensionId}.openInGitHub`;
export const openInGitHubMasterId = `${extensionId}.openInGitHubMaster`;

export const commandIds = [
  copyGitHubPermalinkId,
  openInGitHubId,
  openInGitHubMasterId,
] as const;

export type CommandId = (typeof commandIds)[number];
