import React from 'react'
import '../../../../style/css/pages/homePage/UI/homePageStartedContent.css'
import HomePageStartedContentTitle from './HomePageStartedContentTitle'
import HomePageAuthorizationLinks from './HomePageAuthorizationLinks'

const HomePageStartedContent:React.FC = () => {
  return (
    <div className='homePageStartedContentContainer'>
      <HomePageStartedContentTitle/>
      <img src='twoArrows.png' alt='auth_paths'/>
      <HomePageAuthorizationLinks/>
    </div>
  )
}

export default HomePageStartedContent
