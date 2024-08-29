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
import useDebounceSearch from '../../../hooks/useDebounceSearch'
import NewAlbumPopup from './UI/NewAlbumPopup'
import Notifications from '../../UI/popup/Notifications'
import SpinnerLoader from '../../UI/loaders/SpinnerLoader'

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

  const setSearchQueryHandler = useDebounceSearch({setFilter})

  function paginationHandler(page:number) {
    setFilter((prev) => ({
      ...prev,
      currPage:page
    }))
  }
  const paginationResult = usePagination({totalPages:filter.totalPages!,currPage:filter.currPage!})

  let [albums,setAlbums] = React.useState<IAlbum[]>([])
  const { data, isLoading } = albumService.useGetAlbumsQuery(filter)

  let [isNewAlbumPopup,setNewAlbumPopup] = React.useState(false)

  function newAlbumPopupHandler() {
    setNewAlbumPopup(!isNewAlbumPopup)
  }
  
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

  return (
    <div className='albumsPageContainer'>
      {isNewAlbumPopup && <NewAlbumPopup setPopupActive={setNewAlbumPopup}/>}
      <Header/>
      <AsidePan>
        <CustomButton buttonText='New album' onClick={newAlbumPopupHandler}/>
      </AsidePan>
      {isLoading ? <SpinnerLoader positionType='fixed'/> : <AlbumsList albums={albums} setSearchQuery={setSearchQueryHandler}/>}
      {(paginationResult.length > 0 && !filter.searchQuery) && <PaginationList paginationArray={paginationResult} currPage={filter.currPage!} paginationHandler={paginationHandler}/>}
      <Footer/>
      <Notifications/>
    </div>
  )
}

export default AlbumsPage
