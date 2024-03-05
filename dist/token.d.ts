/// <reference types="node" />
import { TokenArgs } from './typings';
export declare class Token {
    algorithm: string;
    key: Buffer;
    iv: Buffer;
    constructor({ algorithm }: TokenArgs);
    encrypt(text: string): string;
    decrypt(token: string): string;
}
