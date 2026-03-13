import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sale } from '../../../core/models/sale.model';
import { SalesService } from '../../../core/services/sales.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html'
})
export class SalesListComponent implements OnInit {
  displayedColumns = ['numComprobante', 'tipoComprobante', 'cliente', 'total', 'estado', 'sunat', 'actions'];
  dataSource = new MatTableDataSource<Sale>();
  loading = false;
  sendingId: number | null = null;

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { this.dataSource.paginator = p; }
  @ViewChild(MatSort) set sort(s: MatSort) { this.dataSource.sort = s; }

  constructor(
    private service: SalesService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => { this.dataSource.data = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  estadoClass(estado?: string): string {
    switch (estado?.toUpperCase()) {
      case 'ACEPTADO': return 'chip-aceptado';
      case 'RECHAZADO': return 'chip-rechazado';
      case 'PENDIENTE': return 'chip-pendiente';
      default: return 'chip-error';
    }
  }

  sendToSunat(sale: Sale): void {
    if (!sale.id) return;
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Enviar a SUNAT',
        message: `¿Enviar comprobante ${sale.serieComprobante}-${sale.numComprobante} a SUNAT?`
      }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.sendingId = sale.id!;
      this.service.sendToSunat(sale.id!).subscribe({
        next: res => {
          this.sendingId = null;
          const msg = res.estado === 'ACEPTADO'
            ? `Aceptado: ${res.descripcionSunat}`
            : `Rechazado: ${res.descripcionSunat}`;
          this.snack.open(msg, 'Cerrar', { duration: 5000 });
          this.load();
        },
        error: () => {
          this.sendingId = null;
          this.snack.open('Error al comunicarse con SUNAT', 'Cerrar', { duration: 4000 });
          this.load();
        }
      });
    });
  }

  delete(sale: Sale): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar venta', message: `¿Eliminar venta ${sale.numComprobante}?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.service.delete(sale.id!).subscribe({
        next: () => { this.snack.open('Eliminado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
