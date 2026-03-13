export interface Rol {
  id: number;
  nombre: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol?: Rol;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
