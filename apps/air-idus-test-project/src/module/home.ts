import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Main } from '../components/main';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { ArticleDto } from 'apps/dto/article.dto';
import { map } from 'rxjs/operators';
import { ArticleModel } from '../model/article.model';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Main, Header, Footer, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private api = inject(ApiService);
  public articels$: Observable<ArticleModel[]> = new Observable<ArticleModel[]>();
  ngOnInit(): void {
    this.articels$ = this.api.get<{ articles: ArticleDto[] }>('articles')
      .pipe(map(({ articles }) => {
        return articles.map((article) => ({
          ...article,
          createdAt: article?.createdAt ? new Date(article.createdAt) : new Date(),
          updatedAt: article?.updatedAt ? new Date(article.updatedAt) : new Date()
        }));
      }));
  }

}
