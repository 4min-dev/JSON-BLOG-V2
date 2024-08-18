import React from 'react'
import '../../../../../style/css/changePostPan/changePostPanel.css'
import CustomInput from '../../../inputs/CustomInput'
import CustomButton from '../../../buttons/CustomButton'
import { INewPostContentState } from '../../../../../ts/interfaces/posts/INewPostContentState'
import { IPost } from '../../../../../ts/interfaces/posts/IPost'

type TChangePostPanel = {
    currPostContent:IPost,
    newPostContent:INewPostContentState,
    newTitleHandler:(event:React.ChangeEvent<HTMLInputElement>) => void,
    newBodyHandler:(event:React.ChangeEvent<HTMLInputElement>) => void,
    sendPostData:() => void
}

const ChangePostPanel:React.FC<TChangePostPanel> = ({currPostContent,newPostContent,newTitleHandler,newBodyHandler,sendPostData}) => {
  return (
    <form className='changePostPanelForm'>
      <CustomInput value={newPostContent.title} type='text' placeholder='Title' onChange={newTitleHandler}/>
      <CustomInput value={newPostContent.body} type='text' placeholder='Description' onChange={newBodyHandler}/>
      <CustomButton disabled={newPostContent.title == currPostContent.title && newPostContent.body == currPostContent.body} buttonText='Save' onClick={sendPostData}/>
    </form>
  )
}

export default ChangePostPanel
