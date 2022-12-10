import { GameResource } from "@/renderer/GameResource";
import { Howl } from "howler";

export class AudioResource implements GameResource {
  private readonly audio: Howl;

  private volume: number = 0;

  public constructor(audioPath: string) {
    this.audio = new Howl({
      src: [audioPath],
      volume: 0.1,
      preload: false,
      loop: true,
    });
  }

  public async load(): Promise<void> {
    this.audio.load();
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    this.volume = volume;
    this.audio.volume(this.volume);
  }

  public play(): void {
    this.audio.play();
  }

  public setLoop(loop: boolean): void {
    this.audio.loop(loop);
  }

  public stop(): void {
    this.audio.stop();
  }
}
