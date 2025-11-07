import { Component, viewChild } from '@angular/core';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public articleService:ArticlesService){}

  public onSearch(value:string):void {
    const query = value.trim().toLowerCase();
    this.articleService.setInputEmmiter(query);
  } 
}
