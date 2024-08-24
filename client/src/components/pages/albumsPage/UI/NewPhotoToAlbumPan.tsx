import React from 'react'
import CustomForm from '../../../UI/forms/CustomForm'
import CustomInput from '../../../UI/inputs/CustomInput'
import FileImageUploader from '../../../UI/FileImageUploader'
import { useDispatch } from 'react-redux'
import { newNotification } from '../../../../redux/reducers/slices/notificationSlice'
import { IErrorWithId } from '../../../../ts/interfaces/errors/IErrorWithId'

const NewPhotoToAlbumPan:React.FC = () => {

    const dispatch = useDispatch()

    let [newImage, setNewImage] = React.useState<File | null>(null)
    let [newImageTitle,setNewImageTitle] = React.useState<string>('')

    function newImageErrorHandler(error:IErrorWithId) {
        dispatch(newNotification({...error,type:'errorNotification'}))
    }

    function newImageTitleHandler(event:React.ChangeEvent<HTMLInputElement>) {
        setNewImageTitle(event.target.value)
    }

  return (
    <CustomForm formClassname='newPhotoToAlbumPanel'>
      <FileImageUploader
         setServerImage={setNewImage} 
        setUploaderError={newImageErrorHandler} 
        title='New image' 
        uploadFileType='image/png, image/jpeg, image/gif'/>
      <CustomInput placeholder='Title' onChange={newImageTitleHandler}/>
    </CustomForm>
  )
}

export default NewPhotoToAlbumPan
