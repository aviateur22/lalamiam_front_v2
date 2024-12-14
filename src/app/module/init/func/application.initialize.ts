import { InitAppService } from "../services/init-app.service";

export function applicationInitialize(initAppService: InitAppService) {
  return ()=> initAppService.appInit();
}
