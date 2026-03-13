import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  displayedColumns = ['nombre', 'email', 'rol', 'actions'];
  dataSource = new MatTableDataSource<User>();

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

  openDialog(user?: User): void {
    const ref = this.dialog.open(UserDialogComponent, { width: '480px', data: { user } });
    ref.afterClosed().subscribe(result => {
      if (!result) return;
      const op = user ? this.service.update(user.id, result) : this.service.create(result);
      op.subscribe({
        next: () => { this.snack.open('Guardado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al guardar', 'Cerrar', { duration: 3000 })
      });
    });
  }

  delete(user: User): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar usuario', message: `¿Eliminar a "${user.nombre}"?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.service.delete(user.id).subscribe({
        next: () => { this.snack.open('Eliminado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
