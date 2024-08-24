import React from 'react'
import '../../../../style/css/cards/albumCard.css'
import { IAlbum } from '../../../../ts/interfaces/albums/IAlbum'
import { albumService } from '../../../../redux/services/albumService'
import SpinnerLoader from '../../loaders/SpinnerLoader'
import AlbumPhotosPopup from '../../popup/AlbumPhotosPopup'

type TAlbumCard = {
    album:IAlbum
}

const AlbumCard:React.FC<TAlbumCard> = ({album}) => {

  const {data:albumPhotos, isLoading} = albumService.useGetAlbumPhotosQuery(album.albumId)
  let [isAlbumOpened,setIsAlbumOpened] = React.useState(false)

  return (
    <>
    {isAlbumOpened && <AlbumPhotosPopup albumTitle={album.title} setAlbumIsOpened={setIsAlbumOpened} photosData={albumPhotos!}/>}
    <div className='albumCard' onClick={() => setIsAlbumOpened(!isAlbumOpened)}>
      <button type='button'>
        <h1>{album.title}</h1>
        {isLoading ? <SpinnerLoader positionType='absolute'/> : <img src={albumPhotos && albumPhotos?.length > 0 ? albumPhotos[0].imageUrl : '/noImage.png'} alt={'albumPreview'}/>}
      </button>
    </div>
    </>
  )
}

export default AlbumCard
