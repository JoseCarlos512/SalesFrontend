import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ArticlesService } from '../../core/services/articles.service';
import { SalesService } from '../../core/services/sales.service';
import { PersonsService } from '../../core/services/persons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats = { articles: 0, sales: 0, clients: 0 };
  loading = true;

  constructor(
    private articlesService: ArticlesService,
    private salesService: SalesService,
    private personsService: PersonsService
  ) {}

  ngOnInit(): void {
    forkJoin({
      articles: this.articlesService.getAll(),
      sales: this.salesService.getAll(),
      clients: this.personsService.getAll()
    }).subscribe({
      next: ({ articles, sales, clients }) => {
        this.stats = {
          articles: articles.length,
          sales: sales.length,
          clients: clients.length
        };
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
