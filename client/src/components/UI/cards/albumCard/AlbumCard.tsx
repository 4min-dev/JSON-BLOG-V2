import React from 'react'
import '../../../../style/css/cards/albumCard.css'
import { IAlbum } from '../../../../ts/interfaces/albums/IAlbum'
import { albumService } from '../../../../redux/services/albumService'
import SpinnerLoader from '../../loaders/SpinnerLoader'

type TAlbumCard = {
    album:IAlbum
}

const AlbumCard:React.FC<TAlbumCard> = ({album}) => {

  const {data:albumPhotos, isLoading} = albumService.useGetAlbumPhotosQuery(album.albumId)

  return (
    <div className='albumCard'>
      <button type='button'>
        <h1>{album.title}</h1>
        {isLoading ? <SpinnerLoader/> : <img src={albumPhotos && albumPhotos?.length > 0 ? albumPhotos[0].imageUrl : '/noImage.png'}/>}
      </button>
    </div>
  )
}

export default AlbumCard
