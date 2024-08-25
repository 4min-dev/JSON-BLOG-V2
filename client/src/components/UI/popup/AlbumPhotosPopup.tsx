import React from 'react'
import PopupWindow from './PopupWindow'
import { IAlbumPhoto } from '../../../ts/interfaces/albums/IAlbumPhoto'
import AlbumPhotosList from '../lists/AlbumPhotosList'
import NewPhotoToAlbumPan from '../../pages/albumsPage/UI/NewPhotoToAlbumPan'
import { IAlbum } from '../../../ts/interfaces/albums/IAlbum'

type TAlbumPhotosPopup = {
    setAlbumIsOpened:React.Dispatch<React.SetStateAction<boolean>>,
    album:IAlbum,
    photosData:IAlbumPhoto[]
}

const AlbumPhotosPopup:React.FC<TAlbumPhotosPopup> = ({setAlbumIsOpened,album,photosData}) => {
    
  return (
    <PopupWindow title={album.title} setPopupActive={setAlbumIsOpened}>
        <AlbumPhotosList albumPhotos={photosData}/>
        <NewPhotoToAlbumPan albumId={album.albumId}/>
    </PopupWindow>
  )
}

export default AlbumPhotosPopup
