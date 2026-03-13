import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncomeService } from '../../../core/services/income.service';
import { ArticlesService } from '../../../core/services/articles.service';
import { ProvidersService } from '../../../core/services/providers.service';
import { Article } from '../../../core/models/article.model';
import { Provider } from '../../../core/models/person.model';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html'
})
export class IncomeFormComponent implements OnInit {
  form: FormGroup;
  articles: Article[] = [];
  providers: Provider[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private incomeService: IncomeService,
    private articlesService: ArticlesService,
    private providersService: ProvidersService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      idProvider: [null, Validators.required],
      tipoComprobante: ['FACTURA', Validators.required],
      serieComprobante: ['F001', Validators.required],
      numComprobante: ['', Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.articlesService.getAll().subscribe(data => this.articles = data);
    this.providersService.getAll().subscribe(data => this.providers = data);
    this.addDetail();
  }

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  addDetail(): void {
    this.detalles.push(this.fb.group({
      idArticle: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0.01)]]
    }));
  }

  removeDetail(i: number): void {
    if (this.detalles.length > 1) this.detalles.removeAt(i);
  }

  onArticleChange(index: number): void {
    const idArticle = this.detalles.at(index).get('idArticle')?.value;
    const art = this.articles.find(a => a.id === idArticle);
    if (art) this.detalles.at(index).patchValue({ precio: art.precio });
  }

  lineTotal(i: number): number {
    const d = this.detalles.at(i).value;
    return (d.precio ?? 0) * (d.cantidad ?? 0);
  }

  get total(): number {
    return +this.detalles.controls.reduce((acc, _, i) => acc + this.lineTotal(i), 0).toFixed(2);
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload = { ...this.form.getRawValue(), impuesto: 0, total: this.total };
    this.incomeService.create(payload).subscribe({
      next: () => {
        this.snack.open('Ingreso registrado', '', { duration: 2500 });
        this.router.navigate(['/income']);
      },
      error: () => {
        this.snack.open('Error al guardar', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
