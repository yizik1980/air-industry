export interface ArticleModel {
  id: string;
  title: string;
  content: string;
  imageSource: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: string[];
  author?: Author;
}
export interface Author {
  name: string;
  content: string;
  imageSource: string;
}