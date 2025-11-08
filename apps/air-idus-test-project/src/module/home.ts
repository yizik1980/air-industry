import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Main } from '../components/main';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { PostArticleForm } from '../components/post-article/post-article-form';
import { ArticleDto } from 'apps/dto/article.dto';
import { map, startWith } from 'rxjs/operators';
import { ArticleModel } from '../model/article.model';
import { ApiService } from '../services/api.service';
import { combineLatest, Observable } from 'rxjs';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-home',
  imports: [Main, Header, Footer, AsyncPipe, PostArticleForm],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private api = inject(ApiService);
  private articlesService = inject(ArticlesService);
  public articels$: Observable<ArticleModel[]> = new Observable<ArticleModel[]>();
  public filteredArticles$: Observable<ArticleModel[]> = new Observable<ArticleModel[]>();
  public isPostArticleFormOpen = false;

  ngOnInit(): void {
    this.articels$ = this.api.get<{ articles: ArticleDto[] }>('articles')
      .pipe(map(({ articles }) => {
        return articles.map((article) => ({
          ...article,
          createdAt: article?.createdAt ? new Date(article.createdAt) : new Date(),
          updatedAt: article?.updatedAt ? new Date(article.updatedAt) : new Date()
        }));
      }));

    const searchTerm$ = this.articlesService.getInputEmmiter().pipe(startWith(''));

    this.filteredArticles$ = combineLatest([this.articels$, searchTerm$]).pipe(
      map(([articles, term]) => {
        if (!term) {
          return articles;
        }
        return articles.filter((article) => {
          const searchTarget = `${article.title} ${article.content} ${article.author?.name ?? ''}`.toLowerCase();
          return searchTarget.includes(term);
        });
      })
    );
  }

  openPostArticleForm(): void {
    this.isPostArticleFormOpen = true;
  }

  closePostArticleForm(): void {
    this.isPostArticleFormOpen = false;
  }

  togglePostArticleForm(): void {
    this.isPostArticleFormOpen = !this.isPostArticleFormOpen;
  }

}
