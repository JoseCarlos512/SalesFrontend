import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@NgModule({
  declarations: [UsersListComponent, UserDialogComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: UsersListComponent }])
  ]
})
export class UsersModule {}
