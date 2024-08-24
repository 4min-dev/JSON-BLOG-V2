import React from 'react'
import '../../../style/css/pages/albumPage/albumPage.css'
import Header from '../../UI/Header'
import AsidePan from '../../UI/AsidePan'
import CustomButton from '../../UI/buttons/CustomButton'
import { albumService } from '../../../redux/services/albumService'
import { IFilterQuery } from '../../../ts/interfaces/filterContent/IFilterQuery'
import { IAlbum } from '../../../ts/interfaces/albums/IAlbum'
import AlbumsList from '../../UI/lists/AlbumsList'
import getTotalPages from '../../../utils/pagination/getTotalPages'
import Footer from '../../UI/Footer'
import { usePagination } from '../../../hooks/usePagination'
import PaginationList from '../../UI/lists/PaginationList'

const AlbumsPage:React.FC = () => {

  let [filter, setFilter] = React.useState<IFilterQuery>({
    limitQuery:5, 
    searchQuery:'', 
    sortQuery:{
      name:'',
      sortKey:'',
      sortValue:null
    },
    currPage:1,
    totalPages:null,
    totalContentCount:null,
  })

  function paginationHandler(page:number) {
    setFilter((prev) => ({
      ...prev,
      currPage:page
    }))
  }

  let [albums,setAlbums] = React.useState<IAlbum[]>([])
  const { data } = albumService.useGetAlbumsQuery(filter)
  
  React.useEffect(() => {
    if(data) {

      const totalContentCount = Number(data.headers['x-total-count'])

      setAlbums(data.data)
      setFilter((prev) => ({
        ...prev,
        totalContentCount:totalContentCount
      }))

      setFilter((prev) => ({
        ...prev,
        totalPages:getTotalPages({totalContent:totalContentCount,contentLimit:filter.limitQuery})
      }))
    }
  },[data])

  const paginationResult = usePagination({totalPages:filter.totalPages!,currPage:filter.currPage!})

  return (
    <div className='albumsPageContainer'>
      <Header/>
      <AsidePan>
        <CustomButton buttonText='New album'/>
      </AsidePan>
      {albums && <AlbumsList albums={albums}/>}
      {paginationResult.length > 0 && <PaginationList paginationArray={paginationResult} currPage={filter.currPage!} paginationHandler={paginationHandler}/>}
      <Footer/>
    </div>
  )
}

export default AlbumsPage
