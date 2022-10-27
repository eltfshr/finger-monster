import { ImageRegistry } from '@/renderer/ImageRegistry';

export class ItemImageRegistry extends ImageRegistry {

    public getPaths(): string[] {
        console.log(`Registering ${this.constructor.name}`);
        return [
            'item/testitem.png'
        ];
      }
      
}