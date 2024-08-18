import { IError } from "./IError";

export interface IErrorServiceResponse {
    data: {
        message:IError[]
    }
}