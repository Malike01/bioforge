export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_name: string;
  is_admin: boolean;
}

export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}
