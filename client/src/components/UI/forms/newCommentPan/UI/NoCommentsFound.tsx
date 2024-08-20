import React from 'react'
import '../../../../../style/css/lists/commentsList/UI/noCommentsFound.css'

const NoCommentsFound:React.FC = () => {
  return (
    <div className='noCommentsFound'>
      <img src='/404error.png' alt='not_found'/>
      <h1>Write the first comment!</h1>
    </div>
  )
}

export default NoCommentsFound
