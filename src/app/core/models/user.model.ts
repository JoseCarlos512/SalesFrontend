export interface Rol {
  id: number;
  nombre: string;
  descripcion?: string;
}

/** Forma que devuelve GET /users (lista liviana: rol es string) */
export interface UserList {
  id: number;
  usuario: string;
  rol: string;
}

/** Forma que devuelve GET /users/:id (detalle: rol es objeto) */
export interface UserDetail {
  id: number;
  usuario: string;
  rol: Rol;
}

export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
