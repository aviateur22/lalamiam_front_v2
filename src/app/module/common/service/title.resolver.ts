import { ResolveFn } from '@angular/router';
import { environment } from 'src/environments/environment';
import frontendUrl from 'src/misc/frontend.url';
import { LogUtility } from 'src/utils/log.utility';
import { AppParamService } from '../../init/services/app-param.service';
import { inject } from '@angular/core';
import { TextUtility } from 'src/utils/text-utility';

/**
 * Determine le titre d'une page
 * @param route ActivatedRouteSnapshot
 * @param state  RouteStateSnapshot
 * @returns string - Titre de la page
 */
export const titleResolver: ResolveFn<string> = (route, state) => {

  var path = route.routeConfig?.path;
  LogUtility.log(titleResolver.name, `url path: ${path}`);

  var properties = getData();
  if(properties === null)
    return `${environment.main_page_title} | --`

  switch(path) {
        case frontendUrl.notFound.url: return addApplicationTitle(properties.notFoundPageTitle);
        case frontendUrl.home.url: return addApplicationTitle(properties.homePageTitle);
        case frontendUrl.error.url: return addApplicationTitle(properties.errorPageTitle);
        case frontendUrl.login.url: return addApplicationTitle(properties.loginPageTitle);
        case frontendUrl.register.url: return addApplicationTitle(properties.registerPageTitle);
        case frontendUrl.professionalRegister.url: return addApplicationTitle(properties.registerProfessionalPageTitle);
        case frontendUrl.accountActivation.url: return addApplicationTitle(properties.activateAccountTitle);
        case frontendUrl.changeAccountPassword.url: return addApplicationTitle(properties.changeAccountPasswordTitle);
        case frontendUrl.lostPasswordMailingPage.url: return addApplicationTitle(properties.lostPasswordMailingTitle);
        case frontendUrl.userHome.url: return addApplicationTitle(properties.userHomePageTitle);
        case frontendUrl.professionalRegisterConfirmation.url: return addApplicationTitle(properties.registerProfessionalConfirmationPageTitle);
        default: {
          LogUtility.error(titleResolver.name, `Le titre de la page n'existe pas - path ${path}`);
          return `${environment.main_page_title} | --`;
        }
    }
};

/**
 * Récupération des propriétés
 * @returns any - Propriétés de l'application
 */
const getData: any = () => {
  try {
    const appParamService = inject(AppParamService);
    var properties = appParamService.getProperties();
    LogUtility.log(titleResolver.name, `Chargement des properiétés depuis le resolver ${properties}`);
    if(properties===null)
      throw new Error('erreur chargement properties')
    return properties;
  } catch (error) {
    LogUtility.error(titleResolver.name, "Erreur dans la récupération des properties");
    return null;
  }
}

/**
 * Ajout du nom de l'application dans le titree de la page
 * @param initialText string
 * @returns string
 */
const addApplicationTitle = (initialText: string): string => {
  return TextUtility.replace(initialText, '{{main_page_title}}', environment.main_page_title)
}
