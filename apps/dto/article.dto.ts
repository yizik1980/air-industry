export interface ArticleDto {
  id: string;
  title: string;
  content: string;
  imageSource: string;
  createdAt: string;
  updatedAt: string;
  comments: string[];
  author: AuthorDto;
}
export interface AuthorDto {
  name: string;
  content: string;
  imageSource: string;
}
