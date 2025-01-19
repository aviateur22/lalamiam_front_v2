import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router: Router, private _titleService: Title) {}

  ngOnInit(): void {
    this._router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const currentRoute = this._router.routerState.root.snapshot;
      let title = this.resolveTitle(currentRoute);
      this._titleService.setTitle(title || 'Missing Title');
    });
  }

  resolveTitle(route: any): string | null {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data?.['title'] || null;
  }
}
