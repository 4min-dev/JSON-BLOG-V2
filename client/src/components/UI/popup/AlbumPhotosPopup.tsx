import React from 'react'
import PopupWindow from './PopupWindow'
import { IAlbumPhoto } from '../../../ts/interfaces/albums/IAlbumPhoto'
import AlbumPhotosList from '../lists/AlbumPhotosList'
import NewPhotoToAlbumPan from '../../pages/albumsPage/UI/NewPhotoToAlbumPan'

type TAlbumPhotosPopup = {
    setAlbumIsOpened:React.Dispatch<React.SetStateAction<boolean>>,
    albumTitle:string,
    photosData:IAlbumPhoto[]
}

const AlbumPhotosPopup:React.FC<TAlbumPhotosPopup> = ({setAlbumIsOpened,albumTitle,photosData}) => {
    
  return (
    <PopupWindow title={albumTitle} setPopupActive={setAlbumIsOpened}>
        <AlbumPhotosList albumPhotos={photosData}/>
        <NewPhotoToAlbumPan/>
    </PopupWindow>
  )
}

export default AlbumPhotosPopup
