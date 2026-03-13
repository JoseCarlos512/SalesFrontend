import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SaleFormComponent } from './sale-form/sale-form.component';

@NgModule({
  declarations: [SalesListComponent, SaleFormComponent],
  imports: [SharedModule, SalesRoutingModule]
})
export class SalesModule {}
