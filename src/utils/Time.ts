export class Time {

  public static sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }

}
