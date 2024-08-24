import React from 'react'
import '../../../../style/css/cards/albumPhotoCard.css'
import { IAlbumPhoto } from '../../../../ts/interfaces/albums/IAlbumPhoto'

type TAlbumPhotoCard = {
    albumPhoto:IAlbumPhoto
}

const AlbumPhotoCard:React.FC<TAlbumPhotoCard> = ({albumPhoto}) => {
  return (
    <div className="albumPhotoCard">
        <a href={albumPhoto.imageUrl}>
            <img src={albumPhoto.imageUrl} alt={albumPhoto.title}/>
        </a>
        <h4>{albumPhoto.title}</h4>
    </div>
  )
}

export default AlbumPhotoCard
