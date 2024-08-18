import React from 'react'
import '../../../style/css/profileLinks/ulnoginedProfileLink.css'

const UnloginedProfileLink:React.FC = () => {
  return (
    <div className='unloginedProfileLink'>
      <img src={'/person.png'} alt='profile'/>
      <h4><a href='/auth/signin'>Login</a></h4>
    </div>
  )
}

export default UnloginedProfileLink
