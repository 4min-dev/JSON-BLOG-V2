import React from 'react'
import '../../../style/css/inputs/customTextarea.css'
import { ICustomTextarea } from '../../../ts/interfaces/inputs/ICustomTextarea'

const CustomTextarea:React.FC<ICustomTextarea> = ({placeholder,value,globalId,id,onChange}) => {
  return (
    <textarea value={value} placeholder={placeholder} className={`customTextarea ${globalId}`} id={id} onChange={onChange}/>
  )
}

export default CustomTextarea
