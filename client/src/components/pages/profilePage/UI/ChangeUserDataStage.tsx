import React from 'react'
import '../../../../style/css/pages/profilePage/UI/changeUserDataStage.css'
import CustomInput from '../../../UI/inputs/CustomInput'
import EditButton from '../../../UI/buttons/EditButton'
import FileImageUploader from '../../../UI/FileImageUploader'
import CustomButton from '../../../UI/buttons/CustomButton'
import { IErrorWithId } from '../../../../ts/interfaces/errors/IErrorWithId'
import { IUser } from '../../../../ts/interfaces/users/IUser'

type TChangeUserDataStage = {
    user:IUser,
    newPasswordHandler:(event:React.ChangeEvent<HTMLInputElement>) => void,
    newUsernameHandler:(event:React.ChangeEvent<HTMLInputElement>) => void,
    newEmailHandler:(event:React.ChangeEvent<HTMLInputElement>) => void,
    newAvatarHandler:(avatar:File | Blob) => void,
    changeUserHandler:() => void,
    isSendDataButtonDisabled:boolean,
    uploaderErrorHandler:(error:IErrorWithId) => void
}

const ChangeUserDataStage:React.FC<TChangeUserDataStage> = ({
        user,
        newPasswordHandler,
        newUsernameHandler,
        newEmailHandler,
        newAvatarHandler, changeUserHandler, isSendDataButtonDisabled, uploaderErrorHandler}) => {

    let [isUsernameInputDisabled,setUsernameInputDisabled] = React.useState<boolean>(true)
    let [isPasswordInputDisabled,setPasswordInputDisabled] = React.useState<boolean>(true)
    let [isEmailInputDisabled,setEmailInputDisabled] = React.useState<boolean>(true)

    function passwordInputDisabledHandler() {
        setPasswordInputDisabled(!isPasswordInputDisabled)
    }

    function usernameInputDisabledHandler() {
        setUsernameInputDisabled(!isUsernameInputDisabled)
    }

    function emailInputDisabledHandler() {
      setEmailInputDisabled(!isEmailInputDisabled)
    }

  return (
    <div className='changeUserDataStageContainer'>
      <h3>Username <EditButton editHandler={usernameInputDisabledHandler}/></h3>
      <CustomInput disabled={isUsernameInputDisabled} defaultValue={user.username} placeholder='New username' onChange={newUsernameHandler}/>

      <h3>Password <EditButton editHandler={passwordInputDisabledHandler}/></h3>
      <CustomInput disabled={isPasswordInputDisabled} defaultValue={user.password} placeholder='New password' onChange={newPasswordHandler}/>

      <h3>Email <EditButton editHandler={emailInputDisabledHandler}/></h3>
      <CustomInput disabled={isEmailInputDisabled} defaultValue={user.email} placeholder='New email' onChange={newEmailHandler}/>

      <h3>Avatar</h3>
      <FileImageUploader 
        title='New avatar' 
        setServerImage={newAvatarHandler} 
        setUploaderError={uploaderErrorHandler} 
        uploadFileType='image/png, image/jpeg, image/gif'/>

      <CustomButton disabled={isSendDataButtonDisabled} buttonText='Save changes' onClick={changeUserHandler}/>
    </div>
  )
}

export default ChangeUserDataStage
