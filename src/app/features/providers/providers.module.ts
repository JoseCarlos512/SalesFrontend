import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProviderDialogComponent } from './provider-dialog/provider-dialog.component';

@NgModule({
  declarations: [ProvidersListComponent, ProviderDialogComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProvidersListComponent }])
  ]
})
export class ProvidersModule {}
