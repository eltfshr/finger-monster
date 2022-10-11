//import { ItemAnimation } from "@/renderer/canvas/sprite/entities/ItemAnimation";
import { EntityState } from "@/wrapper/entities/EntityState";
import { ItemFactory } from "@/wrapper/entities/ItemFactory";

export class TestItem extends ItemFactory {
    
    public idle() : void {
        this.setCurrentState(EntityState.IDLE);
    }

    public effect() : void {

    }

    public collect(): void {
        
    }

    public expire(): void {
        this.setCurrentState(EntityState.DIE);
        this.getCurrentSprite().setStopLastFrame(false);
    }
}