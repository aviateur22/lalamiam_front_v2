//@ts-nocheck
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import frontendUrl from 'src/misc/frontend.url';
import pageTitle from 'src/misc/page-title';
import { titleResolver } from './services/title.resolver';
import { environment } from 'src/environments/environment';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';



const routes: Routes = [
    { path: frontendUrl.home.url, component: HomePageComponent, resolve:{ title: titleResolver}},
    { path: frontendUrl.error.url, component: ErrorPageComponent, resolve: { title: titleResolver}},
    { path: frontendUrl.notFound.url, component: NotFoundPageComponent, resolve: { title: titleResolver}},
    { path: '', redirectTo: `${frontendUrl.home.url}`, pathMatch: 'full'},
    { path: "**", redirectTo:`${frontendUrl.notFound.url}`, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
