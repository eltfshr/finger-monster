import { AudioResource } from '@/renderer/audio/AudioResource';
import { EntityState } from "@/wrapper/entities/Entity";

export interface EntityAudio  {

  loadAllAudios(): Promise<void>;

  getCurrentAudio(): AudioResource;

  setCurrentAudio(state: EntityState): void;

}
