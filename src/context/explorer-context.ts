import { Context, ContextResult } from "./context";

export class ExplorerContext extends Context {
  static readonly instance = new ExplorerContext();

  private constructor() {
    super();
  }

  async getSelectedPath(): Promise<ContextResult> {
    // TODO: Implement properly.
    return { error: "explorer-nothing-selected" };
  }
}
