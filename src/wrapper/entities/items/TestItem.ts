//import { ItemAnimation } from "@/renderer/canvas/sprite/entities/ItemAnimation";
import { EntityState } from "@/wrapper/entities/EntityState";
import { ItemFactory } from "@/wrapper/entities/ItemFactory";

export class TestItem extends ItemFactory {

    public idle() : void {
        this.setCurrentState(EntityState.IDLE);
    }

    public collect(): void {
        
    }

    public properties(): void {
           
    }

    public destroy(): void {
        this.setCurrentState(EntityState.DIE);
        this.getCurrentSprite().setStopLastFrame(false);
    }
}