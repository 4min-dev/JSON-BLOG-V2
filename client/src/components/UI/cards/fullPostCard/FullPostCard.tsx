import React from 'react'
import '../../../../style/css/cards/fullPostCard.css'
import { IPost } from '../../../../ts/interfaces/posts/IPost'

const FullPostCard:React.FC<{post:IPost}> = ({post}) => {

  console.log(post)

  return (
    <div className='postCard'>
      <h1>{post.title}</h1>
      <h2>{post.body}</h2>
      <div className='fullPostCardFooter'>
        <h3><a href={`/profile/${post.author._id}`}>{post.author.username}</a></h3>
      </div>
    </div>
  )
}

export default FullPostCard
