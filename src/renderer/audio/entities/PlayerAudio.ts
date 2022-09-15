import { AudioResource } from '@/renderer/audio/AudioResource';
import { EntityAudio } from '@/renderer/audio/entities/EntityAudio';
import { EntityState } from '@/wrapper/entities/Entity';

export class PlayerAudio implements EntityAudio {

  private readonly audio: AudioResource;

  private readonly audioMap: Map<EntityState, AudioResource>;

  private currentState: EntityState = EntityState.IDLE;

  public constructor() {
    this.audio = new AudioResource('audio/player.mp3');
    this.audioMap = new Map([
      [EntityState.IDLE, new AudioResource('audio/player.mp3')],
      [EntityState.ATTACK, new AudioResource('audio/player.mp3')],
      [EntityState.HURT, new AudioResource('audio/player.mp3')],
    ]);
  }

  public async loadAllAudios(): Promise<void> {
    await this.audio.load();
    for (const audio of this.audioMap.values()) {
      await audio.load();
    }
  }

  public getCurrentAudio(): AudioResource {
    return this.audioMap.get(this.currentState) ?? this.audio;
  }

  public setCurrentAudio(state: EntityState): void {
    this.currentState = state;
  }

}
