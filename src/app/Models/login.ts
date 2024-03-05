export interface Login {
  email: string;
  password: string;
  role: string;
}

export interface AuthModel {
  token: string;
  userId: string;
}

export interface CreateAccount {
  email: string;
  password: string;
  role: string;
  username: string;
}
