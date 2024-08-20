import React from 'react'
import '../../../../style/css/forms/newCommentPan.css'
import CustomButton from '../../buttons/CustomButton'
import CustomForm from '../CustomForm'
import CustomTextarea from '../../inputs/CustomTextarea'

type TNewCommentPan = {
    setNewComment:(event:React.ChangeEvent<HTMLTextAreaElement>) => void,
    commentData:string,
    sendNewCommentData: () => void
}

const NewCommentPan:React.FC<TNewCommentPan> = ({setNewComment,commentData,sendNewCommentData}) => {
  return (
    <CustomForm formClassname='newCommentPan'>
        <CustomTextarea value={commentData} placeholder='Write a comment!' onChange={setNewComment}/>
        <CustomButton buttonText='Create' onClick={sendNewCommentData}/>
    </CustomForm>
  )
}

export default NewCommentPan
