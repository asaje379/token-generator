import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { TokenArgs } from './typings';

export class Token {
  algorithm: string;
  key = Buffer.from(randomBytes(32));
  iv = randomBytes(16);

  constructor({ algorithm = 'aes-256-cbc' }: TokenArgs) {
    this.algorithm = algorithm;
  }

  encrypt(text: string) {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${encrypted.toString('hex')}.${this.iv.toString(
      'hex',
    )}.${this.key.toString('hex')}`;
  }

  decrypt(token: string) {
    const [_encrypted, _iv, _key] = token.split('.');
    if (!_encrypted || !_iv || !_key) {
      throw new Error('The token is not well formed');
    }

    const iv = Buffer.from(_iv, 'hex');
    const encrypted = Buffer.from(_encrypted, 'hex');
    const key = Buffer.from(_key, 'hex');

    const decipher = createDecipheriv(this.algorithm, key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
