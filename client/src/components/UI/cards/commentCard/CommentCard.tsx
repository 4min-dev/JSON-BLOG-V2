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

const CommentCard:React.FC<{comment:IComment}> = ({comment}) => {

  const selector = useTypedSelector(state => state.sessionUserSlice)

  let [editPanel,setEditPanel] = React.useState(false)

  const { data:commentAuthor, isLoading } = userAuthService.useFindUserByUsernameQuery(comment.author)
  const [deleteComment,  { isLoading:isPostDeletion }] = commentsService.useDeleteCommentByIdMutation()
  const [changeComment, { isLoading:isPostChanging }] = commentsService.useChangePostByIdMutation()

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

  return (
    <>
     {(isLoading || isPostDeletion) && <SpinnerLoader/>}
     {commentAuthor && 
     <div className='commentCard'>
      {isPostChanging && <SpinnerLoader/>}
        <div className='commentCardHeading'>
            <img src={commentAuthor.avatar ? commentAuthor.avatar : '/person.png'} alt='commentAuthorAvatar'/>
            <h1>{commentAuthor.email}</h1>
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
