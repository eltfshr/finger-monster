import { AttackBlueSlimeSprite } from "../../sprite/blueslime/AttackBlueSlimeSprite";
import { DieBlueSlimeSprite } from "../../sprite/blueslime/DieBlueSlimeSprite";
import { HurtBlueSlimeSprite } from "../../sprite/blueslime/HurtBlueSlimeSprite";
import { SpriteResource } from "../../sprite/SpriteResource";
import { SceneComponent } from "./SceneComponent";

export class BlueSlimeComponents extends SceneComponent<SpriteResource> {

  public constructor() {
    super([
      new AttackBlueSlimeSprite(),
      new DieBlueSlimeSprite(),
      new HurtBlueSlimeSprite(),
    ], 0, 0);
  }

  public getAttackSprite(): SpriteResource {
    return this.getResources()[0];
  }

  public getDieSprite(): SpriteResource {
    return this.getResources()[1];
  }

  public getHurtSprite(): SpriteResource {
    return this.getResources()[2];
  }

}
