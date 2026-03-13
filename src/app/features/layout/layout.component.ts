import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    { label: 'Ventas', icon: 'point_of_sale', route: 'sales' },
    { label: 'Artículos', icon: 'inventory_2', route: 'articles' },
    { label: 'Categorías', icon: 'category', route: 'categories' },
    { label: 'Clientes', icon: 'people', route: 'persons' },
    { label: 'Proveedores', icon: 'local_shipping', route: 'providers' },
    { label: 'Ingresos', icon: 'input', route: 'income' },
    { label: 'Usuarios', icon: 'manage_accounts', route: 'users' }
  ];

  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}
