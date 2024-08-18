import React from 'react'
import '../../../../style/css/pages/signInPage/UI/signInPageContent.css'
import SignInPageAuthorizationUI from './SignInPageAuthorizationUI'

const SignInPageContent:React.FC = () => {
  return (
    <div className="signInPageContent">
       <h1><p>Sign in</p></h1>
       <SignInPageAuthorizationUI/>
    </div>
  )
}

export default SignInPageContent
