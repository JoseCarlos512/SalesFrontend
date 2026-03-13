export interface Person {
  id: number;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numDocumento: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}

export interface Provider {
  id: number;
  nombre: string;
  ruc: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}
