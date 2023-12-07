    export class AppError {
      public message;
      public constructor(message: string, err?: any) {
      this.message = message;
      }
  
      public static create(
        message: string,
        err?: any
      ): AppError {
        return new AppError(message, err);
      }
    }
  
  