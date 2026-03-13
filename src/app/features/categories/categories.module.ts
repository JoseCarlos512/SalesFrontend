import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';

@NgModule({
  declarations: [CategoriesListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CategoriesListComponent }])
  ]
})
export class CategoriesModule {}
