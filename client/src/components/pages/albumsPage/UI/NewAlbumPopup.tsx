import React from 'react'
import '../../../../style/css/pages/albumPage/UI/newAlbumPopup.css'
import PopupWindow from '../../../UI/popup/PopupWindow'
import CustomInput from '../../../UI/inputs/CustomInput'
import FileImageUploader from '../../../UI/FileImageUploader'
import { useDispatch } from 'react-redux'
import { newNotification } from '../../../../redux/reducers/slices/notificationSlice'
import { IErrorWithId } from '../../../../ts/interfaces/errors/IErrorWithId'
import CustomButton from '../../../UI/buttons/CustomButton'
import { albumService } from '../../../../redux/services/albumService'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import SpinnerLoader from '../../../UI/loaders/SpinnerLoader'
import useNotificationMessage from '../../../../hooks/useNotificationMessage'

type TNewAlbumPopup = {
    setPopupActive:React.Dispatch<React.SetStateAction<boolean>>
}

const NewAlbumPopup:React.FC<TNewAlbumPopup> = ({setPopupActive}) => {

    const dispatch = useDispatch()
    const selector = useTypedSelector(state => state.sessionUserSlice)

    const [addNewAlbum, {data, isLoading, isSuccess, error }] = albumService.useAddNewAlbumMutation()

    let [albumTitle,setAlbumTitle] = React.useState<string>('')
    let [serverAlbumLogo,setServerAlbumLogo] = React.useState<null | File>(null)

    function setUploaderError(newError:IErrorWithId) {
        dispatch(newNotification({...newError,type:'errorNotification'}))
    }
    
    function albumTitleHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setAlbumTitle(event.target.value)
    }

    async function addNewAlbumHandler() {
        await addNewAlbum({title:albumTitle, albumId:Date.now(), albumFileLogo:serverAlbumLogo!, userId:selector.user.userId})
    }

    React.useEffect(() => {
        const successMessage = `${data?.title} album was created`
        useNotificationMessage({dispatch, error, isSuccess, successMessage})

        if(isSuccess) {
            setAlbumTitle('')
            setPopupActive(false)
        }
    },[isSuccess, error])

  return (
    <PopupWindow title='New album' setPopupActive={setPopupActive}>
        {isLoading && <SpinnerLoader positionType='absolute'/>}
        <div className="newAlbumInteractiveContainer">
            <CustomInput value={albumTitle} maxLength={40} type='text' placeholder='Title (max - 40)' onChange={albumTitleHandler}/>
            <FileImageUploader 
                setServerImage={setServerAlbumLogo}
                setUploaderError={setUploaderError}
                uploadFileType='image/png, image/jpeg, image/gif'
                title='Album logo'
            />
            <CustomButton buttonText='New album' onClick={addNewAlbumHandler}/>
        </div>
    </PopupWindow>
  )
}

export default NewAlbumPopup
