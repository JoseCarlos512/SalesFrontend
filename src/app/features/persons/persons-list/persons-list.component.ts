import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Person } from '../../../core/models/person.model';
import { PersonsService } from '../../../core/services/persons.service';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html'
})
export class PersonsListComponent implements OnInit {
  displayedColumns = ['nombres', 'tipoDocumento', 'numDocumento', 'telefono', 'email', 'actions'];
  dataSource = new MatTableDataSource<Person>();

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { this.dataSource.paginator = p; }
  @ViewChild(MatSort) set sort(s: MatSort) { this.dataSource.sort = s; }

  constructor(
    private service: PersonsService,
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

  openDialog(person?: Person): void {
    const ref = this.dialog.open(PersonDialogComponent, { width: '520px', data: { person } });
    ref.afterClosed().subscribe(result => {
      if (!result) return;
      const op = person ? this.service.update(person.id, result) : this.service.create(result);
      op.subscribe({
        next: () => { this.snack.open('Guardado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al guardar', 'Cerrar', { duration: 3000 })
      });
    });
  }

  delete(person: Person): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar cliente', message: `¿Eliminar a "${person.nombres} ${person.apellidos}"?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.service.delete(person.id).subscribe({
        next: () => { this.snack.open('Eliminado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
