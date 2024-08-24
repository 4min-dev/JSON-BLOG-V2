import React from 'react'
import '../../../style/css/lists/albumsList/albumsList.css'
import List from './List'
import { IAlbum } from '../../../ts/interfaces/albums/IAlbum'
import AlbumCard from '../cards/albumCard/AlbumCard'
import CustomInput from '../inputs/CustomInput'

type TAlbumsList = {
    albums:IAlbum[],
    setSearchQuery:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const AlbumsList:React.FC<TAlbumsList> = ({albums,setSearchQuery}) => {

  return (
    <div className='albumsListContent'>
    <div className='albumsListFilterContainer'>
      <CustomInput placeholder='Search..' onChange={setSearchQuery} globalId='albumsSearchInput'/>
    </div>
    {albums.length > 0
      ? <List containerClassname='albumsListContainer' items={albums} renderItem={(album) => 
          <AlbumCard key={album.albumId} album={album}/>}/>
      : <h1>No albums found</h1>
    }
    </div>
  )
}

export default AlbumsList
