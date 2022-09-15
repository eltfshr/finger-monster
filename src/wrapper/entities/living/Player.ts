import { PlayerSprites } from '@/renderer/canvas/sprite/entities/PlayerSprites';
import { Creature } from '@/wrapper/entities/Creature';
import { EntityState } from '@/wrapper/entities/Entity';

export class Player extends Creature {

  public constructor(x: number, y: number) {
    super(new PlayerSprites(), x, y);
  }

  public attack(): void {
    this.setCurrentState(EntityState.ATTACK);
  }

  public damage(): void {
    this.setCurrentState(EntityState.HURT);
  }

}

