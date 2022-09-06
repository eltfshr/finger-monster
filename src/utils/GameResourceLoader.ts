import { SceneComponent } from '@/renderer/canvas/scene/components/SceneComponent';
import { GameResource } from '@/renderer/GameResource';

export class GameResourceLoader {

  private constructor() {}

  public static load<T extends GameResource>(resources: SceneComponent<T>): Promise<void[]> {
    const loader = resources.getResources().map((resource) => resource.load());
    return Promise.all(loader);
  }

}
