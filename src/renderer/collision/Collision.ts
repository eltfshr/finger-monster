export class Collision {
  
  private top: number;
  private bottom: number;
  private left: number;
  private right: number

  public constructor(top: number, bottom: number, left: number, right: number) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }

  public getTop(): number {
    return this.top;
  }
  
  public getBottom(): number {
    return this.bottom;
  }

  public getLeft(): number {
    return this.left;
  }
  
  public getRight(): number {
    return this.right;
  }

  public getWidth(): number {
    return this.right - this.left + 1;
  }

  public getHeight(): number {
    return this.bottom - this.top + 1;
  }

}
