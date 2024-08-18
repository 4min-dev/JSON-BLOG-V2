import React, { useRef } from 'react'
import '../../style/css/fileUploader/fileImageUploader.css'
import { IFileImageUploader } from '../../ts/interfaces/fileUploader/IFileImageUploader'
import FileUploaderForm from './buttons/FileUploaderForm'
import imageCompression, { Options } from 'browser-image-compression'

const FileImageUploader: React.FC<IFileImageUploader> = ({ id, uploadFileType, title, setServerImage, setPreviewImage, previewImage, setUploaderError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function imgFileValidator(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    const uploadFileTypesArr = uploadFileType.split(', ')

    if (file) {
      if (uploadFileTypesArr.some(type => type === file.type) || file.type === uploadFileType) {
        try {
          const options: Options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500
          }
          const compressedFile = await imageCompression(file, options)
          const fileReader = new FileReader()
          
          fileReader.onload = () => {
            setPreviewImage(fileReader.result as string)
            setServerImage(file)
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
  }

  return (
    <div className={`fileImageUploader ${uploadFileType}`} id={id}>
      <h1>{title}</h1>
      {previewImage && <img src={previewImage} alt='imagePreview' className='imagePreview' />}
      <FileUploaderForm uploadFileType={uploadFileType} fileHandler={imgFileValidator} fileInputRef={fileInputRef} />
    </div>
  )
}

export default FileImageUploader
