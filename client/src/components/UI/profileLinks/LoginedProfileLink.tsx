import React from 'react'
import '../../../style/css/profileLinks/loginedProfileLink.css'
import LogoutButton from '../buttons/LogoutButton'
import { userAuthService } from '../../../redux/services/userAuthService'

type TLoginedProfileLink = {
  username:string,
  avatar:string,
  userId:string | number
}

const LoginedProfileLink:React.FC<TLoginedProfileLink> = ({username,avatar,userId}) => {

  const [logout] = userAuthService.useLogoutUserMutation()

  async function logoutUser() {
    await logout()
    window.location.reload()
  }

  return (
    <div className='loginedProfileLink'>
      <div className='loginedProfileLinkUsername'>
        <h4>{username}</h4>
      </div>

      <div className='loginedProfileLinkUserInteractive'>
        <img src={avatar} alt='profile'/>
        <a href={`/profile/${userId}`}>
          <h4>Profile</h4>
        </a>
        <LogoutButton logoutHandler={logoutUser}/>
      </div>
    </div>
  )
}

export default LoginedProfileLink
