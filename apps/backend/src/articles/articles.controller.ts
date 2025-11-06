import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDto } from 'apps/dto/article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Post()
  addArticle(@Body() article: ArticleDto) {
    // Implementation for adding an article
    return this.articlesService.addArticle(article);
  }
  @Delete(":id")
  removeArticle(@Body("id") id: string) {
    // Implementation for deleting an article
    return this.articlesService.deleteArticle(id);
  }
}
