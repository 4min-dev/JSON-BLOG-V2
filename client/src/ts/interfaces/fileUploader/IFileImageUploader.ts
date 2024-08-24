import { IErrorWithId } from "../errors/IErrorWithId";
import { IFileUploaderGlobalProps } from "./IFileUploaderGlobalProps";

export interface IFileImageUploader extends IFileUploaderGlobalProps {
    title:string,
    setServerImage:(image:File) => void,
    setUploaderError:(error:IErrorWithId) => void
}