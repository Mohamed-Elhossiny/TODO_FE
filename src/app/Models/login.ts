export interface Login {
  email: string;
  password: string;
  role: string;
}

export interface AuthModel {
  token: string;
  userId: string;
}
