import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Income } from '../../../core/models/income.model';
import { IncomeService } from '../../../core/services/income.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html'
})
export class IncomeListComponent implements OnInit {
  displayedColumns = ['numComprobante', 'tipoComprobante', 'proveedor', 'total', 'estado', 'actions'];
  dataSource = new MatTableDataSource<Income>();
  loading = false;

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { this.dataSource.paginator = p; }

  constructor(
    private service: IncomeService,
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

  delete(income: Income): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar ingreso', message: `¿Eliminar ingreso ${income.numComprobante}?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.service.delete(income.id!).subscribe({
        next: () => { this.snack.open('Eliminado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
