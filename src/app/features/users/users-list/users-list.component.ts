import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserList } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  displayedColumns = ['usuario', 'rol', 'actions'];
  dataSource = new MatTableDataSource<UserList>();

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { this.dataSource.paginator = p; }

  constructor(
    private service: UsersService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe(data => this.dataSource.data = data);
  }

  openDialog(row?: UserList): void {
    if (row) {
      // Obtener detalle completo antes de abrir el formulario de edición
      this.service.getById(row.id).subscribe({
        next: detail => this._openDialogWith(detail),
        error: () => this.snack.open('Error al cargar el usuario', 'Cerrar', { duration: 3000 })
      });
    } else {
      this._openDialogWith();
    }
  }

  private _openDialogWith(detail?: import('../../../core/models/user.model').UserDetail): void {
    const ref = this.dialog.open(UserDialogComponent, { width: '480px', data: { user: detail } });
    ref.afterClosed().subscribe(result => {
      if (!result) return;
      const op = detail
        ? this.service.update(detail.id, result)
        : this.service.create(result);
      op.subscribe({
        next: () => { this.snack.open('Guardado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al guardar', 'Cerrar', { duration: 3000 })
      });
    });
  }

  delete(row: UserList): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar usuario', message: `¿Eliminar a "${row.usuario}"?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.service.delete(row.id).subscribe({
        next: () => { this.snack.open('Eliminado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
