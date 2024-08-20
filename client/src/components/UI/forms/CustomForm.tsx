import React from 'react'
import '../../../style/css/forms/customForm.css'

type TCustomForm = {
    children:React.ReactNode,
    formClassname?:string
}

const CustomForm:React.FC<TCustomForm> = ({children,formClassname}) => {
  return (
    <form className={`customForm ${formClassname}`}>
      {children}
    </form>
  )
}

export default CustomForm
