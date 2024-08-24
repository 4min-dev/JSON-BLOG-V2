import React from 'react'
import '../../../style/css/buttons/paginationButton.css'

type TPaginationButton = {
    disabled:boolean,
    button:number,
    paginationHandler:() => void
}

const PaginationButton:React.FC<TPaginationButton> = ({disabled,button,paginationHandler}) => {
  return (
    <button className='paginationButton' disabled={disabled} type='button' onClick={paginationHandler}>
      <h1>{button}</h1>
    </button>
  )
}

export default PaginationButton
