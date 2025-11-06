import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArticleModel } from '../model/article.model';

@Component({
  selector: 'app-article',
  imports: [CommonModule],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article {
  @Input() article!: ArticleModel;
}
