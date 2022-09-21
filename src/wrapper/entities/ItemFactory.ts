import { ItemSprites } from '@/renderer/canvas/sprite/entities/ItemSprites';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/Entity';
import { ItemEntity } from './ItemEntity';

export abstract class ItemFactory implements ItemEntity {
    
    protected readonly sprites: ItemSprites;

    protected x: number;
    protected y: number;
    protected velocity: number = 1.0;
    protected health: number = 1;
    protected state: EntityState = EntityState.IDLE;

    public constructor(sprites: ItemSprites, x: number, y: number) {
        this.sprites = sprites;
        this.x = x;
        this.y = y;
    }

    public async load(): Promise<void> {
        await this.sprites.loadAllSprites();
    }

    public getX(): number {
        return this.x;
    }

    public setX(x: number) {
        this.x = x
    }

    public getY(): number {
        return this.y;
    }

    public setY(y: number) {
        this.y = y;
    }

    public setVelocity(velocity: number): void {
        this.velocity = velocity;
    }

    public getVelocity(): number {
        return this.velocity;        
    }

    public getCurrentSprite(): SpriteResource {
        return this.sprites.getCurrentSprite();
    }

    public setCurrentState(state: EntityState): void {
        this.state = state;
        this.sprites.setCurrentSprite(state);
    }

    public setCurrentTemporaryState(state: EntityState, afterState: EntityState): void {
        this.state = state;
        this.sprites.setCurrentSprite(state, () => {
            this.setCurrentState(afterState);
        });
    }

    public getCurrentState(): EntityState {
        return this.state;
    }

    public abstract idle(): void;
    public abstract collect(): void;
    public abstract effect(): void;
    public abstract destroy(): void;
}
