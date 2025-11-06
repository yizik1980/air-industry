import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from './api.service';
import { map, Observable, tap } from 'rxjs';
import { ArticleDto } from '../../../dto/article.dto';
import { ArticleModel } from '../model/article.model';


export const articlesResolver: ResolveFn<Observable<ArticleModel[]>> = () => {
    const api = inject(ApiService);
    return api.get<{ articles: ArticleDto[] }>('articles')
    .pipe(map(({ articles }) => {
        return articles.map((article) => ({
            ...article,
            createdAt: article?.createdAt ? new Date(article.createdAt):new Date(),
            updatedAt: article?.updatedAt ? new Date(article.updatedAt):new Date()
        }));
    }),
    tap(articles=>{
        console.log('Resolved articles:', articles);
        sessionStorage.setItem('articles', JSON.stringify(articles));
    })
    );
};
