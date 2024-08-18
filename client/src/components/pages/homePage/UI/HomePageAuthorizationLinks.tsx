import React from 'react'
import '../../../../style/css/pages/homePage/UI/homePageAuthorizationLinks.css'

const HomePageAuthorizationLinks:React.FC = () => {
  return (
    <div className='authorizationLinksHomePage'>
        <div className="authLinkHomePage">
        <a href='/auth/signin'>
            <img src='keyPerson.png' alt='signin'/>
            <h2>Sign in</h2>
        </a>
        </div>

        <div className="authLinkHomePage">
        <a href='/auth/signup'>
            <img src='plusPerson.png' alt='signup'/>
            <h2 >Sign up</h2>
        </a>
        </div>
   </div>
  )
}

export default HomePageAuthorizationLinks
