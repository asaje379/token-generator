import { SignTokenArgs, VerifyTokenArgs } from './typings';
export declare class TokenGenerator {
    static sign<T>(payload: SignTokenArgs<T>): string;
    static verify<T>(payload: VerifyTokenArgs): T;
}
