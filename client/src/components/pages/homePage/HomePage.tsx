import React from 'react'
import Header from '../../UI/Header'
import HomePageStartedContent from './UI/HomePageStartedContent'
import Notifications from '../../UI/popup/Notifications'

const HomePage:React.FC = () => {

  return (
    <div className='homePageContainer'>
      <Header/>
      <HomePageStartedContent/>
      <Notifications/>
    </div>
  )
}

export default HomePage
