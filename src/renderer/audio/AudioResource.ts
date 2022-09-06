import { GameResource } from '@/renderer/GameResource';
import { Howl } from 'howler';

export abstract class AudioResource implements GameResource {

  private readonly audio: Howl;

  private volume: number = 0;

  public constructor(audioPath: string) {
    this.audio = new Howl({
      src: [audioPath],
      volume: 0,
      preload: false,
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
  
}
