import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArticleModel } from '../model/article.model';
import { Article } from './article';

@Component({
  selector: 'app-main',
  imports: [CommonModule, Article],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  @Input() 
  public articles: ArticleModel[] = [];
}
