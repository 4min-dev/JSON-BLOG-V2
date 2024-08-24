import React from 'react'
import '../../../style/css/lists/albumsList/albumsList.css'
import List from './List'
import { IAlbum } from '../../../ts/interfaces/albums/IAlbum'
import AlbumCard from '../cards/albumCard/AlbumCard'

type TAlbumsList = {
    albums:IAlbum[],
}

const AlbumsList:React.FC<TAlbumsList> = ({albums}) => {

  return (
    <List containerClassname='albumsListContainer' items={albums} renderItem={(album) => <AlbumCard key={album.albumId} album={album}/>}/>
    
  )
}

export default AlbumsList
