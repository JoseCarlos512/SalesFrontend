import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesService } from '../../../core/services/sales.service';
import { ArticlesService } from '../../../core/services/articles.service';
import { PersonsService } from '../../../core/services/persons.service';
import { Article } from '../../../core/models/article.model';
import { Person } from '../../../core/models/person.model';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html'
})
export class SaleFormComponent implements OnInit {
  form: FormGroup;
  articles: Article[] = [];
  persons: Person[] = [];
  loading = false;
  igv = 0.18;

  tiposComprobante = [
    { value: '03', label: 'Boleta' },
    { value: '01', label: 'Factura' }
  ];

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private articlesService: ArticlesService,
    private personsService: PersonsService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      idPerson: [null, Validators.required],
      tipoComprobante: ['03', Validators.required],
      serieComprobante: ['B001', Validators.required],
      numComprobante: ['', Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.articlesService.getAll().subscribe(data => this.articles = data);
    this.personsService.getAll().subscribe(data => this.persons = data);
    this.addDetail();
    this.form.get('tipoComprobante')?.valueChanges.subscribe(tipo => {
      this.form.patchValue({ serieComprobante: tipo === '01' ? 'F001' : 'B001' });
    });
  }

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  addDetail(): void {
    this.detalles.push(this.fb.group({
      idArticle: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [{ value: 0, disabled: false }, [Validators.required, Validators.min(0.01)]],
      descuento: [0, Validators.min(0)]
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

  lineTotal(index: number): number {
    const d = this.detalles.at(index).value;
    return Math.max(0, (d.precio ?? 0) * (d.cantidad ?? 0) - (d.descuento ?? 0));
  }

  get subtotal(): number {
    return this.detalles.controls.reduce((acc, _, i) => acc + this.lineTotal(i), 0);
  }

  get impuesto(): number {
    return +(this.subtotal * this.igv).toFixed(2);
  }

  get total(): number {
    return +(this.subtotal + this.impuesto).toFixed(2);
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload = {
      ...this.form.getRawValue(),
      impuesto: this.impuesto,
      total: this.total
    };
    this.salesService.create(payload).subscribe({
      next: () => {
        this.snack.open('Venta registrada', '', { duration: 2500 });
        this.router.navigate(['/sales']);
      },
      error: () => {
        this.snack.open('Error al guardar', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
