import React from 'react'
import '../../../style/css/profileLinks/profileLink.css'
import LoginedProfileLink from './LoginedProfileLink'
import UnloginedProfileLink from './UnloginedProfileLink'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

const ProfileLink:React.FC = () => {

  const selector = useTypedSelector(state => state.sessionUserSlice)

  const isSession = selector.user.username ? true : false
  const user = selector.user
  const userAvatar = user.avatar

  return (
    <div className='profileLink'>
      {isSession ? <LoginedProfileLink username={user.username} avatar={userAvatar ? userAvatar : '/person.png'}/> : <UnloginedProfileLink/>}
    </div>
  )
}

export default ProfileLink
