import { IError } from "./IError";

export interface IErrorWithId extends IError {
    id:string | number
}