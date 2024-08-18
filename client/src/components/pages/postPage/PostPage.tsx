import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../UI/Header'
import AsidePan from '../../UI/AsidePan'
import BackButton from '../../UI/buttons/BackButton'

const PostPage:React.FC = () => {

  const params = useParams()
  console.log(params)

  return (
    <div className='postPageContainer'>
      <Header/>
      <AsidePan>
        <BackButton/>
      </AsidePan>
    </div>
  )
}

export default PostPage
