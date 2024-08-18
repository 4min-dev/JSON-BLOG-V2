import React from 'react'
import { getAcceptedFileTypes } from '../../../utils/getAcceptedFileTypes'
import { IFileUploaderFormProps } from '../../../ts/interfaces/fileUploader/IFileUploaderFormProps'

const FileUploaderForm:React.FC<IFileUploaderFormProps> = ({id,uploadFileType,fileHandler,fileInputRef}) => {

    const acceptedFileTypes = getAcceptedFileTypes(uploadFileType)

  return (
    <form className='fileUploaderForm' id={id}>
        <input ref={fileInputRef} type='file' accept={acceptedFileTypes} id='selectFileInput' onChange={fileHandler} />
        <label htmlFor='selectFileInput'>
            <img src='/upload.png' alt='upload'/>
            <h1>Select</h1>
        </label>
    </form>
  )
}

export default FileUploaderForm
