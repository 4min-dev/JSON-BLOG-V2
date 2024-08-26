import React from 'react'
import '../../../../style/css/pages/todosPage/UI/newTodoPagePan.css'
import CustomForm from '../../../UI/forms/CustomForm'
import CustomTextarea from '../../../UI/inputs/CustomTextarea'
import CustomButton from '../../../UI/buttons/CustomButton'

type TNewTodoPan = {
    newTodoTitle:string,
    newTodoTitleHandler:(event:React.ChangeEvent<HTMLTextAreaElement>) => void,
    sendNewTodoHandler:() => void
}

const NewTodoPan:React.FC<TNewTodoPan> = ({newTodoTitle,newTodoTitleHandler,sendNewTodoHandler}) => {
  return (
    <CustomForm formClassname='newTodoPan'>
      <CustomTextarea value={newTodoTitle} placeholder='Title' onChange={newTodoTitleHandler} />
      <CustomButton buttonText='New todo' onClick={sendNewTodoHandler}/>
    </CustomForm>
  )
}

export default NewTodoPan
