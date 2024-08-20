import React from 'react'
import '../../../../style/css/forms/changeCommentPan.css'
import CustomForm from '../CustomForm'
import CustomTextarea from '../../inputs/CustomTextarea'
import CustomButton from '../../buttons/CustomButton'

type TChangeCommentPan = {
    currComment?:string,
    sendNewCommentHandler: (newComment:string) => void
}

const ChangeCommentPan:React.FC<TChangeCommentPan> = ({currComment,sendNewCommentHandler}) => {

  let [newComment,setNewComment] = React.useState<string>(currComment ? currComment : '')

  function setNewCommentHandler(event:React.ChangeEvent<HTMLTextAreaElement>) {
    setNewComment(event.target.value)
  }

  return (
    <CustomForm formClassname='changeCommentPan'>
        <CustomTextarea placeholder='Body' value={newComment} onChange={setNewCommentHandler}/>
        <CustomButton disabled={currComment == newComment} buttonText='Save' onClick={() => sendNewCommentHandler(newComment)}/>
    </CustomForm>
  )
}

export default ChangeCommentPan
