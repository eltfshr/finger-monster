export abstract class ImageRegistry {
  
  private readonly imageByPath: Map<string, HTMLImageElement> = new Map();

  public abstract getPaths(): string[];

  public async load(): Promise<void> {
    const paths = this.getPaths();

    paths.forEach((path) => {
      const image = new Image();
      image.src = path;
      this.imageByPath.set(path, image);
    });

    const loader = Array
      .from(this.imageByPath.values())
      .map(this.loadImage);

    try {
      await Promise.all(loader);
    } catch {
      throw new Error('Could not load image resource into the Image registry');
    }
  }

  public getImage(path: string): HTMLImageElement {
    const image = this.imageByPath.get(path);

    if (!image) {
      throw new Error(`Image with path ${path} has not register`);
    }

    return image;
  }

  private async loadImage(image: HTMLImageElement): Promise<void> {
    if (image.complete) return;

    return new Promise((resolve) => {
      image.onload = () => resolve();
    });
  }

}
