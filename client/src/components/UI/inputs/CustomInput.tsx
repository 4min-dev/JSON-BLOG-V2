import React from 'react'
import '../../../style/css/inputs/customInput.css'
import { ICustomInputProps } from '../../../ts/interfaces/inputs/ICustomInputProps'

const CustomInput:React.FC<ICustomInputProps> = ({value, type,placeholder,globalId,id,onChange}) => {
  return (
    <input value={value} type={type} placeholder={placeholder} className={`customInput ${globalId}`} id={id} onChange={onChange}/>
  )
}

export default CustomInput
