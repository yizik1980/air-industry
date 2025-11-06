export interface articleDto {
  id: number;
  title: string;
  content: string;
  imageSource: string;
  createdAt: Date;
  updatedAt: Date;
  comments: string[];
}
export interface CreateArticleDto {
  title: string;
  content: string;
  imageSource: string;
}
