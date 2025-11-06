import { Route } from '@angular/router';
import { Home } from '../module/home';
import { articlesResolver } from '../services/articles.resolver';

export const appRoutes: Route[] = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: "home", loadChildren: () => import('../module/home').then(m => m.Home) },

];
