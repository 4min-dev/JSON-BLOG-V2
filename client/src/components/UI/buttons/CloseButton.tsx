import React from 'react'
import '../../../style/css/buttons/closeButton.css'

type TCloseButtonProps = {
  closeHandler:() => void
}

const CloseButton:React.FC<TCloseButtonProps> = ({closeHandler}) => {
  return (
    <button className='closeButton' type='button' onClick={closeHandler}>
      <b>X</b>
    </button>
  )
}

export default CloseButton
