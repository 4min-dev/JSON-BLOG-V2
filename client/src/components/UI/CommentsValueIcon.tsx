import React from 'react'
import '../../style/css/commentsValueIcon/commentsValueIcon.css'

type TCommentsValueIcon = {
    commentsValue:number
}

const CommentsValueIcon:React.FC<TCommentsValueIcon> = ({commentsValue}) => {
  return (
    <div className='commentsValue'>
        <h3>{commentsValue}</h3>
        <img src='/comment.png' alt='comments'/>
    </div>
  )
}

export default CommentsValueIcon
