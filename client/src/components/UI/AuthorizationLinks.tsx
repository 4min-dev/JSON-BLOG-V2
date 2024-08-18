import React from 'react'

const AuthorizationLinks:React.FC = () => {
  return (
    <div className='authorizationLinks'>
        <a href='/auth/signin'>
        Sign in
        </a>
 
   
        <a href='/auth/signup'>
        Sign up
        </a>
    
</div>
  )
}

export default AuthorizationLinks
