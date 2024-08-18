import { ICustomComponentsIdentity } from "../ICustomComponentsIdentity";

export interface ICustomTextarea extends ICustomComponentsIdentity {
    placeholder:string,
    onChange:(event:React.ChangeEvent<HTMLTextAreaElement>) => void
}