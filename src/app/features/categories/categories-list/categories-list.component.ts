import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../../../core/models/article.model';
import { CategoriesService } from '../../../core/services/categories.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
  displayedColumns = ['nombre', 'descripcion', 'actions'];
  dataSource = new MatTableDataSource<Category>();
  form: FormGroup;
  editingId: number | null = null;
  loading = false;

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { this.dataSource.paginator = p; }

  constructor(
    private service: CategoriesService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe(data => this.dataSource.data = data);
  }

  submit(): void {
    if (this.form.invalid) return;
    const op = this.editingId
      ? this.service.update(this.editingId, this.form.value)
      : this.service.create(this.form.value);
    op.subscribe({
      next: () => {
        this.snack.open('Guardado', '', { duration: 2000 });
        this.form.reset();
        this.editingId = null;
        this.load();
      },
      error: () => this.snack.open('Error', 'Cerrar', { duration: 3000 })
    });
  }

  edit(cat: Category): void {
    this.editingId = cat.id;
    this.form.patchValue({ nombre: cat.nombre, descripcion: cat.descripcion });
  }

  cancel(): void {
    this.editingId = null;
    this.form.reset();
  }

  delete(cat: Category): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar categoría', message: `¿Eliminar "${cat.nombre}"?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.service.delete(cat.id).subscribe({
        next: () => { this.snack.open('Eliminado', '', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
