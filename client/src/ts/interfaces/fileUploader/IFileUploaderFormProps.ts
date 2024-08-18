import { IFileUploaderGlobalProps } from "./IFileUploaderGlobalProps";

export interface IFileUploaderFormProps extends IFileUploaderGlobalProps {
    fileHandler:(event:React.ChangeEvent<HTMLInputElement>) => void,
    fileInputRef:React.RefObject<HTMLInputElement>
}