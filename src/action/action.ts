export abstract class Action {
  abstract perform(url: string): Promise<void>;
}
