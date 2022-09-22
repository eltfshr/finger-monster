import { ImageRegistry } from '@/renderer/ImageRegistry';

export class BattleImageRegistry extends ImageRegistry {

  public getPaths(): string[] {
    return [
      'bg/battle/base.png',
      'bg/battle/mid.png',

      'tiles/tileset1.png',
    ];
  }

}
