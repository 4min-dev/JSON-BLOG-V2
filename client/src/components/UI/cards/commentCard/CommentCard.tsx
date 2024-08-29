import React from 'react'
import '../../../../style/css/cards/commentCard.css'
import { IComment } from '../../../../ts/interfaces/posts/IComment'
import { userAuthService } from '../../../../redux/services/userAuthService'
import SpinnerLoader from '../../loaders/SpinnerLoader'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import DeleteButton from '../../buttons/DeleteButton'
import EditButton from '../../buttons/EditButton'
import { commentsService } from '../../../../redux/services/commentsService'
import ChangeCommentPan from '../../forms/changeCommentPan/ChangeCommentPan'
import { useDispatch } from 'react-redux'
import useNotificationMessage from '../../../../hooks/useNotificationMessage'

const CommentCard:React.FC<{comment:IComment}> = ({comment}) => {

  const dispatch = useDispatch()
  const selector = useTypedSelector(state => state.sessionUserSlice)

  let [editPanel,setEditPanel] = React.useState(false)

  const { data:commentAuthor, isLoading } = userAuthService.useFindUserByUsernameQuery(comment.author)

  const [deleteComment,  { isLoading:isPostDeletion, isSuccess:isPostDeletionSuccess, error:postDeletionError }] = commentsService.useDeleteCommentByIdMutation()
  const [changeComment, { isLoading:isPostChanging, isSuccess:isPostChanged, error:changedPostError }] = commentsService.useChangePostByIdMutation()

  function editCommentPanelHandler() {
    setEditPanel(!editPanel)
  }

  async function deleteCommentHandler() {
    await deleteComment(comment.id)
  }

  async function editCommentHandler(newComment:string) {
    await changeComment({...comment, body:newComment})
    editCommentPanelHandler()
  }

  React.useEffect(() => {
    const successMessage = `Comment has been deleted`
    useNotificationMessage({dispatch,error:postDeletionError,isSuccess:isPostDeletionSuccess,successMessage})
  },[isPostDeletionSuccess,postDeletionError])

  React.useEffect(() => {
    const successMessage = `Comment has been changed`
    useNotificationMessage({dispatch,error:changedPostError,isSuccess:isPostChanged,successMessage})
  },[changedPostError,isPostChanged])

  return (
    <>
     {(isLoading || isPostDeletion) && <SpinnerLoader positionType='fixed'/>}
     {commentAuthor && 
     <div className='commentCard'>
      {isPostChanging && <SpinnerLoader positionType='absolute'/>}
        <div className='commentCardHeading'>
            <a href={`/profile/${commentAuthor.userId}`}>
              <img src={commentAuthor.avatar ? commentAuthor.avatar : '/person.png'} alt='commentAuthorAvatar'/>
            </a>
            <h1>{commentAuthor.username}</h1>
        </div>

        <h2>{comment.body}</h2>
        {comment.author == selector.user.username && 
        <div className='authorCommentInteractive'>
          <EditButton editHandler={editCommentPanelHandler}/>
          <DeleteButton deleteHandler={deleteCommentHandler}/>
        </div>}
        {editPanel && <ChangeCommentPan sendNewCommentHandler={editCommentHandler} currComment={comment.body} />}
    </div>}
    </>
  )
}

export default CommentCard
