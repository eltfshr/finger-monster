import { ImageRegistry } from '@/renderer/ImageRegistry';

export class BattleImageRegistry extends ImageRegistry {

  public getPaths(): string[] {
    console.log(`Registering ${this.constructor.name}`);
    return [
      'bg/battle/base.png',
      'bg/battle/mid.png',

      'tiles/tileset1.png',
      
      'character/player/idle.png',
      'character/player/move.png',
      'character/player/attack1.png',
      'character/player/hurt.png',
      'character/player/death.png',

      'character/blueslime/attack.png',
      'character/blueslime/hurt.png',
      'character/blueslime/die.png',
    ];
  }

}
