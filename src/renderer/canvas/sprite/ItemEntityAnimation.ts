import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { ImageRegistry } from '@/renderer/ImageRegistry';
import { EntityState } from '@/wrapper/entities/EntityState';

export class ItemEntityAnimation {

    private readonly spriteResourceByState: Map<EntityState, SpriteResource>;
    
    private imagePath: string | undefined;
    private entityState: EntityState;

    public constructor(imageRegistry: ImageRegistry, imagePath: string) {
        this.imagePath = imagePath
        this.spriteResourceByState = this.createSpriteMap(this.imagePath);
        this.entityState = this.spriteResourceByState.keys().next().value;
        this.loadSprite(imageRegistry);
    }

    private loadSprite(imageRegistry: ImageRegistry) {
        try {
            console.log(this.spriteResourceByState.values());
            Array.from(this.spriteResourceByState.values())
                .map( (resource) => resource.loadFromImageRegistry(imageRegistry) );
        }
        catch(error) {
            console.log(error);
            throw new Error(`${this.constructor.name} cannot load required resources`);
        }
    }

    public getAllSprite(): SpriteResource[] {
        return Array.from(this.spriteResourceByState.values());
    }

    public getCurrentSprite(): SpriteResource {
        const sprite = this.spriteResourceByState.get(this.entityState);
        if(!sprite) throw new Error(`Could not get a resource with state ${this.entityState}`);
        return sprite;
    }

    public setCurrentSprite(state: EntityState) {
        let sprite = this.getCurrentSprite();

        sprite.resetFrame();
        sprite.setStopLastFrame(false);
        this.entityState = state;
    }

    public createSpriteMap(imagePath: string): Map<EntityState, SpriteResource> {
        if(!this.imagePath) throw new Error(`${this.constructor.name}'s sprite image path is undefined`)
        return new Map([
            [EntityState.IDLE, new SpriteResource(imagePath, 0, 10, false)]
        ])
    }
}