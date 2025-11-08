import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticleDto } from 'apps/dto/article.dto';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-article-form',
  imports: [ReactiveFormsModule],
  templateUrl: './post-article-form.html',
  styleUrl: './post-article-form.css',
})
export class PostArticleForm {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);

  readonly articleForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
    imageSource: [''],
    authorName: ['', Validators.required],
    authorContent: [''],
    authorImageSource: [''],
  });

  submitting = false;
  submitStatus: 'success' | 'error' | null = null;

  handleSubmit(): void {
    if (this.articleForm.invalid || this.submitting) {
      this.articleForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitStatus = null;

    const {
      title,
      content,
      imageSource,
      authorName,
      authorContent,
      authorImageSource,
    } = this.articleForm.getRawValue();

    type CreateArticlePayload = Omit<ArticleDto, 'id'>;
    const now = new Date().toISOString();
    const payload: CreateArticlePayload = {
      title,
      content,
      imageSource,
      createdAt: now,
      updatedAt: now,
      comments: [],
      author: {
        name: authorName,
        content: authorContent,
        imageSource: authorImageSource,
      },
    };

    this.api
      .post<ArticleDto, CreateArticlePayload>('articles', payload)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: () => {
          this.submitStatus = 'success';
          this.articleForm.reset({
            title: '',
            content: '',
            imageSource: '',
            authorName: '',
            authorContent: '',
            authorImageSource: '',
          });
        },
        error: () => {
          this.submitStatus = 'error';
        },
      });
  }
}
