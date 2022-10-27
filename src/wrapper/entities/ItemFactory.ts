import { ItemEntityAnimation } from '@/renderer/canvas/sprite/ItemEntityAnimation';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';
import { ItemEntity } from '@/wrapper/entities/ItemEntity';

export abstract class ItemFactory implements ItemEntity  {
    
    protected animation: ItemEntityAnimation | undefined;
    protected x: number = 0;
    protected y: number = 0;
    protected velocity: number = 1.0;
    protected health: number = 30;
    protected state: EntityState = EntityState.IDLE;

    public setAnimation(animation: ItemEntityAnimation): void {
        this.animation = animation;
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

    public getVelocity(): number {
        return this.velocity;        
    }

    public setVelocity(velocity: number): void {
        this.velocity = velocity;
    }

    public getCurrentState(): EntityState {
        return this.state;
    }

    public setCurrentState(state: EntityState): void {
        if(!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`)
        
        this.state = state;
        this.animation.setCurrentSprite(state);
    }

    public getCurrentSprite(): SpriteResource {
        if(!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`);

        return this.animation.getCurrentSprite();
    }


    public getAnimation(): ItemEntityAnimation {
        if(!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`);
        
        return this.animation;
    }

    public isIdle(): boolean {
        return this.state == EntityState.IDLE;
    }

    public abstract idle(): void;

    public abstract collect(): void;

    public abstract properties(): void;

    public abstract destroy(): void;
}
