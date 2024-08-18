import React from 'react'
import '../../../style/css/buttons/customButton.css'
import { TCustomButtonProps } from '../../../ts/interfaces/buttons/TCustomButtonProps'

const CustomButton:React.FC<TCustomButtonProps> = ({disabled, buttonGlobalId,id,buttonText,onClick}) => {
  return (
    <button disabled={disabled} type='button' className={`customButton ${buttonGlobalId}`} id={id} onClick={onClick}>
      {buttonText}
    </button>
  )
}

export default CustomButton
