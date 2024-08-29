import React from 'react'
import '../../../../style/css/pages/profilePage/UI/newUserInfoPopup.css'
import PopupWindow from '../../../UI/popup/PopupWindow'
import { userAuthService } from '../../../../redux/services/userAuthService'
import SpinnerLoader from '../../../UI/loaders/SpinnerLoader'
import useNotificationMessage from '../../../../hooks/useNotificationMessage'
import { useDispatch } from 'react-redux'
import VerifyUserStage from './VerifyUserStage'
import ChangeUserDataStage from './ChangeUserDataStage'
import { IErrorWithId } from '../../../../ts/interfaces/errors/IErrorWithId'
import { newNotification } from '../../../../redux/reducers/slices/notificationSlice'
import { IUser } from '../../../../ts/interfaces/users/IUser'
import { newUserSession } from '../../../../redux/reducers/slices/sessionUserSlice'

type TNewUserDataPopup = {
    userId:string,
    setPopupActive:React.Dispatch<React.SetStateAction<boolean>>
}

const NewUserDataPopup:React.FC<TNewUserDataPopup> = ({userId, setPopupActive}) => {

    const dispatch = useDispatch()

    const [verifyUser, {data, isLoading, isSuccess, error}] = userAuthService.useVerifyUserByPasswordMutation()
    const [changeUserData, {
            data:changedUserData, 
            isLoading:isUserDataChanging,
            isSuccess:isUserDataChangedSuccess, error:changedUserDataError}] = userAuthService.useChangeUserDataMutation()

    let [verifyPasswords, setVerifyPassword] = React.useState({password:'', verifyPassword:''})
    let [newUserData,setNewUserData] = React.useState<IUser>({username:'',password:'',email:'',serverAvatar:null})

    async function verifyUserByPasswordHandler() {
        await verifyUser({userId, password:verifyPasswords.password, verifyPassword:verifyPasswords.verifyPassword})
    }

    function passwordHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setVerifyPassword((prev) => ({
            ...prev,
            password:event.target.value
        }))
    }

    function verifyPasswordHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setVerifyPassword((prev) => ({
            ...prev,
            verifyPassword:event.target.value
        }))
    }

    function newPasswordHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setNewUserData((prev) => ({
            ...prev,
            password:event.target.value
        }))
    }
    function newUsernameHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setNewUserData((prev) =>( {
            ...prev,
            username:event.target.value
        }))
    }

    function newEmailHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setNewUserData((prev) => ({
            ...prev,
            email:event.target.value
        }))
    }

    function newAvatarHandler(avatar:File | Blob) {
        setNewUserData((prev) => ({
            ...prev,
            serverAvatar:avatar
        }))
    }

    async function newUserDataHandler() {
        await changeUserData(newUserData)
    }

    function newAvatarErrorHandler(error:IErrorWithId) {
        dispatch(newNotification({...error, type:'errorNotification'}))
    }

    const isDataNoChanged:boolean = data?.verifyedUser.email == newUserData.email &&
                            data?.verifyedUser.username == newUserData.username && 
                            data?.verifyedUser.password == newUserData.password &&
                            !newUserData.serverAvatar

    React.useEffect(() => {
        useNotificationMessage({dispatch, isSuccess, error})

        if(isSuccess) {
            setNewUserData((prev) => ({
                ...prev,
                userId:data.verifyedUser.userId,
                username:data.verifyedUser.username,
                email:data.verifyedUser.email,
                password:data.verifyedUser.password,
            }))
        }
    },[isSuccess,error])

    React.useEffect(() => {
        if (isUserDataChangedSuccess && changedUserData) {
            dispatch(newUserSession({
                email:changedUserData.email!, 
                userId:changedUserData.userId!, 
                username:changedUserData.username, 
                avatar:changedUserData.clientAvatar}))

                setPopupActive(false)
            }

        const successMessage = 'Data was updated'
        useNotificationMessage({dispatch, isSuccess:isUserDataChangedSuccess, error:changedUserDataError, successMessage})
        
    }, [isUserDataChangedSuccess, changedUserDataError])

  return (
    <PopupWindow title='Change your data' setPopupActive={setPopupActive}>
        {(isLoading || isUserDataChanging) && <SpinnerLoader positionType='absolute'/>}
        {!data?.isUserVerifyed && !data?.verifyedUser
            ? <VerifyUserStage 
                passwordHandler={passwordHandler} 
                verifyPasswordHandler={verifyPasswordHandler} 
                verifyUserByPasswordHandler={verifyUserByPasswordHandler}/> 
                : <ChangeUserDataStage 
                    user={data.verifyedUser!}
                    newPasswordHandler={newPasswordHandler}
                    newUsernameHandler={newUsernameHandler}
                    newEmailHandler={newEmailHandler}
                    newAvatarHandler={newAvatarHandler}
                    uploaderErrorHandler={newAvatarErrorHandler}
                    changeUserHandler={newUserDataHandler}
                    isSendDataButtonDisabled={isDataNoChanged}/>}
    </PopupWindow>
  )
}

export default NewUserDataPopup
