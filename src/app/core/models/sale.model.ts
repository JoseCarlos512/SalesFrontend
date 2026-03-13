import { Person } from './person.model';
import { Article } from './article.model';

export interface SaleDetail {
  id?: number;
  article?: Article;
  idArticle?: number;
  cantidad: number;
  precio: number;
  descuento: number;
}

export interface Sale {
  id?: number;
  tipoComprobante: string;
  serieComprobante: string;
  numComprobante: string;
  impuesto: number;
  total: number;
  estado?: string;
  sunatCodigo?: string;
  sunatDescripcion?: string;
  person?: Person;
  idPerson?: number;
  detalles: SaleDetail[];
  createdAt?: string;
}

export interface BillingResponse {
  saleId: number;
  estado: string;
  codigoSunat?: string;
  descripcionSunat?: string;
  fileName?: string;
}
