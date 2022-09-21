import { ItemSprites } from "@/renderer/canvas/sprite/entities/ItemSprites";
import { EntityState } from "../Entity";
import { ItemFactory } from "../ItemFactory";

export class TestItem extends ItemFactory {
    public constructor(x: number, y: number) {
        super(new ItemSprites(), x, y);
    }
    
    public idle() : void {
        this.setCurrentState(EntityState.IDLE);
    }

    public effect() : void {

    }

    public collect(): void {
        
    }

    public destroy(): void {
        this.sprites.getCurrentSprite().setStopLastFrame(false);
    }
}