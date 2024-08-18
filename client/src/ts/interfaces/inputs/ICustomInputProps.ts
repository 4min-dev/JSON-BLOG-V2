import React from "react"
import { ICustomComponentsIdentity } from "../ICustomComponentsIdentity"

export interface ICustomInputProps extends ICustomComponentsIdentity {
    value?:string,
    type?:string,
    placeholder:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
}