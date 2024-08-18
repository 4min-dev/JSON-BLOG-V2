import React from 'react'
import Header from '../../UI/Header'
import AsidePan from '../../UI/AsidePan'
import SignInPageContent from './UI/SignInPageContent'
import BackButton from '../../UI/buttons/BackButton'
import Notifications from '../../UI/popup/Notifications'
import { SignInPageContext } from '../../../context/SignInPageContext'
import { userAuthService } from '../../../redux/services/userAuthService'
import useNotificationMessage from '../../../hooks/useNotificationMessage'
import { useDispatch } from 'react-redux'
import { IUser } from '../../../ts/interfaces/users/IUser'

const SignInPage:React.FC = () => {

  const dispatch = useDispatch()

  const [loginUser, {error,isSuccess,data}] = userAuthService.useLoginMutation()
  const {refetch} = userAuthService.useVerifyUserToLoginQuery()
  
  let [authUser,setAuthUser] = React.useState<IUser>({username:'',password:''})

  function setAuthUserLogin(e:React.ChangeEvent<HTMLInputElement>) {
    setAuthUser({...authUser,username:e.target.value})
  }

  function setAuthUserPassword(e:React.ChangeEvent<HTMLInputElement>) {
    setAuthUser({...authUser,password:e.target.value})
  }

  async function authorizationUser(authorizationUserData:IUser) {
      await loginUser(authorizationUserData)
  }

  React.useEffect(() => {

    const successMessage = `${data?.username} was verifyed`
    useNotificationMessage({dispatch,error,isSuccess,successMessage})

    if(isSuccess) {
      refetch()
      window.location.reload()
    }

  },[error,isSuccess])

  return (
    <div className='signInPageContainer'>
      <SignInPageContext.Provider value={{
        authUser,
        setAuthUser,
        setAuthUserLogin,
        setAuthUserPassword,
        authorizationUser
      }}>
        <Header/>
        <AsidePan>
          <BackButton/>
        </AsidePan>
        <SignInPageContent/>
        <Notifications/>
      </SignInPageContext.Provider>
    </div>
  )
}

export default SignInPage
