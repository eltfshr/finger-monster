import { AbstractEntitySprites } from '@/renderer/canvas/sprite/entities/AbstractEntitySprites';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from "@/wrapper/entities/Entity";

export class ItemSprite extends AbstractEntitySprites {

    public constructor() {
        const spriteResourceByState = new Map([
            [EntityState.IDLE, new SpriteResource('character/player/idle.png',11,10)],
        ]);

    super(spriteResourceByState, EntityState.IDLE);
    }
}