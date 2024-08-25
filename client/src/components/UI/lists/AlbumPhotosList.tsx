import React from 'react'
import '../../../style/css/lists/albumPhotosList/albumPhotosList.css'
import List from './List'
import AlbumPhotoCard from '../cards/albumPhotoCard/AlbumPhotoCard'
import { IAlbumPhoto } from '../../../ts/interfaces/albums/IAlbumPhoto'

type TAlbumPhotosList = {
    albumPhotos:IAlbumPhoto[]
}

const AlbumPhotosList:React.FC<TAlbumPhotosList> = ({albumPhotos}) => {
  return (
   <>
   {albumPhotos.length > 0 
    ?  <List containerClassname='albumPhotosListContainer' items={albumPhotos} renderItem={(albumPhoto,index) => 
            <AlbumPhotoCard key={index} albumPhoto={albumPhoto}/>}/>
    :  <h1>No photos found</h1>
    }
   </>
  )
}

export default AlbumPhotosList
