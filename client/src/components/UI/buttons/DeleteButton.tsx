import React from 'react'
import '../../../style/css/buttons/deleteButton.css'
import { ICustomComponentsIdentity } from '../../../ts/interfaces/ICustomComponentsIdentity'

type TDeleteButton = {
    deleteHandler:() => void
} & ICustomComponentsIdentity

const DeleteButton:React.FC<TDeleteButton> = ({deleteHandler, globalId, id}) => {
  return (
    <button type='button' className={`deleteButton ${globalId}`} id={id} onClick={deleteHandler}>
        <img src='/delete.png' alt='deleteContent'/>
    </button>
  )
}

export default DeleteButton
