import { SpriteResource } from '@/renderer/sprite/SpriteResource';

export class AttackSpriteResource extends SpriteResource {

  private attackFrame: number = -1;

  public constructor(imagePath: string, maxFrame: number, frameHold: number, attackFrame: number) {
    super(imagePath, maxFrame, frameHold);
    this.attackFrame = attackFrame;
  }

  public getAttackFrame(): number {
    return this.attackFrame;
  }

}
