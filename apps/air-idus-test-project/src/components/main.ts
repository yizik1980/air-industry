import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel } from '../model/article.model';
import { Article } from './article';

@Component({
  selector: 'app-main',
  imports: [CommonModule, Article],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  @Input() 
  public articles: ArticleModel[] = [];
  ngOnInit() {
   
  }



}
