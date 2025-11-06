import { Injectable } from '@nestjs/common';
import jsonFsService from '../shared-services/json.fs.service';
import { ArticleDto } from '../../../dto/article.dto';
import { randomUUID } from 'crypto';
@Injectable()
export class ArticlesService {
  async findAll() {
    const articles = await jsonFsService.readJson('articles.json');
    return articles;
  }
  
  async addArticle(article:ArticleDto) {
    article.id = randomUUID();
    const newArticle = await jsonFsService.addItem('articles.json', article);
    return newArticle;
  }

  async deleteArticle(id: string) {
    const updatedArticles = await jsonFsService.deleteItem('articles.json', id);
    return updatedArticles;
  }

}
