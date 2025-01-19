import { AppParamService } from "../services/app-param.service";

export function applicationInitialize(initAppService: AppParamService) {
  return ()=>initAppService.appInit();;
}
