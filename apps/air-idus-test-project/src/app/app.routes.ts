import { Route } from '@angular/router';
import { articlesResolver } from '../services/articles.resolver';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../module/home').then((m) => m.Home)
    }
];
