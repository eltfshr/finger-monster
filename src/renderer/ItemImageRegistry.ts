import { ImageRegistry } from '@/renderer/ImageRegistry';

export class ItemImageRegistry extends ImageRegistry {

    public getPaths(): string[] {
        return [
            'item/testitem.png'
        ];
      }
      
}