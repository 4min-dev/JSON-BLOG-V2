import { gifFileType, imgFileTypes, jpegFileType, pngFileType } from "./fileTypes"

export const getAcceptedFileTypes = (uploadFileType:string) => {
    if( uploadFileType === imgFileTypes ) {
        return imgFileTypes
    }

    if( uploadFileType === pngFileType ) {
        return pngFileType
    }

    if( uploadFileType === jpegFileType ) {
        return jpegFileType
    }

    if( uploadFileType === gifFileType ) {
        return gifFileType
    }
}