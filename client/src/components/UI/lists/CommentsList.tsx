import React from 'react'
import List from './List'
import { IComment } from '../../../ts/interfaces/posts/IComment'
import CommentCard from '../cards/commentCard/CommentCard'
import NoCommentsFound from '../forms/newCommentPan/UI/NoCommentsFound'

const CommentsList:React.FC<{comments:IComment[]}> = ({comments}) => {
  return (
    <>
    {comments.length > 0 
        ? <List items={comments} renderItem={(comment) => <CommentCard key={comment.id} comment={comment}/>}/> 
        : <NoCommentsFound/>}
    </>
  )
}

export default CommentsList
