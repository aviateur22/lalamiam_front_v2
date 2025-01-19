import { environment } from "src/environments/environment";

export class LogUtility {
  /**
   * Log d'un message
   * @param message
   */
  public static log(className: string, message: any): void  {
    if(environment.production === false)
      console.log( `[${className}] - [${new Date().toISOString()}] : ${message}`);
  }

  public static error(className: string, message: string): void  {
    console.log( `[${className}] - [${new Date().toISOString()}] : ${message}`);
  }
}
