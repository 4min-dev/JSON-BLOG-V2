import React, { useRef } from 'react'
import '../../style/css/fileUploader/fileImageUploader.css'
import { IFileImageUploader } from '../../ts/interfaces/fileUploader/IFileImageUploader'
import FileUploaderForm from './buttons/FileUploaderForm'
import imageCompression, { Options } from 'browser-image-compression'
import SpinnerLoader from './loaders/SpinnerLoader'
import { newNotification } from '../../redux/reducers/slices/notificationSlice'
import { useDispatch } from 'react-redux'

const FileImageUploader: React.FC<IFileImageUploader> = ({ id, uploadFileType, title, setServerImage, setUploaderError }) => {

  let [previewImage, setPreviewImage] = React.useState<string>('')
  let [isImageInProcess,setImageProcess] = React.useState<boolean>(false)

  const dispatch = useDispatch()

  const fileInputRef = useRef<HTMLInputElement>(null)

  async function imgFileValidator(e: React.ChangeEvent<HTMLInputElement>) {
    const fileReader = new FileReader()
    const file = e.target.files && e.target.files[0]
    const uploadFileTypesArr = uploadFileType.split(', ')
    setImageProcess(true)

    if (file) {
      if (uploadFileTypesArr.some(type => type === file.type) || file.type === uploadFileType) {
        try {
          const options: Options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500
          }
          const compressedFile = await imageCompression(file, options)
          
          fileReader.onload = () => {
            setPreviewImage(fileReader.result as string)
            setServerImage(file)
            dispatch(newNotification({
              message: 'Image successfully uploaded',
              id: Date.now(),
              type: 'successNotification'
            }))
          }
          
          fileReader.readAsDataURL(compressedFile)

          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        } catch (error) {
          setUploaderError({ message: 'Image compression failed', id: Date.now() })
        }
      } else {
        setUploaderError({ message: 'Not supported file type', id: Date.now() })
      }
    }
    setImageProcess(false)
  }

  return (
    <div className={`fileImageUploader ${uploadFileType}`} id={id}>
      {isImageInProcess && <SpinnerLoader positionType={'absolute'}/>}
      <h1>{title}</h1>
      {previewImage && <img src={previewImage} alt='imagePreview' className='imagePreview' />}
      <FileUploaderForm uploadFileType={uploadFileType} fileHandler={imgFileValidator} fileInputRef={fileInputRef} />
    </div>
  )
}

export default FileImageUploader
