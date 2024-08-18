import React from 'react'
import '../../../style/css/inputs/customInput.css'
import { ICustomInputProps } from '../../../ts/interfaces/inputs/ICustomInputProps'

const CustomInput:React.FC<ICustomInputProps> = ({type,placeholder,globalId,id,onChange}) => {
  return (
    <input type={type} placeholder={placeholder} className={`customInput ${globalId}`} id={id} onChange={onChange}/>
  )
}

export default CustomInput
