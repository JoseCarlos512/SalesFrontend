import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article, Category } from '../../../core/models/article.model';
import { CategoriesService } from '../../../core/services/categories.service';

export interface ArticleDialogData {
  article?: Article;
}

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html'
})
export class ArticleDialogComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ArticleDialogData
  ) {
    this.isEdit = !!data?.article;
    this.form = this.fb.group({
      nombre: [data?.article?.nombre ?? '', Validators.required],
      descripcion: [data?.article?.descripcion ?? ''],
      precio: [data?.article?.precio ?? 0, [Validators.required, Validators.min(0)]],
      stock: [data?.article?.stock ?? 0, [Validators.required, Validators.min(0)]],
      idCategory: [data?.article?.category?.id ?? null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe(cats => this.categories = cats);
  }

  submit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }
}
