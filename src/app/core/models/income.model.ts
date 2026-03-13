import { Provider } from './person.model';
import { Article } from './article.model';

export interface IncomeDetail {
  id?: number;
  article?: Article;
  idArticle?: number;
  cantidad: number;
  precio: number;
}

export interface Income {
  id?: number;
  tipoComprobante: string;
  serieComprobante: string;
  numComprobante: string;
  impuesto: number;
  total: number;
  estado?: string;
  provider?: Provider;
  idProvider?: number;
  detalles: IncomeDetail[];
  createdAt?: string;
}
