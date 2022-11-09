import { ImageRegistry } from '@/renderer/ImageRegistry';

export class BattleImageRegistry extends ImageRegistry {

  public getPaths(): string[] {
    return [
      'bg/battle/base.png',
      'bg/battle/mid.png',

      'tiles/tileset1.png',
      
      'character/player/idle.png',
      'character/player/move.png',
      'character/player/attack1.png',
      'character/player/hurt.png',
      'character/player/death.png',
      'character/player/arrow.png',

      'character/blueslime/idle.png',
      'character/blueslime/move.png',
      'character/blueslime/attack.png',
      'character/blueslime/hurt.png',
      'character/blueslime/die.png',

      'character/flyingeye/move.png',
      'character/flyingeye/attack.png',
      'character/flyingeye/hurt.png',
      'character/flyingeye/death.png',

      'character/goblin/idle.png',
      'character/goblin/move.png',
      'character/goblin/attack.png',
      'character/goblin/hurt.png',
      'character/goblin/death.png',

      'character/mushroom/idle.png',
      'character/mushroom/move.png',
      'character/mushroom/attack.png',
      'character/mushroom/hurt.png',
      'character/mushroom/death.png',

      'character/skeleton/idle.png',
      'character/skeleton/move.png',
      'character/skeleton/attack.png',
      'character/skeleton/hurt.png',
      'character/skeleton/death.png',
      'character/skeleton/shield.png',
    ];
  }

}
