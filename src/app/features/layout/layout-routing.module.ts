import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('../articles/articles.module').then(m => m.ArticlesModule)
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('../sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'persons',
        loadChildren: () =>
          import('../persons/persons.module').then(m => m.PersonsModule)
      },
      {
        path: 'providers',
        loadChildren: () =>
          import('../providers/providers.module').then(m => m.ProvidersModule)
      },
      {
        path: 'income',
        loadChildren: () =>
          import('../income/income.module').then(m => m.IncomeModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then(m => m.UsersModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
