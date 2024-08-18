import React from 'react'
import '../../../style/css/lists/postList.css'
import List from './List'
import PostCard from '../cards/postCard/PostCard'
import { IPost } from '../../../ts/interfaces/posts/IPost'
import { postsService } from '../../../redux/services/postsService'
import SpinnerLoader from '../loaders/SpinnerLoader'
import useNotificationMessage from '../../../hooks/useNotificationMessage'
import { useDispatch } from 'react-redux'
import Notifications from '../popup/Notifications'
import { INewPostContent } from '../../../ts/interfaces/posts/INewPostContent'

type TPostList = {
  posts:IPost[],
}

const PostList:React.FC<TPostList> = ({posts}) => {

  const dispatch = useDispatch()

  const [deletePost, {data:deletedPostData, isLoading:isDeletion, isSuccess:isPostDeleted, error:deletedPostError}] = postsService.useDeletePostByIdMutation()
  const [changePost, {data:newPostData, isLoading:isPostChanging, isSuccess:isPostChanged, error:changedPostError}] = postsService.useChangePostByIdMutation()

  async function deletePostHandler(postId:number) {
    await deletePost(postId)
  }

  async function changePostHandler(newPost:INewPostContent) {
    await changePost(newPost)
  }

  React.useEffect(() => {
    const successMessage = `Post "${deletedPostData?.title}" has been deleted`
    useNotificationMessage({dispatch,isSuccess:isPostDeleted,successMessage,error:deletedPostError})
  },[isPostDeleted,deletedPostError])

  React.useEffect(() => {
    const successMessage = `Post ${newPostData?.title} has been changed`
    useNotificationMessage({dispatch,isSuccess:isPostChanged,successMessage,error:changedPostError})
  },[isPostChanged,changedPostError])

  return (
    <div className='postListContainer'>
      {(isDeletion || isPostChanging) && <SpinnerLoader/>}
      {posts.length > 0 
        ? <List items={posts} renderItem={(post) => <PostCard post={post} key={post.postId} deletePost={deletePostHandler} changePost={changePostHandler}/>}/> 
        : <h1>No posts found</h1>}
      <Notifications/>
    </div>
  )
}

export default PostList
