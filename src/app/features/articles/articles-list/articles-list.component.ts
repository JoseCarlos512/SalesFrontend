import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Article } from '../../../core/models/article.model';
import { ArticlesService } from '../../../core/services/articles.service';
import { ArticleDialogComponent } from '../article-dialog/article-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent implements OnInit {
  displayedColumns = ['nombre', 'category', 'precio', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Article>();
  loading = false;

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { this.dataSource.paginator = p; }
  @ViewChild(MatSort) set sort(s: MatSort) { this.dataSource.sort = s; }

  constructor(
    private service: ArticlesService,
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
    this.dataSource.filterPredicate = (data, filter) =>
      data.nombre.toLowerCase().includes(filter) ||
      (data.category?.nombre ?? '').toLowerCase().includes(filter);
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  openDialog(article?: Article): void {
    const ref = this.dialog.open(ArticleDialogComponent, {
      width: '480px',
      data: { article }
    });
    ref.afterClosed().subscribe(result => {
      if (!result) return;
      const op = article
        ? this.service.update(article.id, result)
        : this.service.create(result);
      op.subscribe({
        next: () => { this.snack.open('Guardado exitosamente', '', { duration: 2500 }); this.load(); },
        error: () => this.snack.open('Error al guardar', 'Cerrar', { duration: 3000 })
      });
    });
  }

  delete(article: Article): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar artículo', message: `¿Eliminar "${article.nombre}"?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (!ok) return;
      this.service.delete(article.id).subscribe({
        next: () => { this.snack.open('Eliminado', '', { duration: 2500 }); this.load(); },
        error: () => this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
