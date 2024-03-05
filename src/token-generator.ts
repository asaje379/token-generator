import { Token } from './token';
import { SignTokenArgs, TokenError, VerifyTokenArgs } from './typings';

export class TokenGenerator {
  static sign<T>(payload: SignTokenArgs<T>) {
    const { data, key, expiresIn } = payload;
    const info = {
      data,
      key,
      expiration: expiresIn ? expiresIn + Date.now() : undefined,
    };

    return new Token({ algorithm: payload.algorithm }).encrypt(
      JSON.stringify(info),
    );
  }

  static verify<T>(payload: VerifyTokenArgs) {
    const { key, token } = payload;

    const info = JSON.parse(
      new Token({ algorithm: payload.algorithm }).decrypt(token),
    );

    if (info.key !== key) {
      throw new Error(TokenError.INVALID_KEY);
    }

    if (info.expiration < Date.now()) {
      throw new Error(TokenError.EXPIRED);
    }

    return info.data as T;
  }
}
