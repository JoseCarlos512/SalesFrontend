import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDialogComponent } from './article-dialog/article-dialog.component';

@NgModule({
  declarations: [ArticlesListComponent, ArticleDialogComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ArticlesListComponent }])
  ]
})
export class ArticlesModule {}
