import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { IncomeRoutingModule } from './income-routing.module';
import { IncomeListComponent } from './income-list/income-list.component';
import { IncomeFormComponent } from './income-form/income-form.component';

@NgModule({
  declarations: [IncomeListComponent, IncomeFormComponent],
  imports: [SharedModule, IncomeRoutingModule]
})
export class IncomeModule {}
