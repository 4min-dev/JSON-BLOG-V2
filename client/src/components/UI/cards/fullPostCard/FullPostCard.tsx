import React from 'react'
import '../../../../style/css/cards/postCard.css'
import { IPost } from '../../../../ts/interfaces/posts/IPost'

const FullPostCard:React.FC<{post:IPost}> = ({post}) => {

  return (
    <div className='postCard'>
      <h1>{post.title}</h1>
      <h2>{post.body}</h2>
    </div>
  )
}

export default FullPostCard
