import { randomUUID } from 'node:crypto';

export class Track {
  public readonly id: string;

  constructor(
    public readonly name: string,
    public readonly isrc: string,
    public readonly artists: string[],
  ) {
    this.id = randomUUID();
  }
}
