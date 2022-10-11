import { EntityAnimation } from '@/renderer/canvas/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from "@/wrapper/entities/EntityState";

export class ItemAnimation extends EntityAnimation {

    public createSpriteMap(): Map<EntityState, SpriteResource> {
        return new Map([
            [EntityState.IDLE, new SpriteResource('character/player/item.png',11,10)],
        ]);
    }     
}