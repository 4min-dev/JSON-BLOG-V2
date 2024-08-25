import React from 'react'
import '../../../../style/css/pages/albumPage/UI/newPhotoToAlbumPan.css'
import CustomInput from '../../../UI/inputs/CustomInput'
import FileImageUploader from '../../../UI/FileImageUploader'
import { useDispatch } from 'react-redux'
import { newNotification } from '../../../../redux/reducers/slices/notificationSlice'
import { IErrorWithId } from '../../../../ts/interfaces/errors/IErrorWithId'
import CustomButton from '../../../UI/buttons/CustomButton'
import { albumService } from '../../../../redux/services/albumService'
import useNotificationMessage from '../../../../hooks/useNotificationMessage'
import SpinnerLoader from '../../../UI/loaders/SpinnerLoader'

type TNewPhotoToAlbumPan = {
  albumId:number
}

const NewPhotoToAlbumPan:React.FC<TNewPhotoToAlbumPan> = ({albumId}) => {

    const dispatch = useDispatch()

    let [newImage, setNewImage] = React.useState<File | null>(null)
    let [newImageTitle,setNewImageTitle] = React.useState<string>('')

    const [newAlbumPhoto, { data, isLoading, error, isSuccess }] = albumService.useAddNewPhotoMutation()

    function newImageErrorHandler(error:IErrorWithId) {
        dispatch(newNotification({...error,type:'errorNotification'}))
    }

    function newImageTitleHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setNewImageTitle(event.target.value)
    }

    async function sendNewImageHandler() {
      await newAlbumPhoto({albumId, serverImage:newImage!, title:newImageTitle})
    }

    React.useEffect(() => {
      const successMessage = `${data?.title} successfully uploaded`
      useNotificationMessage({dispatch,error,isSuccess,successMessage})

      if(isSuccess) {
        setNewImageTitle('')
      }
    },[isSuccess,error])

  return (
    <div className='newPhotoToAlbumPanel'>
      {isLoading && <SpinnerLoader positionType='absolute'/>}
      <FileImageUploader
         setServerImage={setNewImage} 
        setUploaderError={newImageErrorHandler} 
        title='New image' 
        uploadFileType='image/png, image/jpeg, image/gif'/>
      <CustomInput value={newImageTitle} placeholder='Title' onChange={newImageTitleHandler}/>
      <CustomButton buttonText='Upload' onClick={sendNewImageHandler}/>
    </div>
  )
}

export default NewPhotoToAlbumPan
