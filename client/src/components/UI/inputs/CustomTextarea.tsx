import React from 'react'
import '../../../style/css/inputs/customTextarea.css'
import { ICustomTextarea } from '../../../ts/interfaces/inputs/ICustomTextarea'

const CustomTextarea:React.FC<ICustomTextarea> = ({placeholder,globalId,id,onChange}) => {
  return (
    <textarea placeholder={placeholder} className={`customTextarea ${globalId}`} id={id} onChange={onChange}/>
  )
}

export default CustomTextarea
