//@ts-nocheck
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import frontendUrl from 'src/misc/frontend.url';
import pageTitle from 'src/misc/page-title';
import { environment } from 'src/environments/environment';
import { NotFoundPageComponent } from './guard/pages/not-found-page/not-found-page.component';
import { ErrorPageComponent } from './guard/pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: environment.webapp_path,
    children: [
//      { path: frontendUrl.home.url, component: HomePageComponent, title: pageTitle.homePageTitle[environment.language]},
      { path: frontendUrl.error.url, component: ErrorPageComponent, title: pageTitle.errorPageTitle[environment.language]},
  //    { path: frontendUrl.userHome.url, component: UserPageComponent, title: pageTitle.userHomePageTitle[environment.language]},
      { path: frontendUrl.notFound.url, component: NotFoundPageComponent, title: pageTitle.notFoundPageTitle[environment.language]}
    ]
},
{ path: '', redirectTo: `${environment.webapp_path}/${frontendUrl.home.url}`, pathMatch: 'full'},
{ path: "**", redirectTo:`${environment.webapp_path}/${frontendUrl.notFound.url}`, pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
