export class UpdateVideoProgressCommand {
  constructor(
    public readonly userId: string,
    public readonly videoId: string,
    public readonly watchDuration: number,
  ) {}
}