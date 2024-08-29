import React from "react"
import { ICustomComponentsIdentity } from "../ICustomComponentsIdentity"

export interface ICustomInputProps extends ICustomComponentsIdentity {
    value?:string | number,
    defaultValue?:string | number,
    disabled?:boolean,
    maxLength?:number,
    type?:string,
    placeholder:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
}