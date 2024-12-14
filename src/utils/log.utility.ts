import { environment } from "src/environments/environment";

export class LogUtility {
  /**
   * Log d'un message
   * @param message
   */
  public static log(message: string)  {

    if(environment.production === false)
      console.log(message)
  }
}
