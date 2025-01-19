import { Route } from "@angular/router";
import frontendUrl from "src/misc/frontend.url";
import { HomePageComponent } from "../page/home-page/home-page.component";
import { ErrorPageComponent } from "../page/error-page/error-page.component";
import { NotFoundPageComponent } from "../page/not-found-page/not-found-page.component";
import { titleResolver } from "../service/title.resolver";

export const commonRooting: Route[] = [
    { path: frontendUrl.home.url, component: HomePageComponent, resolve:{ title: titleResolver}},
    { path: frontendUrl.error.url, component: ErrorPageComponent, resolve: { title: titleResolver}},
    { path: frontendUrl.notFound.url, component: NotFoundPageComponent, resolve: { title: titleResolver}},
    { path: '', redirectTo: `${frontendUrl.home.url}`, pathMatch: 'full'},
    { path: "**", redirectTo:`${frontendUrl.notFound.url}`, pathMatch: 'full'}

];
