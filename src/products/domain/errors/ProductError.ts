export namespace ProductError {

  export class Notfount {
    public message;
    public constructor(message: string, err?: any) {
    this.message = message;
    }

    public static create(
      message: string,
      err?: any
    ): Notfount {
      return new Notfount(message, err);
    }
  }

  export class InvalidData {
    public message;
    public constructor(message: string, err?: any) {
    this.message = message;
    }

    public static create(
      message: string,
      err?: any
    ): InvalidData {
      return new InvalidData(message, err);
    }
  }
}
