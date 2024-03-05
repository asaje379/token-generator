export interface SignTokenArgs<T> {
  data: T;
  key: string;
  expiresIn?: number;
  algorithm?: string;
}

export interface VerifyTokenArgs {
  token: string;
  key: string;
  algorithm?: string;
}

export enum TokenError {
  EXPIRED = 'Token expired',
  VALID = 'VALID',
  INVALID_KEY = 'The key you provided is not valid',
}

export interface TokenArgs {
  algorithm?: string;
}
