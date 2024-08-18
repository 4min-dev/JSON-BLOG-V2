import React from 'react'
import { IVisibilityComponents } from '../../../ts/interfaces/IVisibilityComponents'

const VisibilityButton:React.FC<IVisibilityComponents> = ({className,setVisibility,isVisibility}) => {

    const visibilityPathToImg = isVisibility ? '/hideEye.png' : '/viewEye.png'

  return (
    <button type='button' className={`visibilityButton ${className}`} onClick={setVisibility}>
      <img src={visibilityPathToImg} alt='eye'/>
    </button>
  )
}

export default VisibilityButton
