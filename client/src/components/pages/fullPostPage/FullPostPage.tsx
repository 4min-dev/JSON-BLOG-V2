import React from 'react'
import '../../../style/css/pages/fullPostPage/fullPostPage.css'
import { useParams } from 'react-router-dom'
import Header from '../../UI/Header'
import AsidePan from '../../UI/AsidePan'
import BackButton from '../../UI/buttons/BackButton'
import { postsService } from '../../../redux/services/postsService'
import SpinnerLoader from '../../UI/loaders/SpinnerLoader'
import FullPostCard from '../../UI/cards/fullPostCard/FullPostCard'
import CommentsList from '../../UI/lists/CommentsList'
import NewCommentPan from '../../UI/forms/newCommentPan/NewCommentPan'
import { commentsService } from '../../../redux/services/commentsService'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import useNotificationMessage from '../../../hooks/useNotificationMessage'
import { useDispatch } from 'react-redux'
import Notifications from '../../UI/popup/Notifications'

const FullPostPage:React.FC = () => {

  const dispatch = useDispatch()
  const selector = useTypedSelector(state => state.sessionUserSlice)

  const { postId } = useParams()

  const { data:post, isLoading:isPostLoading } = postId ? postsService.useGetPostByIdQuery(postId) : { data:null, isLoading:false }
  const { data:comments, isLoading:isCommentsLoading } = postId ? commentsService.useGetPostCommentQuery(postId) : { data:null, isLoading:false }
  
  const [addNewComment, { isLoading:isNewCommentLoading, isSuccess:isNewCommentSuccess, error:newCommentError }] = commentsService.useNewPostCommentMutation()

  let [newComment,setNewComment] = React.useState<string> ('')

  function setNewCommentHandler(event:React.ChangeEvent<HTMLTextAreaElement>) {
    setNewComment(event.target.value)
  }

  async function sendNewCommentHandler() {

    const comment = {
        body:newComment,
        author:selector.user.username,
        id:Date.now(),
        postId:Number(postId)
    }

    await addNewComment(comment)
    setNewComment('')
  }

  React.useEffect(() => {

    const successMessage = `New comment has been added`
    useNotificationMessage({dispatch, successMessage, error:newCommentError, isSuccess:isNewCommentSuccess})

  }, [isNewCommentSuccess, newCommentError])

  return (
    <div className='fullPostPageContainer'>
      <Header/>
      <AsidePan>
        <BackButton/>
      </AsidePan>
      {(isPostLoading || isCommentsLoading) 
      ? <SpinnerLoader positionType='fixed'/> 
      : 
        <div className='fullPostPageCenterContainer'>
          {post && <FullPostCard post={post}/>}
          <div className="fullPostPageCommentsContainer">
              <h1>{`Comments (${comments?.length})`}</h1>
              {isNewCommentLoading && <SpinnerLoader positionType='absolute'/>}
              {comments && <CommentsList comments={comments}/>}
              <NewCommentPan commentData={newComment} setNewComment={setNewCommentHandler} sendNewCommentData={sendNewCommentHandler}/>
          </div>
        </div>}
      
      <Notifications/>
    </div>
  )
}

export default FullPostPage
