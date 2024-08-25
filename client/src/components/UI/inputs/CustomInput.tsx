import React from 'react'
import '../../../style/css/inputs/customInput.css'
import { ICustomInputProps } from '../../../ts/interfaces/inputs/ICustomInputProps'

const CustomInput:React.FC<ICustomInputProps> = ({value,maxLength,type,placeholder,globalId,id,onChange}) => {
  return (
    <input maxLength={maxLength} value={value} type={type} placeholder={placeholder} className={`customInput ${globalId}`} id={id} onChange={onChange}/>
  )
}

export default CustomInput
