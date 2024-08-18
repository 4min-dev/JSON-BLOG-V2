import React from 'react'
import '../../../../style/css/cards/postCard.css'
import { IPost } from '../../../../ts/interfaces/posts/IPost'
import { INewPostContent } from '../../../../ts/interfaces/posts/INewPostContent'
import ChangePostPanel from './UI/ChangePostPanel'
import DeleteButton from '../../buttons/DeleteButton'
import EditButton from '../../buttons/EditButton'
import { INewPostContentState } from '../../../../ts/interfaces/posts/INewPostContentState'
import CommentsValueIcon from '../../CommentsValueIcon'

type TPostCard = {
  post:IPost,
  deletePost:(postId:number) => void,
  changePost:(newPost:INewPostContent) => void
}

const PostCard:React.FC<TPostCard> = ({post,deletePost,changePost}) => {

  let [isChangePostPanel,setChangePostPanel] = React.useState(false)
  let [newPostContent,setNewPostContent] = React.useState<INewPostContentState>({title:post.title,body:post.body})

  function setChangePanelActive() {
    setChangePostPanel(!isChangePostPanel)
  }

  function deletePostHandler() {
    deletePost(post.postId)
  }

  function editPostHandler() {
    changePost({postId:post.postId,...newPostContent})
    setChangePanelActive()
  }

  function newTitleHandler(event:React.ChangeEvent<HTMLInputElement>) {
    setNewPostContent((prevPostContent) => ({
      ...prevPostContent,
      title:event.target.value
    }))
  }

  function newBodyHandler(event:React.ChangeEvent<HTMLInputElement>) {
    setNewPostContent((prevPostContent) => ({
      ...prevPostContent,
      body:event.target.value
    }))
  }

  return (
    <div className='postCard'>
      <div className="postCardHeading">
        <h1>{post.title}</h1>

        <div className='postCardCommentsContainer'>
          <CommentsValueIcon commentsValue={post.comments?.length || 0}/>
        </div>
      </div>
      
        <h2>{post.body}</h2>

        <div className="postCardFooter">

            <div className='postCardInteractive'>
                <h3>Author: 
                  <a href='#'>{post.author}</a>
                </h3>
                <a href={`/posts/${post.postId}`}>
                  <h3>View post</h3>
                </a>

                <div className='postCardPostInteractive'>
                    <DeleteButton deleteHandler={deletePostHandler}/>
                    <EditButton editHandler={setChangePanelActive}/>
                </div>
            </div>
        </div>

        {isChangePostPanel 
          && <ChangePostPanel 
                currPostContent={post} 
                newPostContent={newPostContent}
                newTitleHandler={newTitleHandler} 
                newBodyHandler={newBodyHandler} sendPostData={editPostHandler}/>}
    </div>
  )
}

export default PostCard
