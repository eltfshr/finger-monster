import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { Collision } from '@/renderer/collision/Collision';

export class CollisionProcessor {

  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private context: CanvasRenderingContext2D = this.canvas.getContext('2d')!;

  public process(sprite: SpriteResource): Collision {
    this.canvas.width = Math.floor(sprite.getWidth() * (sprite.getMaxFrame() + 1));
    this.canvas.height = Math.floor(sprite.getHeight());
    this.context.drawImage(sprite.getImage(), 0, 0);

    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    let upperBound = 0;
    let isUpperFound = false
    let leftBound = 0;

    for (let i = 0; (i < imageData.height * imageData.width * 4) && !isUpperFound; i += 4) {
        if (data[i + 3] != 0) {
          isUpperFound = true;
          upperBound = Math.floor(i / 4 / imageData.width);

          let j = Math.floor(upperBound * imageData.width * 4);
          let isFirstTime = true;

          while (j < (upperBound + 1) * imageData.width * 4) {
            let isLeftFound = false;

            for (let k = j; (k < imageData.height * imageData.width * 4) && !isLeftFound; k += imageData.width * 4) {
              if (data[k + 3] != 0) {
                isLeftFound = true;
                leftBound = k / 4 % imageData.width;
              }
            }

            if (!isLeftFound) {
              if (isFirstTime) {
                j += 4;
              } else {
                j += Math.floor(sprite.getWidth() * 4);
              }
            } else {
              if (isFirstTime) {
                isFirstTime = false;
                j += Math.floor(sprite.getWidth() * 4);
              } else {
                j -= 4;
              }
            }
          }
        }
    }

    let lowerBound = imageData.height;
    let isLowerFound = false
    let rightBound = imageData.width;

    for (let i = Math.floor(imageData.height * imageData.width * 4 - 4); (i > 0) && !isLowerFound; i -= 4) {
        if (data[i + 3] != 0) {
          isLowerFound = true;
          lowerBound = Math.floor(i / 4 / imageData.width);

          let j = Math.floor(lowerBound * imageData.width * 4);
          let isFirstTime = true;

          while (j > (lowerBound - 1) * imageData.width * 4) {
            let isRightFound = false;

            for (let k = j; (k > 0) && !isRightFound; k -= imageData.width * 4) {
              if (data[k + 3] != 0) {
                isRightFound = true;
                rightBound = k / 4 % imageData.width;
              }
            }
            
            if (!isRightFound) {
              if (isFirstTime) {
                j -= 4;
              } else {
                j -= Math.floor(sprite.getWidth() * 4);
              }
            } else {
              if (isFirstTime) {
                isFirstTime = false;
                j -= Math.floor(sprite.getWidth() * 4);
              } else {
                j += 4;
              }
            }
          }
        }
    }
    
    return new Collision(upperBound, lowerBound, leftBound % sprite.getWidth(), rightBound % sprite.getWidth());
  }
  
}
