import React from 'react'
import '../../../../style/css/pages/postsPage/UI/newPostPopup.css'
import PopupWindow from '../../../UI/popup/PopupWindow'
import CustomInput from '../../../UI/inputs/CustomInput'
import CustomTextarea from '../../../UI/inputs/CustomTextarea'
import CustomButton from '../../../UI/buttons/CustomButton'
import Notifications from '../../../UI/popup/Notifications'
import useNotificationMessage from '../../../../hooks/useNotificationMessage'
import { useDispatch } from 'react-redux'
import SpinnerLoader from '../../../UI/loaders/SpinnerLoader'
import { IPost } from '../../../../ts/interfaces/posts/IPost'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { postsService } from '../../../../redux/services/postsService'

type TNewPostPopup = {
    setNewPostPopup:React.Dispatch<React.SetStateAction<boolean>>
}

const NewPostPopup:React.FC<TNewPostPopup> = ({setNewPostPopup}) => {

    const dispatch = useDispatch()
    const userSessionSelector = useTypedSelector(state => state.sessionUserSlice)

    const [addNewPost, {data, error, isSuccess, isLoading}] = postsService.useAddNewPostMutation()
    let [newPost,setNewPost] = React.useState<{title:string,body:string}>({title:'',body:''})

    async function handleNewPost() {

    const post:IPost = {
      author:userSessionSelector.user.username,
      title:newPost.title,
      body:newPost.body,
      postId:Date.now()
    }

    await addNewPost(post)
  }

  function setPostTitle(event:React.ChangeEvent<HTMLInputElement>) {
    setNewPost((prev) => ({
        ...prev,
        title:event.target.value
    }))
  }

  function setPostBody(event:React.ChangeEvent<HTMLTextAreaElement>) {
    setNewPost((prev) => ({
        ...prev,
        body:event.target.value
    }))
  }

    React.useEffect(() => {
        const successMessage = `${data?.title} post successfully created`
        useNotificationMessage({dispatch,error,isSuccess,successMessage})
    },[isSuccess,error])

  return (
    <PopupWindow title='New post' setPopupActive={setNewPostPopup}>
        {isLoading && <SpinnerLoader/>}
        <div className='newPostInteractiveContainer'>
            <CustomInput type='text' placeholder='Title' onChange={setPostTitle}/>
            <div className="newPostButtonContainer">
                <CustomTextarea placeholder='Description' onChange={setPostBody}/>
                <CustomButton buttonText='→' onClick={handleNewPost}/>
            </div>
        </div>
        <Notifications/>
    </PopupWindow>
  )
}

export default NewPostPopup
