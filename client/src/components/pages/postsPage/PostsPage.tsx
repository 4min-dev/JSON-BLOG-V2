import React, { useCallback } from 'react';
import '../../../style/css/pages/postsPage/postsPage.css';
import Header from '../../UI/Header';
import AsidePan from '../../UI/AsidePan';
import CustomButton from '../../UI/buttons/CustomButton';
import { postsService } from '../../../redux/services/postsService';
import SpinnerLoader from '../../UI/loaders/SpinnerLoader';
import PostList from '../../UI/lists/PostList';
import { IFilterQuery } from '../../../ts/interfaces/filterContent/IFilterQuery';
import { IPost } from '../../../ts/interfaces/posts/IPost';
import CustomInput from '../../UI/inputs/CustomInput';
import CustomSortInput from '../../UI/inputs/CustomSortInput';
import { postSortData } from '../../../utils/data/postSortData';
import { ISortOption } from '../../../ts/interfaces/inputs/sortInput/ISortOption';
import useScrollContentLoad from '../../../hooks/useScrollContentLoad';
import useDebounceSearch from '../../../hooks/useDebounceSearch';
import Footer from '../../UI/Footer';
import NewPostPopup from './UI/NewPostPopup';

const PostsPage: React.FC = () => {
  const [filter, setFilter] = React.useState<IFilterQuery>({
    searchQuery: '',
    sortQuery: {
      name:'',
      sortKey:'',
      sortValue:null
    },
    limitQuery: 10,
    totalContentCount: null
  })

  const [posts, setPosts] = React.useState<IPost[]>([])
  const { data, isLoading } = postsService.useGetPostsQuery(filter, {refetchOnMountOrArgChange:true})

  let [isNewPostPopup,setNewPostPopup] = React.useState<boolean>(false)

  const setSearchQuery = useDebounceSearch({setFilter})
  const scrollLoadContent = useScrollContentLoad({filter,setFilter})

  const setSortOption = useCallback((option:ISortOption) => {
    setFilter((prevOptions) => ({
      ...prevOptions,
      sortQuery:option
    }))
  },[filter.sortQuery])

  React.useEffect(() => {

    if(data && 'data' in data) {
      const xTotalCount = Number(data.headers['x-total-count'])
      setPosts(data.data)
      setFilter({...filter,totalContentCount:xTotalCount})
    }

    document.addEventListener('scroll',scrollLoadContent)
  },[data,filter.searchQuery,filter.sortQuery,filter.limitQuery])

  return (
    <div className='postsPageContainer'>
      {isLoading && <SpinnerLoader />}
      {isNewPostPopup && <NewPostPopup setNewPostPopup={setNewPostPopup}/>}
      <Header />
      <AsidePan>
        <CustomButton buttonGlobalId='asidePanNewContentButton' buttonText='New post' onClick={() => setNewPostPopup(!isNewPostPopup)}/>
      </AsidePan>
      <div className='postsPageContent'>
        <div className="postsPageMainUIInteractive">
        <CustomInput placeholder='Search..' onChange={setSearchQuery} globalId='postsSearchInput'/>
        <CustomSortInput sortOptions={postSortData} sortOption={filter.sortQuery.name} setSortOption={setSortOption}/>
        </div>
        <PostList posts={posts}/>
      </div>
      <Footer/>
    </div>
  );
}

export default PostsPage;