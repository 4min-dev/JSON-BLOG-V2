import React from 'react'
import '../../../style/css/lists/postList.css'
import List from './List'
import PostCard from '../cards/PostCard'
import { IPost } from '../../../ts/interfaces/posts/IPost'

type TPostList = {
  posts:IPost[],
}

const PostList:React.FC<TPostList> = ({posts}) => {

  return (
    <div className='postListContainer'>
      {posts.length > 0 ? <List items={posts} renderItem={(post) => <PostCard post={post} key={post.postId}/>}/> : <h1>No posts found</h1>}
    </div>
  )
}

export default PostList
