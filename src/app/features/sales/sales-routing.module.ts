import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SaleFormComponent } from './sale-form/sale-form.component';

const routes: Routes = [
  { path: '', component: SalesListComponent },
  { path: 'new', component: SaleFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
