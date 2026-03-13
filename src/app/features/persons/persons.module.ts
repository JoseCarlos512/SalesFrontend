import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonDialogComponent } from './person-dialog/person-dialog.component';

@NgModule({
  declarations: [PersonsListComponent, PersonDialogComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: PersonsListComponent }])
  ]
})
export class PersonsModule {}
