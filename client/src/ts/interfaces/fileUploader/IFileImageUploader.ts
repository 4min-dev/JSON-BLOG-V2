import { IErrorWithId } from "../errors/IErrorWithId";
import { IFileUploaderGlobalProps } from "./IFileUploaderGlobalProps";

export interface IFileImageUploader extends IFileUploaderGlobalProps {
    title:string,
    setServerImage:(image:File) => void,
    setPreviewImage:(image:string) => void,
    previewImage:string,
    setUploaderError:(error:IErrorWithId) => void
}