import React from 'react'
import '../../../style/css/buttons/editButton.css'
import { ICustomComponentsIdentity } from '../../../ts/interfaces/ICustomComponentsIdentity'

type TEditButton = {
    editHandler:() => void
} & ICustomComponentsIdentity

const EditButton:React.FC<TEditButton> = ({editHandler, globalId, id}) => {
  return (
    <button type='button' className={`editButton ${globalId}`} id={id} onClick={editHandler}>
        <img src='/edit.png' alt='editContent'/>
    </button>
  )
}

export default EditButton
