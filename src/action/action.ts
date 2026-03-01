export abstract class Action {
  abstract perform(url: string): Promise<void>;
  abstract get debugName(): string;
}
