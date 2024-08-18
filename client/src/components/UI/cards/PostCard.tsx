import React from 'react'
import '../../../style/css/cards/postCard.css'
import { IPost } from '../../../ts/interfaces/posts/IPost'

const PostCard:React.FC<{post:IPost}> = ({post}) => {
  return (
    <div className='postCard'>
      <div className="postCardHeading">
        <h1>{post.title}</h1>

        <div className='postCardCommentsContainer'>
            <button type='button'>
                <h3>{post.comments.length}</h3>
                <img src='/comment.png' alt='comments'/>
            </button>
        </div>
      </div>
      
        <h2>{post.body}</h2>

        <div className="postCardFooter">

            <div className='postCardInteractive'>
                <h3>Author: <a href='#'>{post.author}</a></h3>
                <a href='#'><h3>View post</h3></a>

                <div className='postCardPostInteractive'>
                    <button type='button' className='deleteContentButton'>
                        <img src='/delete.png' alt='deleteContent'/>
                    </button>

                    <button type='button' className='editContentButton'>
                        <img src='/edit.png' alt='editContent'/>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard
