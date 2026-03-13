import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Provider } from '../../../core/models/person.model';
import { ProvidersService } from '../../../core/services/providers.service';
import { ProviderDialogComponent } from '../provider-dialog/provider-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html'
})
export class ProvidersListComponent implements OnInit {
  displayedColumns = ['nombre', 'ruc', 'telefono', 'email', 'actions'];
  dataSource = new MatTableDataSource<Provider>();

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { this.dataSource.paginator = p; }

  constructor(
    private service: ProvidersService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe(data => this.dataSource.data = data);
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  openDialog(provider?: Provider): void {
    const ref = this.dialog.open(ProviderDialogComponent, { width: '480px', data: { provider } });
    ref.afterClosed().subscribe(result => {
      if (!result) return;
      const op = provider ? this.service.update(provider.id, result) : this.service.create(result);
      op.subscribe({
        next: () => { this.snack.open('Guardado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al guardar', 'Cerrar', { duration: 3000 })
      });
    });
  }

  delete(provider: Provider): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar proveedor', message: `¿Eliminar "${provider.nombre}"?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.service.delete(provider.id).subscribe({
        next: () => { this.snack.open('Eliminado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
