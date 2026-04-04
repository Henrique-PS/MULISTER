import { randomUUID } from 'node:crypto';
import { Track } from './track.entity';

export class PlayList {
  public readonly id: string;

  constructor(
    private name: string,
    public readonly description: string,
    public readonly tracks: Track[],
  ) {
    this.id = randomUUID();
  }

  public getName(): string {
    return this.name;
  }

  public changeName(newName: string): void {
    this.name = newName;
  }
}
