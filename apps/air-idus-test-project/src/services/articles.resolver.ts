import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ArticleDto } from '../../../dto/article.dto';


export const articlesResolver: ResolveFn<Observable<{articles:ArticleDto[]}>> = () => {
    const api = inject(ApiService);
    return api.get<{ articles: ArticleDto[] }>('articles')
};
