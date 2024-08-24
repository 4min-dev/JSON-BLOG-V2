import React from 'react'
import '../../../../style/css/pages/signUpPage/UI/signUpPageContent.css'
import FileImageUploader from '../../../UI/FileImageUploader'
import CustomInput from '../../../UI/inputs/CustomInput'
import CustomButton from '../../../UI/buttons/CustomButton'
import AuthorizationLinks from '../../../UI/AuthorizationLinks'
import CustomPasswordInput from '../../../UI/inputs/CustomPasswordInput'
import { newNotification } from '../../../../redux/reducers/slices/notificationSlice'
import { useDispatch } from 'react-redux'
import { IUser } from '../../../../ts/interfaces/users/IUser'
import { IErrorWithId } from '../../../../ts/interfaces/errors/IErrorWithId'

type TSignUpContentProps = {
  addNewUser:(user:IUser) => void
}

const SignUpPageContent:React.FC<TSignUpContentProps> = ({addNewUser}) => {

  let [authUser,setAuthUser] = React.useState<IUser>({username:'',email:'',password:'',serverAvatar:null})

  const dispatch = useDispatch()

  function setAuthUserLogin(e:React.ChangeEvent<HTMLInputElement>) {
    setAuthUser({...authUser,username:e.target.value})
  }

  function setAuthUserEmail(e:React.ChangeEvent<HTMLInputElement>) {
    setAuthUser({...authUser,email:e.target.value})
  }

  function setAuthUserPassword(e:React.ChangeEvent<HTMLInputElement>) {
    setAuthUser({...authUser,password:e.target.value})
  }

  function setServerImage(imageFile: File) {
    setAuthUser(prevState => ({
      ...prevState,
      serverAvatar: imageFile,
    }))
  }

  function setAvatarUploadingError(newError:IErrorWithId) {
    dispatch(newNotification({...newError,type:'errorNotification'}))
  }

  return (
    <div className='signUpPageContent'>
      <h1><p>Sign up</p></h1>
      <div className='signUpPageUIInteractive'>
        <FileImageUploader title='Avatar' uploadFileType='image/png, image/jpeg, image/gif' setServerImage={setServerImage} setUploaderError={setAvatarUploadingError}/>
      <form>
        <CustomInput globalId='authorizationInputs' type='text' placeholder={'Login'} onChange={setAuthUserLogin}/>
        <CustomInput globalId='authorizationInputs' type='email' placeholder={'E-Mail'} onChange={setAuthUserEmail}/>
        <CustomPasswordInput globalId='authorizationInputs' placeholder={'Password'} onChange={setAuthUserPassword}/>
        <CustomButton buttonText='Sign up' buttonGlobalId='styledAuthorizationButton' onClick={() => addNewUser(authUser)}/>
        <AuthorizationLinks/>
      </form>
      </div>
    </div>
  )
}

export default SignUpPageContent
